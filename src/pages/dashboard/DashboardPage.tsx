import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { ProtectedRoute } from '../../components/shared/ProtectedRoute';
import { Header } from '../../components/shared/Header';
import { AdminDashboard } from '../../components/admin/AdminDashboard';
import { TeacherDashboard } from '../../components/teacher/TeacherDashboard';
import { StudentDashboard } from '../../components/student/StudentDashboard';

export const DashboardPage: React.FC = () => {
  const { userProfile } = useAuth();

  const renderDashboard = () => {
    switch (userProfile?.role) {
      case 'admin':
        return <AdminDashboard />;
      case 'teacher':
        return <TeacherDashboard />;
      case 'student':
        return <StudentDashboard />;
      default:
        return (
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">دور المستخدم غير معروف</h2>
              <p className="text-gray-600">يرجى التواصل مع الإدارة</p>
            </div>
          </div>
        );
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Header />
        {renderDashboard()}
      </div>
    </ProtectedRoute>
  );
};