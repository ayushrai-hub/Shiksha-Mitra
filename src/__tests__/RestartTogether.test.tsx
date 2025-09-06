import { render, screen, fireEvent } from '@testing-library/react';
import RestartTogether from '../features/RestartTogether';
import { vi } from 'vitest';

describe('RestartTogether', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders heading, copy and button', () => {
    render(<RestartTogether />);
    expect(screen.getByRole('heading', { name: /restart together/i, level: 3 })).toBeInTheDocument();
    expect(
      screen.getByText(/if you fell off, that's okay\./i)
    ).toBeInTheDocument();
    const btn = screen.getByRole('button', { name: /restart now/i });
    expect(btn).toBeInTheDocument();
  });

  it('invokes alert on click', () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
    render(<RestartTogether />);
    fireEvent.click(screen.getByRole('button', { name: /restart now/i }));
    expect(alertSpy).toHaveBeenCalledWith(
      expect.stringMatching(/restarted together/i)
    );
  });
});
