import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { LoginForm } from '@/components/auth/LoginForm';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { ForgotPasswordForm } from '@/components/auth/ForgotPasswordForm';
import { Stats } from '@/components/dashboard/Stats';
import { UploadForm } from '@/components/validation/UploadForm';
import { ValidationHistory } from '@/components/history/ValidationHistory';
import { CreditPackages } from '@/components/credits/CreditPackages';
import { SettingsForm } from '@/components/settings/SettingsForm';
import { ApiDashboard } from '@/components/api/ApiDashboard';

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      <main className="pl-64 pt-14">
        <div className="container py-8 px-4">
          {children}
        </div>
      </main>
    </div>
  );
}

function DashboardPage() {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <Button variant="default" onClick={() => navigate('/validate')}>
          New Validation
        </Button>
      </div>
      <Stats />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route
          path="/login"
          element={
            <div className="flex items-center justify-center min-h-screen bg-gray-50/50">
              <LoginForm />
            </div>
          }
        />
        <Route
          path="/register"
          element={
            <div className="flex items-center justify-center min-h-screen bg-gray-50/50">
              <RegisterForm />
            </div>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <div className="flex items-center justify-center min-h-screen">
              <ForgotPasswordForm />
            </div>
          }
        />
        <Route
          path="/dashboard"
          element={
            <AppLayout>
              <DashboardPage />
            </AppLayout>
          }
        />
        <Route
          path="/validate"
          element={
            <AppLayout>
              <div className="max-w-2xl mx-auto space-y-8">
                <h1 className="text-3xl font-bold tracking-tight">Validate Emails</h1>
                <UploadForm />
              </div>
            </AppLayout>
          }
        />
        <Route
          path="/history"
          element={
            <AppLayout>
              <div className="space-y-8">
                <h1 className="text-3xl font-bold tracking-tight">Validation History</h1>
                <ValidationHistory />
              </div>
            </AppLayout>
          }
        />
        <Route
          path="/api"
          element={
            <AppLayout>
              <ApiDashboard />
            </AppLayout>
          }
        />
        <Route
          path="/credits"
          element={
            <AppLayout>
              <div className="space-y-8">
                <h1 className="text-3xl font-bold tracking-tight">Purchase Credits</h1>
                <CreditPackages />
              </div>
            </AppLayout>
          }
        />
        <Route
          path="/settings"
          element={
            <AppLayout>
              <div className="space-y-8">
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                <SettingsForm />
              </div>
            </AppLayout>
          }
        />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;