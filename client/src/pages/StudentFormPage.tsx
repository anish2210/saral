import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Layout } from '../components/layout';
import { Card, Button, Input, Spinner } from '../components/ui';
import { api } from '../lib/api';
import type { StudentFormData, Student } from '../types';

function StudentFormPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditing = id && id !== 'new';

  const [isLoading, setIsLoading] = useState(isEditing);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<StudentFormData>({
    name: '',
    phone: '',
    monthlyFee: 0,
  });

  useEffect(() => {
    if (!isEditing) return;

    const fetchStudent = async () => {
      try {
        const res = await api.getStudent(id!);
        const student = res.student;
        setFormData({
          name: student.name,
          phone: student.phone || '',
          monthlyFee: student.monthlyFee,
        });
      } catch (err) {
        setError('Failed to load student');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudent();
  }, [id, isEditing]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim()) {
      setError('Please enter student name');
      return;
    }

    if (formData.monthlyFee <= 0) {
      setError('Please enter a valid monthly fee');
      return;
    }

    setIsSubmitting(true);

    try {
      if (isEditing) {
        await api.updateStudent(id!, formData);
      } else {
        await api.createStudent(formData);
      }
      navigate(-1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save student');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this student? This action cannot be undone.')) {
      return;
    }

    setIsSubmitting(true);
    try {
      await api.deleteStudent(id!);
      navigate('/students', { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete student');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <Layout title={isEditing ? 'Edit Student' : 'Add Student'} showBack showNav={false}>
        <div className="flex h-64 items-center justify-center">
          <Spinner size="lg" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={isEditing ? 'Edit Student' : 'Add Student'} showBack showNav={false}>
      <div className="p-4">
        <Card>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Student Name"
              placeholder="Enter student's full name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />

            <Input
              label="Phone Number (Optional)"
              placeholder="Student or parent's phone number"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              hint="Used to share payment status link"
            />

            <Input
              label="Monthly Fee"
              placeholder="Enter monthly fee amount"
              type="number"
              min="0"
              value={formData.monthlyFee || ''}
              onChange={(e) =>
                setFormData({ ...formData, monthlyFee: parseInt(e.target.value) || 0 })
              }
              required
            />

            {error && <p className="text-sm text-red-500">{error}</p>}

            <Button type="submit" className="w-full" isLoading={isSubmitting}>
              {isEditing ? 'Save Changes' : 'Add Student'}
            </Button>

            {isEditing && (
              <Button
                type="button"
                variant="danger"
                className="w-full"
                onClick={handleDelete}
                disabled={isSubmitting}
              >
                Delete Student
              </Button>
            )}
          </form>
        </Card>
      </div>
    </Layout>
  );
}

export default StudentFormPage;
