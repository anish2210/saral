import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Edit, Share2, Copy, Check, IndianRupee } from 'lucide-react';
import { Layout } from '../components/layout';
import { Card, Button, Badge, Spinner, Select } from '../components/ui';
import { api } from '../lib/api';
import {
  formatCurrency,
  formatMonth,
  getMonthsFromStart,
  getPublicPaymentLink,
  copyToClipboard,
} from '../lib/utils';
import type { Student, PaymentRecord, PaymentStatus, PaymentMethod } from '../types';

function StudentDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [isLoading, setIsLoading] = useState(true);
  const [student, setStudent] = useState<Student | null>(null);
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [copied, setCopied] = useState(false);
  const [updatingPayment, setUpdatingPayment] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentRes, paymentsRes] = await Promise.all([
          api.getStudent(id!),
          api.getStudentPayments(id!),
        ]);
        setStudent(studentRes.student);
        setPayments(paymentsRes.payments);
      } catch (error) {
        console.error('Failed to fetch student:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleCopyLink = async () => {
    if (!student) return;
    const link = getPublicPaymentLink(student.publicToken);
    const success = await copyToClipboard(link);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = async () => {
    if (!student) return;
    const link = getPublicPaymentLink(student.publicToken);

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Payment Status - ${student.name}`,
          text: `Check your payment status for tuition fees`,
          url: link,
        });
      } catch {
        // User cancelled or error
      }
    } else {
      handleCopyLink();
    }
  };

  const handlePaymentToggle = async (month: string, currentStatus: PaymentStatus | null) => {
    if (!student) return;

    setUpdatingPayment(month);

    try {
      const existingPayment = payments.find((p) => p.month === month);

      if (existingPayment) {
        // Toggle existing payment
        const newStatus: PaymentStatus = currentStatus === 'Paid' ? 'Pending' : 'Paid';
        await api.updatePayment(existingPayment._id, { status: newStatus });
        setPayments((prev) =>
          prev.map((p) =>
            p._id === existingPayment._id ? { ...p, status: newStatus } : p
          )
        );
      } else {
        // Create new payment record
        const newPayment = await api.createPayment(student._id, {
          month,
          amount: student.monthlyFee,
          status: 'Paid',
          method: 'Cash',
        });
        setPayments((prev) => [...prev, newPayment.payment]);
      }
    } catch (error) {
      console.error('Failed to update payment:', error);
    } finally {
      setUpdatingPayment(null);
    }
  };

  const handleMethodChange = async (paymentId: string, method: PaymentMethod) => {
    try {
      await api.updatePayment(paymentId, { method });
      setPayments((prev) =>
        prev.map((p) => (p._id === paymentId ? { ...p, method } : p))
      );
    } catch (error) {
      console.error('Failed to update payment method:', error);
    }
  };

  if (isLoading) {
    return (
      <Layout title="Student" showBack showNav={false}>
        <div className="flex h-64 items-center justify-center">
          <Spinner size="lg" />
        </div>
      </Layout>
    );
  }

  if (!student) {
    return (
      <Layout title="Student" showBack showNav={false}>
        <div className="p-4 text-center text-text-secondary">
          Student not found
        </div>
      </Layout>
    );
  }

  const months = getMonthsFromStart(student.startDate);
  const paymentsByMonth = new Map(payments.map((p) => [p.month, p]));

  return (
    <Layout title={student.name} showBack showNav={false}>
      <div className="p-4 space-y-4">
        {/* Student Info Card */}
        <Card>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-100 text-primary-600 text-xl font-semibold">
                {student.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-lg font-semibold text-text-primary">{student.name}</h2>
                {student.phone && (
                  <p className="text-sm text-text-secondary">{student.phone}</p>
                )}
                <p className="text-sm font-medium text-primary-600">
                  {formatCurrency(student.monthlyFee)}/month
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate(`/students/${student._id}/edit`)}
              className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100"
              aria-label="Edit student"
            >
              <Edit className="h-5 w-5 text-text-secondary" />
            </button>
          </div>
        </Card>

        {/* Share Link Card */}
        <Card className="bg-primary-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-primary-700">Share Payment Status</p>
              <p className="text-sm text-primary-600">
                Send link to student/parent
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleCopyLink}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
              <Button size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Payment History */}
        <div>
          <h3 className="mb-3 font-semibold text-text-primary">Payment History</h3>
          <div className="space-y-2">
            {months.map((month) => {
              const payment = paymentsByMonth.get(month);
              const isPaid = payment?.status === 'Paid';
              const isUpdating = updatingPayment === month;

              return (
                <Card key={month}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-text-primary">{formatMonth(month)}</p>
                      <p className="text-sm text-text-secondary">
                        {formatCurrency(student.monthlyFee)}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      {payment && isPaid && (
                        <Select
                          value={payment.method}
                          onChange={(e) =>
                            handleMethodChange(payment._id, e.target.value as PaymentMethod)
                          }
                          options={[
                            { value: 'Cash', label: 'Cash' },
                            { value: 'UPI', label: 'UPI' },
                          ]}
                          className="w-20 h-9 text-sm"
                        />
                      )}
                      <button
                        onClick={() => handlePaymentToggle(month, payment?.status || null)}
                        disabled={isUpdating}
                        className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                          isPaid
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                        }`}
                      >
                        {isUpdating ? (
                          <Spinner size="sm" />
                        ) : (
                          <>
                            <IndianRupee className="h-4 w-4" />
                            {isPaid ? 'Paid' : 'Pending'}
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default StudentDetailPage;
