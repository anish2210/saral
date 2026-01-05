import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Users } from 'lucide-react';
import { Layout, FloatingActionButton } from '../components/layout';
import { Card, Input, Spinner, EmptyState } from '../components/ui';
import { api } from '../lib/api';
import { formatCurrency } from '../lib/utils';
import type { Student } from '../types';

function StudentsPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [students, setStudents] = useState<Student[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await api.getStudents();
        setStudents(res.students);
      } catch (error) {
        console.error('Failed to fetch students:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <Layout title="Students" showBack>
        <div className="flex h-64 items-center justify-center">
          <Spinner size="lg" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Students" showNav>
      <div className="p-4 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            placeholder="Search students..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-[var(--radius-input)] border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-text-primary placeholder:text-text-muted focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          />
        </div>

        {/* Student Count */}
        <p className="text-sm text-text-secondary">
          {filteredStudents.length} student{filteredStudents.length !== 1 ? 's' : ''}
        </p>

        {/* Students List */}
        <div className="space-y-2">
          {filteredStudents.map((student) => (
            <Card
              key={student._id}
              className="cursor-pointer hover:shadow-card-hover transition-shadow"
              onClick={() => navigate(`/students/${student._id}`)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-primary-600 font-semibold">
                    {student.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium text-text-primary">{student.name}</p>
                    {student.phone && (
                      <p className="text-sm text-text-muted">{student.phone}</p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-text-primary">
                    {formatCurrency(student.monthlyFee)}
                  </p>
                  <p className="text-xs text-text-muted">per month</p>
                </div>
              </div>
            </Card>
          ))}

          {filteredStudents.length === 0 && students.length > 0 && (
            <EmptyState
              icon={<Search className="h-8 w-8" />}
              title="No results found"
              description={`No students match "${searchQuery}"`}
            />
          )}

          {students.length === 0 && (
            <EmptyState
              icon={<Users className="h-8 w-8" />}
              title="No students yet"
              description="Add your first student to start tracking payments"
            />
          )}
        </div>
      </div>

      <FloatingActionButton
        onClick={() => navigate('/students/new')}
        aria-label="Add student"
      />
    </Layout>
  );
}

export default StudentsPage;
