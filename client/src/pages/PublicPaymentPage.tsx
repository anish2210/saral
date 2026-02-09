import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Check, Clock, AlertTriangle } from 'lucide-react';
import { Card, Badge, Spinner } from '../components/ui';
import { api } from '../lib/api';
import { formatCurrency, formatMonth } from '../lib/utils';
import type { PublicPaymentView } from '../types';

function PublicPaymentPage() {
  const { token } = useParams<{ token: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [data, setData] = useState<PublicPaymentView | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        setError('Invalid link');
        setIsLoading(false);
        return;
      }

      try {
        const result = await api.getPublicPaymentView(token);
        setData(result);
      } catch (err) {
        setError('Unable to load payment information. Please check the link.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
          <AlertTriangle className="h-8 w-8 text-red-500" />
        </div>
        <h1 className="mt-4 text-xl font-semibold text-text-primary">Link Not Found</h1>
        <p className="mt-2 text-center text-text-secondary">
          {error || 'Unable to load payment information'}
        </p>
      </div>
    );
  }

  // Sort payments by month (most recent first)
  const sortedPayments = [...data.payments].sort((a, b) => b.month.localeCompare(a.month));

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary-500 px-4 py-6 text-white">
        <h1 className="text-xl font-semibold">Payment Status</h1>
        <p className="mt-1 text-primary-100">View your tuition fee payment history</p>
      </header>

      <div className="p-4 space-y-4">
        {/* Student Info */}
        <Card>
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 text-primary-600 text-2xl font-semibold">
              {data.studentName.charAt(0).toUpperCase()}
            </div>
            <h2 className="mt-3 text-xl font-semibold text-text-primary">
              {data.studentName}
            </h2>
            <p className="text-text-secondary">Student of {data.tutorName}</p>
            <div className="mt-3 inline-flex items-center rounded-full bg-primary-100 px-4 py-2">
              <span className="text-sm text-primary-600">Monthly Fee:</span>
              <span className="ml-2 font-semibold text-primary-700">
                {formatCurrency(data.monthlyFee)}
              </span>
            </div>
          </div>
        </Card>

        {/* Payment History */}
        <div>
          <h3 className="mb-3 font-semibold text-text-primary">Payment History</h3>
          <div className="space-y-2">
            {sortedPayments.length === 0 ? (
              <Card className="text-center py-8">
                <Clock className="mx-auto h-12 w-12 text-text-muted" />
                <p className="mt-2 text-text-secondary">No payment records yet</p>
              </Card>
            ) : (
              sortedPayments.map((payment) => {
                const isPaid = payment.status === 'Paid';

                return (
                  <Card key={payment._id}>
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
                          <p className="font-medium text-text-primary">
                            {formatMonth(payment.month)}
                          </p>
                          <p className="text-sm text-text-secondary">
                            {formatCurrency(payment.amount)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={isPaid ? 'success' : 'warning'}>
                          {payment.status}
                        </Badge>
                        {isPaid && <Badge variant="default">{payment.method}</Badge>}
                      </div>
                    </div>
                  </Card>
                );
              })
            )}
          </div>
        </div>

        {/* Disclaimer */}
        <Card className="bg-gray-50 border border-gray-200">
          <div className="flex gap-3">
            <AlertTriangle className="h-5 w-5 flex-shrink-0 text-text-muted" />
            <p className="text-xs text-text-muted">
              Payment status is updated by the tutor. This platform does not process or
              verify payments. For any discrepancies, please contact your tutor directly.
            </p>
          </div>
        </Card>

        {/* Branding */}
        <p className="text-center text-xs text-text-muted">
          Powered by <a href={import.meta.env.VITE_LANDING_URL || 'https://saral.space'} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary-600 hover:underline">Saral</a>
        </p>
      </div>
    </div>
  );
}

export default PublicPaymentPage;
