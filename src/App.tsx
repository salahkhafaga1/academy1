import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/login/LoginPage';
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { NotFoundPage } from './pages/not-found/NotFoundPage';
import { useAuth } from './hooks/useAuth';
import { LoadingSpinner } from './components/shared/LoadingSpinner';

function App() {
  const { loading, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center">
        <LoadingSpinner size="large" text="تحميل التطبيق..." />
      </div>
    );
  }

  return (
    <Router>
      <div className="App" dir="rtl">
        <Routes>
          <Route 
            path="/login" 
            element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />} 
          />
          <Route 
            path="/dashboard" 
            element={<DashboardPage />} 
          />
          <Route 
            path="/" 
            element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} 
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;