import React, { ReactElement, ReactNode } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Custom render function with providers
function customRender(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
): ReturnType<typeof render> {
  // Add providers here as needed (e.g., ThemeProvider, QueryClient)
  const AllTheProviders = ({ children }: { children: ReactNode }) => {
    return (
      <>
        {children}
      </>
    );
  };

  return render(ui, { wrapper: AllTheProviders, ...options });
}

// Export everything
export * from '@testing-library/react';

// Override render method
export { customRender as render };

// Add userEvent export
export { userEvent };

// Utility for creating user event setup
export const setupUserEvents = () => ({
  user: userEvent.setup(),
});

// Common test data factories can be added here
export const createMockUser = (overrides = {}) => ({
  id: 'user-1',
  name: 'John Doe',
  email: 'john@example.com',
  role: 'student',
  ...overrides,
});

// Additional test helpers can be added here as needed
