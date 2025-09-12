import { render, screen, waitFor } from '../../tests/utils/render';
import { userEvent } from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { RegisterForm } from '../../components/auth/RegisterForm';
import { AuthProvider } from '../../contexts/AuthContext';
import type { RenderOptions } from '@testing-library/react';

const customRender: any = (ui: React.ReactElement, options?: RenderOptions) => {
  return render(ui, { wrapper: AuthProvider, ...options });
};

const mockRegister = vi.fn();

vi.mock('../../contexts/AuthContext', async () => {
  const actual = await vi.importActual('../../contexts/AuthContext');
  return {
    ...actual,
    useAuth: () => ({
      register: mockRegister,
      isLoading: false,
      user: null,
      isAuthenticated: false,
      login: vi.fn(),
      loginWithProvider: vi.fn(),
      logout: vi.fn(),
      updateProfile: vi.fn(),
    }),
  };
});

describe('RegisterForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders register form correctly', () => {
    customRender(<RegisterForm />);

    expect(screen.getByRole('heading', { name: /create your account/i })).toBeInTheDocument();
    expect(screen.getByText(/join shiksha-mitra to start your learning journey/i)).toBeInTheDocument();

    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument();
    expect(screen.getByText('I am a...')).toBeInTheDocument();
  });

  it('displays OAuth provider buttons', () => {
    customRender(<RegisterForm />);

    expect(screen.getByRole('button', { name: /google/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /github/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /linkedin/i })).toBeInTheDocument();
  });

  it('shows validation errors for empty required fields', async () => {
    const user = userEvent.setup();
    customRender(<RegisterForm />);

    const submitButton = screen.getByRole('button', { name: /create account/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Full name is required')).toBeInTheDocument();
      expect(screen.getByText('Email is required')).toBeInTheDocument();
      expect(screen.getByText('Please select a valid role')).toBeInTheDocument();
      expect(screen.getByText('Password is required')).toBeInTheDocument();
      expect(screen.getByText('Please confirm your password')).toBeInTheDocument();
      expect(screen.getByText("You must accept the terms and conditions")).toBeInTheDocument();
    });
  });

  it('validates name format', async () => {
    const user = userEvent.setup();
    customRender(<RegisterForm />);

    const nameInput = screen.getByLabelText(/full name/i);
    await user.type(nameInput, 'John123');
    await user.click(screen.getByRole('button', { name: /create account/i }));

    await waitFor(() => {
      expect(screen.getByText('Name can only contain letters and spaces')).toBeInTheDocument();
    });
  });

  it('validates email format', async () => {
    const user = userEvent.setup();
    customRender(<RegisterForm />);

    const emailInput = screen.getByLabelText(/email address/i);
    await user.type(emailInput, 'invalid-email');
    await user.click(screen.getByRole('button', { name: /create account/i }));

    await waitFor(() => {
      expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
    });
  });

  it('validates password requirements', async () => {
    const user = userEvent.setup();
    customRender(<RegisterForm />);

    const passwordInput = screen.getByLabelText(/^password$/i);
    await user.type(passwordInput, 'weak');
    await user.click(screen.getByRole('button', { name: /create account/i }));

    await waitFor(() => {
      expect(screen.getByText('Password must be at least 8 characters')).toBeInTheDocument();
    });
  });

  it('validates password complexity', async () => {
    const user = userEvent.setup();
    customRender(<RegisterForm />);

    const passwordInput = screen.getByLabelText(/^password$/i);
    await user.type(passwordInput, 'weakpass');
    await user.click(screen.getByRole('button', { name: /create account/i }));

    await waitFor(() => {
      expect(screen.getByText(/^Password must contain at least one lowercase letter, one uppercase letter, and one number$/)).toBeInTheDocument();
    });
  });

  it('validates password confirmation match', async () => {
    const user = userEvent.setup();
    customRender(<RegisterForm />);

    const passwordInput = screen.getByLabelText(/^password$/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);

    await user.type(passwordInput, 'Password123');
    await user.type(confirmPasswordInput, 'Different123');
    await user.click(screen.getByRole('button', { name: /create account/i }));

    await waitFor(() => {
      expect(screen.getByText(/^Passwords don't match$/)).toBeInTheDocument();
    });
  });

  it('requires terms acceptance', async () => {
    const user = userEvent.setup();
    customRender(<RegisterForm />);

    const termsCheckbox = screen.getByLabelText(/i agree to the terms of service/i);
    expect(termsCheckbox).not.toBeChecked();

    await user.click(screen.getByRole('button', { name: /create account/i }));

    await waitFor(() => {
      expect(screen.getByText("You must accept the terms and conditions")).toBeInTheDocument();
    });
  });

  it('calls register function with correct data on valid submission', async () => {
    const user = userEvent.setup();
    const onSuccess = vi.fn();

    customRender(<RegisterForm onSuccess={onSuccess} />);

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

    const submitButton = screen.getByRole('button', { name: /create account/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith({
        email: 'john@example.com',
        password: 'Password123',
        name: 'John Doe',
        role: 'STUDENT',
      });
      expect(onSuccess).toHaveBeenCalled();
    });
  });

  it('displays error message on registration failure', async () => {
    const user = userEvent.setup();
    mockRegister.mockRejectedValue(new Error('User already exists'));

    customRender(<RegisterForm />);

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

    const submitButton = screen.getByRole('button', { name: /create account/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/user already exists/i)).toBeInTheDocument();
    });
  });

  it('shows loading state during submission', async () => {
    const user = userEvent.setup();
    mockRegister.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));

    customRender(<RegisterForm />);

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

    const submitButton = screen.getByRole('button', { name: /create account/i });
    await user.click(submitButton);

    expect(screen.getByRole('button', { name: /creating account.../i })).toBeInTheDocument();
    expect(nameInput).toBeDisabled();
    expect(emailInput).toBeDisabled();
    expect(passwordInput).toBeDisabled();
    expect(confirmPasswordInput).toBeDisabled();
    expect(termsCheckbox).toBeDisabled();
  });

  it('calls onSwitchToLogin when login link is clicked', async () => {
    const user = userEvent.setup();
    const onSwitchToLogin = vi.fn();

    customRender(<RegisterForm onSwitchToLogin={onSwitchToLogin} />);

    const loginLink = screen.getByRole('button', { name: /sign in/i });
    await user.click(loginLink);

    expect(onSwitchToLogin).toHaveBeenCalled();
  });

  it('validates role selection', async () => {
    const user = userEvent.setup();
    customRender(<RegisterForm />);

    // Fill other required fields but not role
    const nameInput = screen.getByLabelText(/full name/i);
    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/^password$/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
    const termsCheckbox = screen.getByLabelText(/i agree to the terms of service/i);

    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john@example.com');
    await user.type(passwordInput, 'Password123');
    await user.type(confirmPasswordInput, 'Password123');
    await user.click(termsCheckbox);

    const submitButton = screen.getByRole('button', { name: /create account/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Please select a valid role')).toBeInTheDocument();
    });
  });

  it('is accessible with proper form labels and roles', () => {
    customRender(<RegisterForm />);

    const nameInput = screen.getByLabelText(/full name/i);
    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/^password$/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
    const termsCheckbox = screen.getByLabelText(/i agree to the terms of service/i);

    expect(nameInput).toHaveAttribute('type', 'text');
    expect(emailInput).toHaveAttribute('type', 'email');
    expect(passwordInput).toHaveAttribute('type', 'password');
    expect(confirmPasswordInput).toHaveAttribute('type', 'password');
    expect(termsCheckbox).toHaveAttribute('type', 'checkbox');

    // Check fieldset and legend accessibility
    const fieldset = screen.getByRole('group', { name: /i am a\.\.\./i });
    expect(fieldset).toBeInTheDocument();

    // Check radio buttons
    const radioButtons = screen.getAllByRole('radio');
    expect(radioButtons).toHaveLength(4);

    // Check IDs for label association
    expect(nameInput).toHaveAttribute('id', 'name');
    expect(emailInput).toHaveAttribute('id', 'email');
    expect(passwordInput).toHaveAttribute('id', 'password');
    expect(confirmPasswordInput).toHaveAttribute('id', 'confirmPassword');
    expect(termsCheckbox).toHaveAttribute('id', 'termsAccepted');
  });

  it('maintains form state after submission errors', async () => {
    const user = userEvent.setup();
    mockRegister.mockRejectedValue(new Error('Email already in use'));

    customRender(<RegisterForm />);

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

    const submitButton = screen.getByRole('button', { name: /create account/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/email already in use/i)).toBeInTheDocument();
    });

    // Form state should be preserved
    expect(nameInput).toHaveValue('John Doe');
    expect(emailInput).toHaveValue('john@example.com');
    expect(passwordInput).toHaveValue('Password123');
    expect(confirmPasswordInput).toHaveValue('Password123');
    expect(studentRadio).toBeChecked();
    expect(termsCheckbox).toBeChecked();
  });

  it('handles multiple role types correctly', async () => {
    const user = userEvent.setup();
    customRender(<RegisterForm />);

    const teacherRadio = screen.getByDisplayValue('TEACHER');
    const institutionRadio = screen.getByDisplayValue('INSTITUTION');
    const adminRadio = screen.getByDisplayValue('ADMIN');

    await user.click(teacherRadio);
    expect(teacherRadio).toBeChecked();

    await user.click(institutionRadio);
    expect(institutionRadio).toBeChecked();
    expect(teacherRadio).not.toBeChecked();

    await user.click(adminRadio);
    expect(adminRadio).toBeChecked();
    expect(institutionRadio).not.toBeChecked();
  });
});
