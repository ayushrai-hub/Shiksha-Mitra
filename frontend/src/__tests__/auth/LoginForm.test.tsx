import { render, screen, waitFor } from '../../tests/utils/render';
import { userEvent } from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LoginForm } from '../../components/auth/LoginForm';
import { AuthProvider } from '../../contexts/AuthContext';
import type { RenderOptions } from '@testing-library/react';

const customRender: any = (ui: React.ReactElement, options?: RenderOptions) => {
  return render(ui, { wrapper: AuthProvider, ...options });
};

const mockLogin = vi.fn();

vi.mock('../../contexts/AuthContext', async () => {
  const actual = await vi.importActual('../../contexts/AuthContext');
  return {
    ...actual,
    useAuth: () => ({
      login: mockLogin,
      isLoading: false,
      user: null,
      isAuthenticated: false,
      register: vi.fn(),
      loginWithProvider: vi.fn(),
      logout: vi.fn(),
      updateProfile: vi.fn(),
    }),
  };
});

describe('LoginForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders login form correctly', () => {
    customRender(<LoginForm />);

    expect(screen.getByRole('heading', { name: /welcome back/i })).toBeInTheDocument();
    expect(screen.getByText(/sign in to your shiksha-mitra account/i)).toBeInTheDocument();

    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('displays OAuth provider buttons', () => {
    customRender(<LoginForm />);

    expect(screen.getByRole('button', { name: /google/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /github/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /linkedin/i })).toBeInTheDocument();
  });

  it('shows validation errors for empty fields', async () => {
    const user = userEvent.setup();
    customRender(<LoginForm />);

    const submitButton = screen.getByRole('button', { name: /sign in/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    });
  });

  it('validates email format', async () => {
    const user = userEvent.setup();
    customRender(<LoginForm />);

    const emailInput = screen.getByLabelText(/email address/i);
    await user.type(emailInput, 'invalid-email');

    const passwordInput = screen.getByLabelText(/password/i);
    await user.type(passwordInput, 'password123');

    const submitButton = screen.getByRole('button', { name: /sign in/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
    });
  });

  it('calls login function with correct data on valid submission', async () => {
    const user = userEvent.setup();
    const onSuccess = vi.fn();

    customRender(<LoginForm onSuccess={onSuccess} />);

    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/password/i);

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'Password123');

    const submitButton = screen.getByRole('button', { name: /sign in/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'Password123');
      expect(onSuccess).toHaveBeenCalled();
    });
  });

  it('displays error message on login failure', async () => {
    const user = userEvent.setup();
    mockLogin.mockRejectedValue(new Error('Invalid credentials'));

    customRender(<LoginForm />);

    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/password/i);

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'Password123');

    const submitButton = screen.getByRole('button', { name: /sign in/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
    });
  });

  it('shows loading state during submission', async () => {
    const user = userEvent.setup();
    mockLogin.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));

    customRender(<LoginForm />);

    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/password/i);

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'Password123');

    const submitButton = screen.getByRole('button', { name: /sign in/i });
    await user.click(submitButton);

    // Check loading state
    expect(screen.getByRole('button', { name: /signing in\.\.\./i })).toBeInTheDocument();
    expect(emailInput).toBeDisabled();
    expect(passwordInput).toBeDisabled();
  });

  it('calls onSwitchToRegister when register link is clicked', async () => {
    const user = userEvent.setup();
    const onSwitchToRegister = vi.fn();

    customRender(<LoginForm onSwitchToRegister={onSwitchToRegister} />);

    const registerLink = screen.getByRole('button', { name: /sign up/i });
    await user.click(registerLink);

    expect(onSwitchToRegister).toHaveBeenCalled();
  });

  it('calls onForgotPassword when forgot password link is clicked', async () => {
    const user = userEvent.setup();
    const onForgotPassword = vi.fn();

    customRender(<LoginForm onForgotPassword={onForgotPassword} />);

    const forgotPasswordLink = screen.getByRole('button', { name: /forgot your password/i });
    await user.click(forgotPasswordLink);

    expect(onForgotPassword).toHaveBeenCalled();
  });

  it('is accessible with proper form labels', () => {
    customRender(<LoginForm />);

    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/password/i);

    expect(emailInput).toHaveAttribute('type', 'email');
    expect(passwordInput).toHaveAttribute('type', 'password');

    // Check ARIA accessibility
    expect(emailInput).toHaveAttribute('id', 'email');
    expect(passwordInput).toHaveAttribute('id', 'password');
  });

  it('maintains form state after submission errors', async () => {
    const user = userEvent.setup();
    mockLogin.mockRejectedValue(new Error('Network error'));

    customRender(<LoginForm />);

    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/password/i);

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'Password123');

    const submitButton = screen.getByRole('button', { name: /sign in/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/network error/i)).toBeInTheDocument();
    });

    // Form state should be preserved
    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('Password123');
  });
});
