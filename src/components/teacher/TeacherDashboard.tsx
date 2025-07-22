import React, { useState } from 'react';
import { Users, CheckCircle, BookOpen, Calendar, Award, QrCode } from 'lucide-react';
import { generateAttendanceQR } from '../../utils/qrGenerator';

export const TeacherDashboard: React.FC = () => {
  const [qrCode, setQRCode] = useState<string>('');
  const [showQRModal, setShowQRModal] = useState(false);

  const stats = [
    {
      title: 'طلابي',
      value: '32',
      icon: Users,
      color: 'bg-blue-500',
      change: 'في 4 مجموعات'
    },
    {
      title: 'الحضور اليوم',
      value: '28/32',
      icon: CheckCircle,
      color: 'bg-emerald-500',
      change: '87.5%'
    },
    {
      title: 'الحصص هذا الأسبوع',
      value: '16',
      icon: Calendar,
      color: 'bg-amber-500',
      change: '4 حصص يومياً'
    },
    {
      title: 'الطلاب المتميزون',
      value: '8',
      icon: Award,
      color: 'bg-purple-500',
      change: 'هذا الشهر'
    }
  ];

  const upcomingClasses = [
    {
      time: '08:00 - 09:30',
      group: 'المجموعة الأولى',
      students: 8,
      level: 'جزء عم',
      status: 'قريباً'
    },
    {
      time: '10:00 - 11:30',
      group: 'المجموعة الثانية',
      students: 10,
      level: 'الجزء الأول',
      status: 'نشط'
    },
    {
      time: '14:00 - 15:30',
      group: 'المجموعة الثالثة',
      students: 7,
      level: 'جزء تبارك',
      status: 'قريباً'
    }
  ];

  const recentProgress = [
    {
      student: 'محمد أحمد',
      progress: 'أتم حفظ سورة البقرة',
      time: 'منذ ساعة',
      type: 'memorization'
    },
    {
      student: 'عبدالله محمد',
      progress: 'حضر 5 حصص متتالية',
      time: 'منذ يومين',
      type: 'attendance'
    },
    {
      student: 'عمر حسن',
      progress: 'تحسن في التجويد',
      time: 'منذ 3 أيام',
      type: 'evaluation'
    }
  ];

  const handleGenerateQR = async () => {
    try {
      const sessionId = `SESSION_${Date.now()}`;
      const classId = 'CLASS_TEACHER_001';
      const qrDataURL = await generateAttendanceQR(sessionId, classId);
      setQRCode(qrDataURL);
      setShowQRModal(true);
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">لوحة تحكم المعلم</h1>
          <p className="text-gray-600">أهلاً وسهلاً أستاذ أحمد</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                <p className="text-sm font-medium text-gray-600 mb-2">{stat.title}</p>
                <p className="text-xs text-gray-500">{stat.change}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <button
            onClick={handleGenerateQR}
            className="flex items-center px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
          >
            <QrCode className="w-5 h-5 ml-2" />
            إنشاء كود حضور
          </button>
          <button className="flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
            <BookOpen className="w-5 h-5 ml-2" />
            تسجيل تقييم
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upcoming Classes */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">الحصص القادمة</h2>
            </div>
            <div className="p-6 space-y-4">
              {upcomingClasses.map((classItem, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-gray-900">{classItem.group}</h3>
                    <p className="text-sm text-gray-600">{classItem.time}</p>
                    <p className="text-xs text-gray-500">{classItem.students} طلاب - {classItem.level}</p>
                  </div>
                  <div className="text-left">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      classItem.status === 'نشط' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {classItem.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Progress */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">آخر التحديثات</h2>
            </div>
            <div className="p-6 space-y-4">
              {recentProgress.map((progress, index) => (
                <div key={index} className="flex items-start space-x-4 rtl:space-x-reverse">
                  <div className={`p-2 rounded-full ${
                    progress.type === 'memorization' ? 'bg-emerald-100' :
                    progress.type === 'attendance' ? 'bg-blue-100' : 'bg-amber-100'
                  }`}>
                    {progress.type === 'memorization' && <BookOpen className="w-4 h-4 text-emerald-600" />}
                    {progress.type === 'attendance' && <CheckCircle className="w-4 h-4 text-blue-600" />}
                    {progress.type === 'evaluation' && <Award className="w-4 h-4 text-amber-600" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{progress.student}</p>
                    <p className="text-sm text-gray-600">{progress.progress}</p>
                    <p className="text-xs text-gray-500">{progress.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* QR Code Modal */}
        {showQRModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">كود QR للحضور</h3>
                <div className="mb-6 flex justify-center">
                  {qrCode && <img src={qrCode} alt="QR Code" className="rounded-lg shadow-lg" />}
                </div>
                <p className="text-gray-600 mb-6">
                  اعرض هذا الكود للطلاب لتسجيل حضورهم
                </p>
                <div className="flex space-x-4 rtl:space-x-reverse">
                  <button
                    onClick={() => setShowQRModal(false)}
                    className="flex-1 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg transition-colors"
                  >
                    إغلاق
                  </button>
                  <button className="flex-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors">
                    تحميل
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};