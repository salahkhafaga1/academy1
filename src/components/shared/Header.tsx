import React from 'react';
import { LogOut, User, Bell } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export const Header: React.FC = () => {
  const { userProfile, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-emerald-600">أولي الأبصار</h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <button className="text-gray-400 hover:text-gray-600 transition-colors">
              <Bell className="h-5 w-5" />
            </button>
            
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{userProfile?.name}</p>
                <p className="text-xs text-gray-500 capitalize">{userProfile?.role}</p>
              </div>
              <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-emerald-500 flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="text-gray-400 hover:text-red-600 transition-colors"
              title="تسجيل الخروج"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};