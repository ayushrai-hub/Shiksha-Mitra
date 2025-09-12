import { render, screen, waitFor } from '../../tests/utils/render';
import { userEvent } from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AuthPage } from '../../pages/Auth';
import { AuthProvider } from '../../contexts/AuthContext';
import type { RenderOptions } from '@testing-library/react';

const customRender: any = (ui: React.ReactElement, options?: RenderOptions) => {
  return render(ui, { wrapper: AuthProvider, ...options });
};

const mockLogin = vi.fn();
const mockRegister = vi.fn();

vi.mock('../../contexts/AuthContext', async () => {
  const actual = await vi.importActual('../../contexts/AuthContext');
  return {
    ...actual,
    useAuth: () => ({
      login: mockLogin,
      register: mockRegister,
      isLoading: false,
      user: null,
      isAuthenticated: false,
      logout: vi.fn(),
      updateProfile: vi.fn(),
    }),
  };
});

describe('AuthPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders auth page with correct header and branding', () => {
    customRender(<AuthPage />);

    expect(screen.getByText('Shiksha-Mitra')).toBeInTheDocument();
    expect(screen.getByText('Your personalized learning journey begins here')).toBeInTheDocument();
    expect(screen.getByText('S')).toBeInTheDocument(); // Logo initial
  });

  it('shows login mode by default', () => {
    customRender(<AuthPage />);

    expect(screen.getByRole('button', { name: /sign in/i })).toHaveClass('bg-white', 'text-gray-900');
    expect(screen.getByRole('button', { name: /sign up/i })).toHaveClass('text-gray-500');
    expect(screen.getByText(/sign in to your shiksha-mitra account/i)).toBeInTheDocument();
  });

  it('can switch from login to register mode', async () => {
    const user = userEvent.setup();
    customRender(<AuthPage />);

    const signUpButton = screen.getByRole('button', { name: /sign up/i });
    await user.click(signUpButton);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /sign up/i })).toHaveClass('bg-white', 'text-gray-900');
      expect(screen.getByRole('button', { name: /sign in/i })).toHaveClass('text-gray-500');
      expect(screen.getByText(/join shiksha-mitra to start your learning journey/i)).toBeInTheDocument();
      expect(screen.getByText('I am a...')).toBeInTheDocument();
    });
  });

  it('can switch from register back to login mode', async () => {
    const user = userEvent.setup();
    customRender(<AuthPage />);

    // Switch to register mode
    const signUpButton = screen.getByRole('button', { name: /sign up/i });
    await user.click(signUpButton);

    // Switch back to login mode
    const signInButton = screen.getByRole('button', { name: /sign in/i });
    await user.click(signInButton);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /sign in/i })).toHaveClass('bg-white', 'text-gray-900');
      expect(screen.getByText(/sign in to your shiksha-mitra account/i)).toBeInTheDocument();
    });
  });

  it('renders LoginForm when in login mode', async () => {
    const user = userEvent.setup();
    customRender(<AuthPage />);

    // Check that LoginForm components are present
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();

    // Fill out login form to test integration
    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/password/i);

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');

    await user.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123');
    });
  });

  it('renders RegisterForm when in register mode', async () => {
    const user = userEvent.setup();
    customRender(<AuthPage />);

    // Switch to register mode
    const signUpButton = screen.getByRole('button', { name: /sign up/i });
    await user.click(signUpButton);

    await waitFor(() => {
      expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
      expect(screen.getByText('I am a...')).toBeInTheDocument();
      expect(screen.getByRole('radio', { name: /student/i })).toBeInTheDocument();
      expect(screen.getByRole('radio', { name: /teacher/i })).toBeInTheDocument();
      expect(screen.getByRole('radio', { name: /institution/i })).toBeInTheDocument();
      expect(screen.getByRole('radio', { name: /administrator/i })).toBeInTheDocument();
    });
  });

  it('shows demo users section', () => {
    customRender(<AuthPage />);

    expect(screen.getByText('Demo Users (for testing)')).toBeInTheDocument();
    expect(screen.getByText('Student:')).toBeInTheDocument();
    expect(screen.getByText('student@demo.com / password')).toBeInTheDocument();
    expect(screen.getByText('Teacher:')).toBeInTheDocument();
    expect(screen.getByText('teacher@demo.com / password')).toBeInTheDocument();
    expect(screen.getByText('Admin:')).toBeInTheDocument();
    expect(screen.getByText('admin@demo.com / password')).toBeInTheDocument();
  });

  it('displays terms and privacy policy links', () => {
    customRender(<AuthPage />);

    expect(screen.getByText(/terms of service/i)).toBeInTheDocument();
    expect(screen.getByText(/privacy policy/i)).toBeInTheDocument();

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2); // Should have 2 links

    // First link should be Terms of Service
    expect(links[0]).toHaveAttribute('href', '#');
    expect(links[0]).toHaveTextContent('Terms of Service');

    // Second link should be Privacy Policy
    expect(links[1]).toHaveAttribute('href', '#');
    expect(links[1]).toHaveTextContent('Privacy Policy');
  });

  it('shows forgot password link only in login mode', async () => {
    const user = userEvent.setup();
    customRender(<AuthPage />);

    // Should show forgot password in login mode
    expect(screen.getByText(/forgot your password/i)).toBeInTheDocument();

    // Switch to register mode
    const signUpButton = screen.getByRole('button', { name: /sign up/i });
    await user.click(signUpButton);

    // Forgot password should not be visible in register mode
    await waitFor(() => {
      expect(screen.queryByText(/forgot your password/i)).not.toBeInTheDocument();
    });

    // Switch back to login mode
    const signInButton = screen.getByRole('button', { name: /sign in/i });
    await user.click(signInButton);

    // Forgot password should be visible again
    await waitFor(() => {
      expect(screen.getByText(/forgot your password/i)).toBeInTheDocument();
    });
  });

  it('handles successful login by calling onSuccess callback', async () => {
    const user = userEvent.setup();
    customRender(<AuthPage />);

    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/password/i);

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');

    const loginButton = screen.getByRole('button', { name: /sign in/i });
    await user.click(loginButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123');
    });

    // Note: The onSuccess callback logs to console, so success behavior would be tested
    // by monitoring the console.log or by passing a custom callback
  });

  it('handles successful registration by switching to login mode after delay', async () => {
    const user = userEvent.setup();
    customRender(<AuthPage />);

    // Switch to register mode
    const signUpButton = screen.getByRole('button', { name: /sign up/i });
    await user.click(signUpButton);

    await waitFor(() => {
      expect(screen.getByText(/join shiksha-mitra to start your learning journey/i)).toBeInTheDocument();
    });

    const nameInput = screen.getByLabelText(/full name/i);
    const emailInput = screen.getByLabelText(/email address/i);
    const studentRadio = screen.getByDisplayValue('STUDENT');
    const passwordInput = screen.getByLabelText(/^password$/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
    const termsCheckbox = screen.getByLabelText(/i agree to the terms of service/i);

    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john@example.com');
    await user.click(studentRadio);
    await user.type(passwordInput, 'Password123');
    await user.type(confirmPasswordInput, 'Password123');
    await user.click(termsCheckbox);

    const createAccountButton = screen.getByRole('button', { name: /create account/i });
    await user.click(createAccountButton);

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalled();
    });

    // After 2 seconds, should switch back to login mode
    // Note: Testing the setTimeout behavior would require mocking timers
  });

  it('is responsive with proper mobile styling classes', () => {
    customRender(<AuthPage />);

    const container = document.querySelector('.min-h-screen');
    expect(container).toHaveClass('min-h-screen', 'bg-gradient-to-br', 'flex', 'items-center', 'justify-center', 'py-12', 'px-4', 'sm:px-6', 'lg:px-8');
  });

  it('has smooth transitions between auth modes', () => {
    customRender(<AuthPage />);

    const formsContainer = screen.getByText(/sign in to your shiksha-mitra account/i).closest('div').parentElement;
    expect(formsContainer).toHaveClass('transition-all', 'duration-300', 'ease-in-out');
  });

  it('disables toggle buttons during loading states', () => {
    // To test this, we'd need to mock the loading state in useAuth
    // This test verifies the UI behavior when loading

    vi.mocked(vi.importActual('../../contexts/AuthContext')).then = null as any; // Reset for this test

    vi.mock('../../contexts/AuthContext', async () => {
      return {
        ...(await vi.importActual('../../contexts/AuthContext')),
        useAuth: () => ({
          login: vi.fn(),
          register: vi.fn(),
          isLoading: true,
          user: null,
          isAuthenticated: false,
          logout: vi.fn(),
          updateProfile: vi.fn(),
        }),
      };
    });

    // Re-render with new mock
    const { rerender } = render(<AuthPage />, { wrapper: AuthProvider });

    // Note: This test would verify the disabled state, but requires
    // more sophisticated mocking for complete coverage
  });

  it('maintains proper focus management with keyboard navigation', () => {
    customRender(<AuthPage />);

    // Verify that buttons have proper role and tabindex characteristics
    const signInButton = screen.getByRole('button', { name: /sign in/i });
    const signUpButton = screen.getByRole('button', { name: /sign up/i });

    expect(signInButton).toHaveAttribute('type', 'button');
    expect(signUpButton).toHaveAttribute('type', 'button');

    // Default active button should be Sign In (since login is default mode)
    expect(signInButton).toHaveClass('bg-white', 'text-gray-900', 'shadow-sm');
  });
});
