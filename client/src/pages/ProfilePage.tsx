import { useState, useEffect } from 'react';
import { useClerk, useUser } from '@clerk/clerk-react';
import { LogOut, CreditCard, Users, Phone, Mail, Calendar } from 'lucide-react';
import { Layout } from '../components/layout';
import { Card, Button, Badge, Spinner } from '../components/ui';
import { api } from '../lib/api';
import { formatCurrency } from '../lib/utils';
import type { Tutor } from '../types';

const PLAN_DETAILS = {
  solo: { name: 'Solo', price: 399, studentLimit: 25 },
  pro: { name: 'Pro', price: 699, studentLimit: 75 },
  institute: { name: 'Institute', price: 1499, studentLimit: 200 },
};

function ProfilePage() {
  const { signOut } = useClerk();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [tutor, setTutor] = useState<Tutor | null>(null);
  const [studentCount, setStudentCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tutorRes, studentsRes] = await Promise.all([
          api.getMe(),
          api.getStudents(),
        ]);
        setTutor(tutorRes.tutor);
        setStudentCount(studentsRes.students.length);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSignOut = async () => {
    await signOut();
  };

  if (isLoading) {
    return (
      <Layout title="Profile" showNav>
        <div className="flex h-64 items-center justify-center">
          <Spinner size="lg" />
        </div>
      </Layout>
    );
  }

  const planInfo = tutor ? PLAN_DETAILS[tutor.planType] : null;
  const statusColors = {
    trial: 'info',
    active: 'success',
    grace: 'warning',
    locked: 'error',
  } as const;

  return (
    <Layout title="Profile" showNav>
      <div className="p-4 space-y-4">
        {/* Profile Header */}
        <Card>
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 text-primary-600 text-2xl font-semibold">
              {tutor?.name?.charAt(0).toUpperCase() || 'T'}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-text-primary">{tutor?.name}</h2>
              <p className="text-sm text-text-secondary">Tutor</p>
            </div>
          </div>
        </Card>

        {/* Contact Info */}
        <Card>
          <h3 className="mb-3 font-semibold text-text-primary">Contact Information</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-text-muted" />
              <span className="text-text-secondary">{tutor?.phone || 'Not provided'}</span>
            </div>
            {user?.primaryEmailAddress && (
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-text-muted" />
                <span className="text-text-secondary">
                  {user.primaryEmailAddress.emailAddress}
                </span>
              </div>
            )}
          </div>
        </Card>

        {/* Subscription Card */}
        <Card>
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-text-primary">Subscription</h3>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-lg font-bold text-primary-600">
                  {planInfo?.name} Plan
                </span>
                <Badge variant={statusColors[tutor?.subscriptionStatus || 'trial']}>
                  {tutor?.subscriptionStatus?.charAt(0).toUpperCase()}
                  {tutor?.subscriptionStatus?.slice(1)}
                </Badge>
              </div>
            </div>
            <CreditCard className="h-6 w-6 text-text-muted" />
          </div>

          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-text-secondary">Price</span>
              <span className="font-medium text-text-primary">
                {formatCurrency(planInfo?.price || 0)}/month
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Student Limit</span>
              <span className="font-medium text-text-primary">
                {studentCount} / {tutor?.studentLimit || planInfo?.studentLimit}
              </span>
            </div>
            {tutor?.subscriptionStatus === 'trial' && tutor.trialExpiry && (
              <div className="flex justify-between">
                <span className="text-text-secondary">Trial Expires</span>
                <span className="font-medium text-text-primary">
                  {new Date(tutor.trialExpiry).toLocaleDateString('en-IN')}
                </span>
              </div>
            )}
            {tutor?.planExpiry && tutor?.subscriptionStatus !== 'trial' && (
              <div className="flex justify-between">
                <span className="text-text-secondary">Renews On</span>
                <span className="font-medium text-text-primary">
                  {new Date(tutor.planExpiry).toLocaleDateString('en-IN')}
                </span>
              </div>
            )}
          </div>

          {(tutor?.subscriptionStatus === 'trial' ||
            tutor?.subscriptionStatus === 'locked' ||
            tutor?.subscriptionStatus === 'grace') && (
            <Button className="mt-4 w-full">Upgrade Plan</Button>
          )}
        </Card>

        {/* Stats */}
        <Card>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100">
                <Users className="h-5 w-5 text-primary-600" />
              </div>
              <div>
                <p className="font-semibold text-text-primary">Total Students</p>
                <p className="text-sm text-text-secondary">{studentCount} students</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Sign Out */}
        <Button variant="outline" className="w-full" onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>

        {/* App Version */}
        <p className="text-center text-xs text-text-muted">Saral v1.0.0</p>
      </div>
    </Layout>
  );
}

export default ProfilePage;
