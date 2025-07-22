import { useAuth } from './useAuth';

export const useRole = () => {
  const { userProfile, isAuthenticated } = useAuth();

  const hasRole = (allowedRoles: string[]) => {
    if (!isAuthenticated || !userProfile) return false;
    return allowedRoles.includes(userProfile.role);
  };

  const canAccessAdmin = () => hasRole(['admin']);
  const canAccessTeacher = () => hasRole(['admin', 'teacher']);
  const canAccessStudent = () => hasRole(['admin', 'teacher', 'student']);

  return {
    userRole: userProfile?.role,
    hasRole,
    canAccessAdmin,
    canAccessTeacher,
    canAccessStudent
  };
};