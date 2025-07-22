import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import { format } from 'date-fns';

export interface StudentData {
  id: string;
  name: string;
  email: string;
  phone: string;
  enrollmentDate: string;
  attendance: number;
  memorizedPages: number;
  paymentStatus: 'paid' | 'unpaid' | 'partial';
}

export const exportToPDF = (students: StudentData[], title: string = 'Students Report') => {
  const doc = new jsPDF();
  
  // Header
  doc.setFontSize(20);
  doc.text(title, 20, 20);
  doc.setFontSize(12);
  doc.text(`Generated on: ${format(new Date(), 'PPP')}`, 20, 30);
  
  // Table headers
  let yPosition = 50;
  doc.setFontSize(10);
  const headers = ['Name', 'Email', 'Phone', 'Attendance%', 'Pages', 'Payment'];
  const columnWidths = [40, 50, 30, 25, 20, 25];
  let xPosition = 10;
  
  headers.forEach((header, index) => {
    doc.text(header, xPosition, yPosition);
    xPosition += columnWidths[index];
  });
  
  // Table content
  yPosition += 10;
  students.forEach((student) => {
    xPosition = 10;
    const rowData = [
      student.name,
      student.email,
      student.phone,
      `${student.attendance}%`,
      student.memorizedPages.toString(),
      student.paymentStatus
    ];
    
    rowData.forEach((data, index) => {
      doc.text(data, xPosition, yPosition);
      xPosition += columnWidths[index];
    });
    yPosition += 10;
    
    if (yPosition > 280) {
      doc.addPage();
      yPosition = 20;
    }
  });
  
  doc.save(`${title.toLowerCase().replace(/\s+/g, '-')}-${format(new Date(), 'yyyy-MM-dd')}.pdf`);
};

export const exportToExcel = (students: StudentData[], filename: string = 'students-report') => {
  const worksheet = XLSX.utils.json_to_sheet(students.map(student => ({
    'Name': student.name,
    'Email': student.email,
    'Phone': student.phone,
    'Enrollment Date': student.enrollmentDate,
    'Attendance (%)': student.attendance,
    'Memorized Pages': student.memorizedPages,
    'Payment Status': student.paymentStatus
  })));
  
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Students');
  
  XLSX.writeFile(workbook, `${filename}-${format(new Date(), 'yyyy-MM-dd')}.xlsx`);
};