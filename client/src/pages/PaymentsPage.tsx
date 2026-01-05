import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Clock, ChevronRight } from 'lucide-react';
import { Layout } from '../components/layout';
import { Card, Spinner, Badge, Select } from '../components/ui';
import { api } from '../lib/api';
import { formatCurrency, formatMonth, getLastNMonths, getCurrentMonth } from '../lib/utils';
import type { Student, PaymentRecord } from '../types';

interface StudentWithPayment extends Student {
  payment?: PaymentRecord;
}

function PaymentsPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [students, setStudents] = useState<StudentWithPayment[]>([]);
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());
  const [filter, setFilter] = useState<'all' | 'paid' | 'pending'>('all');

  const months = getLastNMonths(6);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const studentsRes = await api.getStudents();
        const studentsWithPayments: StudentWithPayment[] = [];

        for (const student of studentsRes.students) {
          const paymentsRes = await api.getStudentPayments(student._id);
          const payment = paymentsRes.payments.find(
            (p: PaymentRecord) => p.month === selectedMonth
          );
          studentsWithPayments.push({ ...student, payment });
        }

        setStudents(studentsWithPayments);
      } catch (error) {
        console.error('Failed to fetch payments:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedMonth]);

  const filteredStudents = students.filter((student) => {
    if (filter === 'all') return true;
    if (filter === 'paid') return student.payment?.status === 'Paid';
    if (filter === 'pending') return !student.payment || student.payment.status === 'Pending';
    return true;
  });

  const paidCount = students.filter((s) => s.payment?.status === 'Paid').length;
  const pendingCount = students.length - paidCount;
  const collectedAmount = students
    .filter((s) => s.payment?.status === 'Paid')
    .reduce((sum, s) => sum + (s.payment?.amount || s.monthlyFee), 0);
  const expectedTotal = students.reduce((sum, s) => sum + s.monthlyFee, 0);

  if (isLoading) {
    return (
      <Layout title="Payments" showNav>
        <div className="flex h-64 items-center justify-center">
          <Spinner size="lg" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Payments" showNav>
      <div className="p-4 space-y-4">
        {/* Month Selector */}
        <Select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          options={months.map((m) => ({ value: m, label: formatMonth(m) }))}
          className="w-full"
        />

        {/* Summary Card */}
        <Card className="bg-primary-50">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-primary-600">Collected</p>
              <p className="text-xl font-bold text-primary-700">
                {formatCurrency(collectedAmount)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-primary-600">Expected</p>
              <p className="text-xl font-bold text-primary-700">
                {formatCurrency(expectedTotal)}
              </p>
            </div>
          </div>
          <div className="mt-3 flex gap-4 text-sm">
            <span className="flex items-center gap-1 text-green-600">
              <Check className="h-4 w-4" />
              {paidCount} Paid
            </span>
            <span className="flex items-center gap-1 text-yellow-600">
              <Clock className="h-4 w-4" />
              {pendingCount} Pending
            </span>
          </div>
        </Card>

        {/* Filter Tabs */}
        <div className="flex gap-2">
          {(['all', 'pending', 'paid'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex-1 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                filter === f
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Students List */}
        <div className="space-y-2">
          {filteredStudents.map((student) => {
            const isPaid = student.payment?.status === 'Paid';

            return (
              <Card
                key={student._id}
                className="cursor-pointer hover:shadow-card-hover transition-shadow"
                onClick={() => navigate(`/students/${student._id}`)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full ${
                        isPaid ? 'bg-green-100' : 'bg-yellow-100'
                      }`}
                    >
                      {isPaid ? (
                        <Check className="h-5 w-5 text-green-600" />
                      ) : (
                        <Clock className="h-5 w-5 text-yellow-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-text-primary">{student.name}</p>
                      <p className="text-sm text-text-secondary">
                        {formatCurrency(student.monthlyFee)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={isPaid ? 'success' : 'warning'}>
                      {isPaid ? 'Paid' : 'Pending'}
                    </Badge>
                    {isPaid && student.payment && (
                      <Badge variant="default">{student.payment.method}</Badge>
                    )}
                    <ChevronRight className="h-5 w-5 text-text-muted" />
                  </div>
                </div>
              </Card>
            );
          })}

          {filteredStudents.length === 0 && (
            <Card className="text-center py-8">
              <p className="text-text-secondary">No students found</p>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default PaymentsPage;
