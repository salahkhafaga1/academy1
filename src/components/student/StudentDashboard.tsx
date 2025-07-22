import React from 'react';
import { Calendar, BookOpen, Award, Clock, TrendingUp, CheckCircle, Target, Star } from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const stats = [
    {
      title: 'الحضور هذا الشهر',
      value: '18/20',
      icon: CheckCircle,
      color: 'bg-emerald-500',
      change: '90%'
    },
    {
      title: 'الصفحات المحفوظة',
      value: '45',
      icon: BookOpen,
      color: 'bg-blue-500',
      change: 'من 604 صفحة'
    },
    {
      title: 'نقاط التقييم',
      value: '8.5/10',
      icon: Star,
      color: 'bg-amber-500',
      change: 'ممتاز'
    },
    {
      title: 'أيام الالتزام',
      value: '45',
      icon: Target,
      color: 'bg-purple-500',
      change: 'يوم متتالي'
    }
  ];

  const recentSessions = [
    {
      date: '2024-12-17',
      time: '08:00 - 09:30',
      teacher: 'الأستاذ أحمد',
      topic: 'سورة البقرة (1-20)',
      status: 'مكتمل',
      grade: '9/10'
    },
    {
      date: '2024-12-16',
      time: '08:00 - 09:30',
      teacher: 'الأستاذ أحمد',
      topic: 'مراجعة جزء عم',
      status: 'مكتمل',
      grade: '8.5/10'
    },
    {
      date: '2024-12-15',
      time: '08:00 - 09:30',
      teacher: 'الأستاذ أحمد',
      topic: 'سورة آل عمران (50-80)',
      status: 'مكتمل',
      grade: '9.5/10'
    }
  ];

  const upcomingSchedule = [
    {
      date: 'اليوم',
      time: '08:00 - 09:30',
      teacher: 'الأستاذ أحمد',
      topic: 'سورة البقرة (21-40)',
      room: 'القاعة الأولى'
    },
    {
      date: 'غداً',
      time: '08:00 - 09:30',
      teacher: 'الأستاذ أحمد',
      topic: 'مراجعة عامة',
      room: 'القاعة الأولى'
    },
    {
      date: 'بعد غد',
      time: '08:00 - 09:30',
      teacher: 'الأستاذ أحمد',
      topic: 'سورة البقرة (41-60)',
      room: 'القاعة الأولى'
    }
  ];

  const memorizedSurahs = [
    { name: 'الفاتحة', pages: 1, completed: true },
    { name: 'البقرة', pages: 49, completed: false, progress: 65 },
    { name: 'آل عمران', pages: 37, completed: false, progress: 45 },
    { name: 'النساء', pages: 35, completed: false, progress: 20 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">لوحة الطالب</h1>
          <p className="text-gray-600">أهلاً وسهلاً محمد أحمد، واصل رحلتك في حفظ القرآن الكريم</p>
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

        {/* Progress Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Memorization Progress */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">تقدم الحفظ</h2>
            </div>
            <div className="p-6 space-y-4">
              {memorizedSurahs.map((surah, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900">سورة {surah.name}</span>
                      <span className="text-sm text-gray-600">{surah.pages} صفحة</span>
                    </div>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${surah.completed ? 'bg-emerald-500' : 'bg-blue-500'}`}
                        style={{ width: `${surah.completed ? 100 : surah.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  {surah.completed && (
                    <div className="mr-4">
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Schedule */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">الجدول القادم</h2>
            </div>
            <div className="p-6 space-y-4">
              {upcomingSchedule.map((session, index) => (
                <div key={index} className="flex items-center space-x-4 rtl:space-x-reverse p-4 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-emerald-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900">{session.topic}</h3>
                      <span className="text-sm text-gray-500">{session.date}</span>
                    </div>
                    <p className="text-sm text-gray-600">{session.time} - {session.teacher}</p>
                    <p className="text-xs text-gray-500">{session.room}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Sessions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">الحصص الأخيرة</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    التاريخ
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الوقت
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    المعلم
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الموضوع
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    التقييم
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الحالة
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentSessions.map((session, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {session.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {session.time}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {session.teacher}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {session.topic}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full">
                        {session.grade}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                        {session.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};