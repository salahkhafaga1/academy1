import React, { useState } from 'react';
import { Users, GraduationCap, DollarSign, Calendar, TrendingUp, BookOpen, QrCode } from 'lucide-react';
import { StudentsTable } from './StudentsTable';
import { StudentData } from '../../utils/reportExporter';
import { generateAttendanceQR } from '../../utils/qrGenerator';

const mockStudents: StudentData[] = [
  {
    id: 'ST001',
    name: 'محمد أحمد السالم',
    email: 'mohammed@example.com',
    phone: '+966501234567',
    enrollmentDate: '2024-01-15',
    attendance: 95,
    memorizedPages: 45,
    paymentStatus: 'paid'
  },
  {
    id: 'ST002',
    name: 'عبدالله محمد العلي',
    email: 'abdullah@example.com',
    phone: '+966502345678',
    enrollmentDate: '2024-02-01',
    attendance: 87,
    memorizedPages: 32,
    paymentStatus: 'partial'
  },
  {
    id: 'ST003',
    name: 'عمر حسن الأحمد',
    email: 'omar@example.com',
    phone: '+966503456789',
    enrollmentDate: '2024-01-20',
    attendance: 78,
    memorizedPages: 28,
    paymentStatus: 'unpaid'
  }
];

export const AdminDashboard: React.FC = () => {
  const [students] = useState<StudentData[]>(mockStudents);
  const [qrCode, setQRCode] = useState<string>('');
  const [showQRModal, setShowQRModal] = useState(false);

  const stats = [
    {
      title: 'إجمالي الطلاب',
      value: '124',
      icon: Users,
      color: 'bg-blue-500',
      change: '+12% من الشهر الماضي'
    },
    {
      title: 'المعلمين النشطين',
      value: '8',
      icon: GraduationCap,
      color: 'bg-emerald-500',
      change: '+2 معلمين جدد'
    },
    {
      title: 'الإيرادات الشهرية',
      value: '24,500 ر.س',
      icon: DollarSign,
      color: 'bg-amber-500',
      change: '+18% من الشهر الماضي'
    },
    {
      title: 'معدل الحضور',
      value: '89%',
      icon: TrendingUp,
      color: 'bg-teal-500',
      change: '+5% من الأسبوع الماضي'
    }
  ];

  const handleGenerateQR = async () => {
    try {
      const sessionId = `SESSION_${Date.now()}`;
      const classId = 'CLASS_001';
      const qrDataURL = await generateAttendanceQR(sessionId, classId);
      setQRCode(qrDataURL);
      setShowQRModal(true);
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  const handleEditStudent = (student: StudentData) => {
    console.log('Edit student:', student);
  };

  const handleDeleteStudent = (studentId: string) => {
    console.log('Delete student:', studentId);
  };

  const handleViewStudent = (student: StudentData) => {
    console.log('View student:', student);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">لوحة تحكم المدير</h1>
          <p className="text-gray-600">مرحباً بك في نظام إدارة أكاديمية أولي الأبصار</p>
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
            إنشاء كود QR للحضور
          </button>
          <button className="flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
            <Calendar className="w-5 h-5 ml-2" />
            جدولة حصة جديدة
          </button>
          <button className="flex items-center px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors">
            <BookOpen className="w-5 h-5 ml-2" />
            إضافة منهج جديد
          </button>
        </div>

        {/* Students Table */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">إدارة الطلاب</h2>
          <StudentsTable
            students={students}
            onEdit={handleEditStudent}
            onDelete={handleDeleteStudent}
            onView={handleViewStudent}
          />
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
                  اطلب من الطلاب مسح هذا الكود لتسجيل الحضور
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