import React, { useState } from 'react';
import { LoginForm } from '../components/auth/LoginForm';
import { RegisterForm } from '../components/auth/RegisterForm';
import { useAuth } from '../contexts/AuthContext';

type AuthMode = 'login' | 'register';

interface AuthPageProps {
  onBack?: () => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onBack }) => {
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const { isLoading, user } = useAuth();

  // Redirect if already authenticated
  React.useEffect(() => {
    if (user) {
      // Navigate to dashboard or home page
      console.log('User authenticated, redirecting...');
      // window.location.href = '/dashboard'; // or use your routing solution
    }
  }, [user]);

  const handleLoginSuccess = () => {
    console.log('Login successful, redirecting to dashboard...');
    // In a real app, this would trigger navigation
    // For now, we'll just log it
  };

  const handleRegisterSuccess = () => {
    console.log('Registration successful, please check your email for verification');
    // Optionally switch back to login mode after successful registration
    setTimeout(() => {
      setAuthMode('login');
    }, 2000);
  };

  const handleSwitchToLogin = () => {
    setAuthMode('login');
  };

  const handleSwitchToRegister = () => {
    setAuthMode('register');
  };

  if (isLoading && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Back Button */}
        {onBack && (
          <button
            onClick={onBack}
            className="mb-4 text-blue-600 hover:text-blue-500 font-medium"
          >
            ← Back to Home
          </button>
        )}

        {/* Header with Logo */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl font-bold text-white">S</span>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900">
            Shiksha-Mitra
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Your personalized learning journey begins here
          </p>
        </div>

        {/* Auth Mode Toggle */}
        <div className="flex rounded-lg bg-gray-100 p-1">
          <button
            type="button"
            onClick={handleSwitchToLogin}
            className={`flex-1 py-2 px-4 rounded-md font-medium text-sm transition-all duration-200 ${
              authMode === 'login'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            disabled={isLoading}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={handleSwitchToRegister}
            className={`flex-1 py-2 px-4 rounded-md font-medium text-sm transition-all duration-200 ${
              authMode === 'register'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            disabled={isLoading}
          >
            Sign Up
          </button>
        </div>

        {/* Auth Forms */}
        <div className="transition-all duration-300 ease-in-out">
          {authMode === 'login' ? (
            <LoginForm
              onSuccess={handleLoginSuccess}
              onSwitchToRegister={handleSwitchToRegister}
            />
          ) : (
            <RegisterForm
              onSuccess={handleRegisterSuccess}
              onSwitchToLogin={handleSwitchToLogin}
            />
          )}
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-xs text-gray-500">
            By continuing, you agree to our{' '}
            <a href="#" className="text-blue-600 hover:text-blue-500 underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-blue-600 hover:text-blue-500 underline">
              Privacy Policy
            </a>
          </p>

          {authMode === 'login' && (
            <div className="mt-4">
              <button
                type="button"
                className="text-blue-600 hover:text-blue-500 text-sm font-medium"
                onClick={() => console.log('Forgot password clicked')}
              >
                Forgot your password?
              </button>
            </div>
          )}
        </div>

        {/* Demo Users for Testing */}
        <div className="mt-8 p-4 bg-white rounded-lg border border-gray-200">
          <h3 className="text-sm font-medium text-gray-900 mb-2">Demo Users (for testing)</h3>
          <div className="space-y-2 text-xs text-gray-600">
            <div><strong>Student:</strong> student@demo.com / password</div>
            <div><strong>Teacher:</strong> teacher@demo.com / password</div>
            <div><strong>Admin:</strong> admin@demo.com / password</div>
          </div>
          <p className="mt-2 text-xs text-gray-500">
            Use these credentials for testing the authentication flow
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
