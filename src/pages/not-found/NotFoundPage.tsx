import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowRight } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="text-6xl font-bold text-emerald-600 mb-4">404</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">الصفحة غير موجودة</h1>
          <p className="text-gray-600">الصفحة التي تبحث عنها غير موجودة أو تم نقلها</p>
        </div>
        
        <div className="space-y-4">
          <Link
            to="/dashboard"
            className="inline-flex items-center px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors"
          >
            <Home className="w-5 h-5 ml-2" />
            العودة للرئيسية
          </Link>
          
          <div className="text-sm text-gray-500">
            أو{' '}
            <button
              onClick={() => window.history.back()}
              className="text-emerald-600 hover:text-emerald-700 font-medium"
            >
              ارجع للصفحة السابقة
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};