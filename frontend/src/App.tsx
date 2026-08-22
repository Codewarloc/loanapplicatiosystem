import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ToastProvider } from '@/context/ToastContext';
import Landing from '@/pages/Landing';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import Dashboard from '@/pages/Dashboard';
import Apply from '@/pages/Apply';
import History from '@/pages/History';
import { isAuthenticated } from '@/services/authService';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
}

function PublicAuthRoute({ children }: { children: React.ReactNode }) {
  return isAuthenticated() ? <Navigate to="/dashboard" replace /> : children;
}

function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<PublicAuthRoute><Login /></PublicAuthRoute>} />
          <Route path="/signup" element={<PublicAuthRoute><Signup /></PublicAuthRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/apply" element={<ProtectedRoute><Apply /></ProtectedRoute>} />
          <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;
