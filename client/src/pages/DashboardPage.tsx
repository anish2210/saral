import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, IndianRupee, Clock, AlertCircle } from 'lucide-react';
import { Layout, FloatingActionButton } from '../components/layout';
import { Card, Spinner, Badge } from '../components/ui';
import { api } from '../lib/api';
import { formatCurrency, getCurrentMonth, formatMonth } from '../lib/utils';
import { trackDashboardView } from '../lib/gtm';
import type { Tutor, Student, PaymentRecord } from '../types';

function DashboardPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [tutor, setTutor] = useState<Tutor | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [collectedAmount, setCollectedAmount] = useState(0);

  useEffect(() => { trackDashboardView(); }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tutorRes, studentsRes] = await Promise.all([
          api.getMe(),
          api.getStudents(),
        ]);

        setTutor(tutorRes.tutor);
        setStudents(studentsRes.students);

        // Calculate stats for current month
        const currentMonth = getCurrentMonth();
        let pending = 0;
        let collected = 0;

        // Fetch payments for each student
        const paymentPromises = studentsRes.students.map((s) =>
          api.getStudentPayments(s._id).catch(() => ({ payments: [] }))
        );
        const paymentResults = await Promise.all(paymentPromises);

        studentsRes.students.forEach((_student, index) => {
          const payments = paymentResults[index].payments;
          const currentPayment = payments.find(
            (p: PaymentRecord) => p.month === currentMonth
          );

          if (currentPayment?.status === 'Paid') {
            collected += currentPayment.amount;
          } else {
            pending++;
          }
        });

        setPendingCount(pending);
        setCollectedAmount(collected);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <Layout title="Saral">
        <div className="flex h-64 items-center justify-center">
          <Spinner size="lg" />
        </div>
      </Layout>
    );
  }

  const expectedTotal = students.reduce((sum, s) => sum + s.monthlyFee, 0);

  return (
    <Layout title="Saral" showNav>
      <div className="p-4 space-y-4">
        {/* Greeting */}
        <div className="mb-2">
          <h2 className="text-xl font-semibold text-text-primary">
            Hello, {tutor?.name?.split(' ')[0] || 'Tutor'}
          </h2>
          <p className="text-sm text-text-secondary">{formatMonth(getCurrentMonth())}</p>
        </div>

        {/* Subscription Status */}
        {tutor?.subscriptionStatus === 'trial' && (
          <Card className="bg-primary-50 border border-primary-200">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-primary-600" />
              <div>
                <p className="font-medium text-primary-700">Free Trial Active</p>
                <p className="text-sm text-primary-600">
                  Expires on {new Date(tutor.trialExpiry).toLocaleDateString('en-IN')}
                </p>
              </div>
            </div>
          </Card>
        )}

        {tutor?.subscriptionStatus === 'locked' && (
          <Card className="bg-red-50 border border-red-200">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <div>
                <p className="font-medium text-red-700">Subscription Expired</p>
                <p className="text-sm text-red-600">
                  Renew to add students and mark payments
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-3">
          <Card>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100">
                <Users className="h-5 w-5 text-primary-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-text-primary">{students.length}</p>
                <p className="text-xs text-text-secondary">Students</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100">
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-text-primary">{pendingCount}</p>
                <p className="text-xs text-text-secondary">Pending</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Collection Summary */}
        <Card>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                <IndianRupee className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-text-secondary">Collected this month</p>
                <p className="text-xl font-bold text-text-primary">
                  {formatCurrency(collectedAmount)}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-text-muted">Expected</p>
              <p className="text-sm font-medium text-text-secondary">
                {formatCurrency(expectedTotal)}
              </p>
            </div>
          </div>
        </Card>

        {/* Recent Students */}
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-semibold text-text-primary">Recent Students</h3>
            <button
              onClick={() => navigate('/students')}
              className="text-sm text-primary-600"
            >
              View all
            </button>
          </div>

          <div className="space-y-2">
            {students.slice(0, 5).map((student) => (
              <Card
                key={student._id}
                className="cursor-pointer hover:shadow-card-hover transition-shadow"
                onClick={() => navigate(`/students/${student._id}`)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-text-primary">{student.name}</p>
                    <p className="text-sm text-text-secondary">
                      {formatCurrency(student.monthlyFee)}/month
                    </p>
                  </div>
                  <Badge variant="warning">Pending</Badge>
                </div>
              </Card>
            ))}

            {students.length === 0 && (
              <Card className="text-center py-8">
                <Users className="mx-auto h-12 w-12 text-text-muted" />
                <p className="mt-2 text-text-secondary">No students yet</p>
                <p className="text-sm text-text-muted">
                  Tap the + button to add your first student
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>

      <FloatingActionButton
        onClick={() => navigate('/students/new')}
        aria-label="Add student"
      />
    </Layout>
  );
}

export default DashboardPage;
