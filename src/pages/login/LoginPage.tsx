import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Eye, EyeOff, BookOpen, Users, GraduationCap } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(email, password);
    } catch (error: any) {
      setError('بيانات الدخول غير صحيحة');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Login Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 lg:p-12 border border-gray-100">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-600 rounded-full mb-4">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">أولي الأبصار</h1>
            <p className="text-gray-600">أكاديمية تحفيظ القرآن الكريم</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                البريد الإلكتروني
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                placeholder="admin@oli-al-absar.com"
                required
                dir="ltr"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                كلمة المرور
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors pr-12"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
              ) : (
                'تسجيل الدخول'
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="text-sm text-gray-600 space-y-2">
              <p><strong>حساب المدير:</strong> admin@oli-al-absar.com</p>
              <p><strong>حساب المعلم:</strong> teacher@oli-al-absar.com</p>
              <p><strong>حساب الطالب:</strong> student@oli-al-absar.com</p>
              <p className="text-xs text-gray-500">كلمة المرور: 123456</p>
            </div>
          </div>
        </div>

        {/* Right Side - Features */}
        <div className="hidden lg:block">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              نظام إدارة شامل
            </h2>
            <p className="text-xl text-gray-600">
              لأكاديميات تحفيظ القرآن الكريم
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex items-start space-x-4 rtl:space-x-reverse">
              <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">إدارة الطلاب والمعلمين</h3>
                <p className="text-gray-600">نظام شامل لإدارة بيانات الطلاب والمعلمين مع متابعة التقدم</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 rtl:space-x-reverse">
              <div className="flex-shrink-0 w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-teal-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">متابعة الحفظ والحضور</h3>
                <p className="text-gray-600">تتبع دقيق لحفظ الطلاب وحضورهم باستخدام أكواد QR</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 rtl:space-x-reverse">
              <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">تقارير شاملة</h3>
                <p className="text-gray-600">إنشاء وتصدير التقارير بصيغ مختلفة مع إرسال تلقائي</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};