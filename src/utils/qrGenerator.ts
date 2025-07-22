import QRCode from 'qrcode';

export const generateQRCode = async (data: string): Promise<string> => {
  try {
    const qrCodeDataURL = await QRCode.toDataURL(data, {
      width: 256,
      margin: 2,
      color: {
        dark: '#059669',
        light: '#FFFFFF'
      }
    });
    return qrCodeDataURL;
  } catch (error) {
    console.error('QR Code generation error:', error);
    throw error;
  }
};

export const generateAttendanceQR = async (sessionId: string, classId: string): Promise<string> => {
  const qrData = JSON.stringify({
    sessionId,
    classId,
    timestamp: new Date().toISOString(),
    type: 'attendance'
  });
  return generateQRCode(qrData);
};