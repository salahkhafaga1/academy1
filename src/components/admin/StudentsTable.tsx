import React, { useState } from 'react';
import { Search, Filter, Download, Eye, Edit, Trash2, UserPlus } from 'lucide-react';
import { StudentData, exportToPDF, exportToExcel } from '../../utils/reportExporter';

interface StudentsTableProps {
  students: StudentData[];
  onEdit: (student: StudentData) => void;
  onDelete: (studentId: string) => void;
  onView: (student: StudentData) => void;
}

export const StudentsTable: React.FC<StudentsTableProps> = ({
  students,
  onEdit,
  onDelete,
  onView
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'paid' | 'unpaid' | 'partial'>('all');

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || student.paymentStatus === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleExportPDF = () => {
    exportToPDF(filteredStudents, 'Students Report');
  };

  const handleExportExcel = () => {
    exportToExcel(filteredStudents, 'students-report');
  };

  const getPaymentStatusBadge = (status: string) => {
    const statusConfig = {
      paid: 'bg-green-100 text-green-800',
      unpaid: 'bg-red-100 text-red-800',
      partial: 'bg-yellow-100 text-yellow-800'
    };
    
    const statusText = {
      paid: 'مدفوع',
      unpaid: 'غير مدفوع',
      partial: 'جزئي'
    };

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusConfig[status as keyof typeof statusConfig]}`}>
        {statusText[status as keyof typeof statusText]}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="بحث بالاسم أو البريد..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="all">جميع الحالات</option>
              <option value="paid">مدفوع</option>
              <option value="unpaid">غير مدفوع</option>
              <option value="partial">جزئي</option>
            </select>
          </div>

          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <button
              onClick={handleExportPDF}
              className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <Download className="w-4 h-4 ml-2" />
              PDF
            </button>
            <button
              onClick={handleExportExcel}
              className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <Download className="w-4 h-4 ml-2" />
              Excel
            </button>
            <button className="flex items-center px-4 py-2 text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors">
              <UserPlus className="w-4 h-4 ml-2" />
              إضافة طالب
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                الطالب
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                معلومات الاتصال
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                الحضور
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                الحفظ
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                حالة الدفع
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                الإجراءات
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredStudents.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-emerald-500 flex items-center justify-center">
                      <span className="text-white font-medium">
                        {student.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </span>
                    </div>
                    <div className="mr-4">
                      <div className="text-sm font-medium text-gray-900">{student.name}</div>
                      <div className="text-sm text-gray-500">ID: {student.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{student.email}</div>
                  <div className="text-sm text-gray-500">{student.phone}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-emerald-600 h-2 rounded-full"
                        style={{ width: `${student.attendance}%` }}
                      ></div>
                    </div>
                    <span className="mr-2 text-sm text-gray-600">{student.attendance}%</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{student.memorizedPages} صفحة</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getPaymentStatusBadge(student.paymentStatus)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <button
                      onClick={() => onView(student)}
                      className="text-emerald-600 hover:text-emerald-900 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onEdit(student)}
                      className="text-blue-600 hover:text-blue-900 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(student.id)}
                      className="text-red-600 hover:text-red-900 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredStudents.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500">لا توجد نتائج</div>
          </div>
        )}
      </div>
    </div>
  );
};