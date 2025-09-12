import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, type RegisterData } from '../../schemas/authSchemas';
import { useAuth } from '../../contexts/AuthContext';

interface RegisterFormProps {
  onSuccess?: () => void;
  onSwitchToLogin?: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onSuccess,
  onSwitchToLogin,
}) => {
  const { register: authRegister, isLoading } = useAuth();
  const [registerError, setRegisterError] = React.useState<string>('');

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  });

  const password = watch('password');

  const onSubmit = async (data: RegisterData) => {
    try {
      setRegisterError('');
      await authRegister({
        email: data.email,
        password: data.password,
        name: data.name,
        role: data.role,
      });
      reset();
      onSuccess?.();
    } catch (error) {
      setRegisterError(error instanceof Error ? error.message : 'Registration failed');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 text-center">
            Create Your Account
          </h2>
          <p className="text-gray-600 text-center mt-2">
            Join Shiksha-Mitra to start your learning journey
          </p>
        </div>

        {registerError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm">{registerError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Full Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Full Name
            </label>
            <input
              id="name"
              type="text"
              {...register('name')}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.name ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter your full name"
              disabled={isLoading}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              {...register('email')}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.email ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter your email"
              disabled={isLoading}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          {/* Role Selection */}
          <div>
            <fieldset>
              <legend className="block text-sm font-medium text-gray-700 mb-2">
                I am a...
              </legend>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    {...register('role')}
                    value="STUDENT"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    disabled={isLoading}
                  />
                  <span className="ml-2 text-gray-700">Student</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    {...register('role')}
                    value="TEACHER"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    disabled={isLoading}
                  />
                  <span className="ml-2 text-gray-700">Teacher</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    {...register('role')}
                    value="INSTITUTION"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    disabled={isLoading}
                  />
                  <span className="ml-2 text-gray-700">Institution</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    {...register('role')}
                    value="ADMIN"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    disabled={isLoading}
                  />
                  <span className="ml-2 text-gray-700">Administrator</span>
                </label>
              </div>
              {errors.role && (
                <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
              )}
            </fieldset>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register('password')}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.password ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Create a password"
              disabled={isLoading}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            )}
            <p className="mt-1 text-xs text-gray-500">
              Must be at least 8 characters with uppercase, lowercase, and number
            </p>
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              {...register('confirmPassword')}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Confirm your password"
              disabled={isLoading}
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* Terms Agreement */}
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="termsAccepted"
                type="checkbox"
                {...register('termsAccepted')}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                disabled={isLoading}
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="termsAccepted" className="font-medium text-gray-700">
                I agree to the{' '}
                <a href="#" className="text-blue-600 hover:text-blue-500 underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-blue-600 hover:text-blue-500 underline">
                  Privacy Policy
                </a>
              </label>
            </div>
          </div>
          {errors.termsAccepted && (
            <p className="text-sm text-red-600 mt-1">{errors.termsAccepted.message}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || isSubmitting}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading || isSubmitting ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 space-y-3">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or register with</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <button
              type="button"
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              onClick={() => console.log('OAuth registration with Google')}
            >
              Google
            </button>
            <button
              type="button"
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              onClick={() => console.log('OAuth registration with GitHub')}
            >
              GitHub
            </button>
            <button
              type="button"
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              onClick={() => console.log('OAuth registration with LinkedIn')}
            >
              LinkedIn
            </button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <div className="text-sm">
            <span className="text-gray-600">Already have an account? </span>
            {onSwitchToLogin && (
              <button
                type="button"
                onClick={onSwitchToLogin}
                className="text-blue-600 hover:text-blue-500 font-medium"
              >
                Sign in
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
