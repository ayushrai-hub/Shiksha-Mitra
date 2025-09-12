import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'STUDENT' | 'TEACHER' | 'INSTITUTION' | 'ADMIN';
  emailVerified: boolean;
  createdAt: Date;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  loginWithProvider: (provider: AuthProvider) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
  role: User['role'];
}

type AuthProvider = 'google' | 'github' | 'linkedin';

// Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Provider Component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem('shiksha-jwt');
        if (token) {
          // TODO: Validate token with API
          // For now, use mock user
          const mockUser: User = {
            id: 'user-1',
            email: 'demo@shikshamiitra.com',
            name: 'Demo User',
            role: 'STUDENT',
            emailVerified: true,
            createdAt: new Date(),
          };
          setUser(mockUser);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('shiksha-jwt');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // TODO: Implement actual API call
      // For now, mock login with demo credentials validation
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay

      // Demo credentials validation
      const validCredentials = [
        { email: 'student@demo.com', password: 'password', role: 'STUDENT' as const, name: 'Demo Student' },
        { email: 'teacher@demo.com', password: 'password', role: 'TEACHER' as const, name: 'Demo Teacher' },
        { email: 'admin@demo.com', password: 'password', role: 'ADMIN' as const, name: 'Demo Admin' },
      ];

      const validCredential = validCredentials.find(
        cred => cred.email === email && cred.password === password
      );

      if (!validCredential) {
        // Allow any email/password for testing (mock login)
        const mockUser: User = {
          id: 'user-' + Date.now(),
          email,
          name: email.split('@')[0],
          role: 'STUDENT',
          emailVerified: false,
          createdAt: new Date(),
        };

        const token = 'mock-jwt-token-' + Date.now();
        localStorage.setItem('shiksha-jwt', token);
        setUser(mockUser);
      } else {
        // Valid demo credential found
        const mockUser: User = {
          id: validCredential.email === 'student@demo.com' ? 'demo-student-id' :
              validCredential.email === 'teacher@demo.com' ? 'demo-teacher-id' : 'demo-admin-id',
          email: validCredential.email,
          name: validCredential.name,
          role: validCredential.role,
          emailVerified: true,
          createdAt: new Date('2023-01-01'),
        };

        const token = 'demo-jwt-token-' + validCredential.email;
        localStorage.setItem('shiksha-jwt', token);
        setUser(mockUser);
      }
    } catch (error) {
      throw new Error('Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData) => {
    setIsLoading(true);
    try {
      // TODO: Implement actual API call
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay

      const newUser: User = {
        id: 'user-' + Date.now(),
        email: userData.email,
        name: userData.name,
        role: userData.role,
        emailVerified: false,
        createdAt: new Date(),
      };

      const token = 'mock-jwt-token-' + Date.now();
      localStorage.setItem('shiksha-jwt', token);
      setUser(newUser);
    } catch (error) {
      throw new Error('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithProvider = async (provider: AuthProvider) => {
    setIsLoading(true);
    try {
      // TODO: Implement OAuth flow
      // For now, mock OAuth login
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockUser: User = {
        id: 'user-' + Date.now(),
        email: `user@${provider}.com`,
        name: `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`,
        role: 'STUDENT',
        emailVerified: true,
        createdAt: new Date(),
      };

      const token = 'mock-oauth-jwt-token-' + Date.now();
      localStorage.setItem('shiksha-jwt', token);
      setUser(mockUser);
    } catch (error) {
      throw new Error(`${provider} login failed. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      localStorage.removeItem('shiksha-jwt');
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) return;

    setIsLoading(true);
    try {
      // TODO: Implement profile update API call
      await new Promise(resolve => setTimeout(resolve, 800));

      setUser(prevUser => prevUser ? { ...prevUser, ...updates } : null);
    } catch (error) {
      throw new Error('Profile update failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    loginWithProvider,
    logout,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
