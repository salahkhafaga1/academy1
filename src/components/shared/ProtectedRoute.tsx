import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useRole } from '../../hooks/useRole';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
  fallback?: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  allowedRoles = [], 
  fallback 
}) => {
  const { isAuthenticated, loading } = useAuth();
  const { hasRole } = useRole();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent mx-auto"></div>
          <p className="text-gray-600 mt-4 text-center">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return fallback || (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">غير مسموح</h2>
          <p className="text-gray-600">يجب تسجيل الدخول للوصول لهذه الصفحة</p>
        </div>
      </div>
    );
  }

  if (allowedRoles.length > 0 && !hasRole(allowedRoles)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">غير مسموح</h2>
          <p className="text-gray-600">ليس لديك صلاحية للوصول لهذه الصفحة</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};