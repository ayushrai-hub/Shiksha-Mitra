import { render, screen } from '@testing-library/react';
import Dashboard from '../pages/Dashboard';

describe('Dashboard page', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders page heading and feature widgets', () => {
    render(<Dashboard />);
    expect(screen.getByRole('heading', { name: /your dashboard/i, level: 1 })).toBeInTheDocument();

    // Feature cards
    expect(screen.getByRole('heading', { name: /shared to.?do/i, level: 3 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /daily journal/i, level: 3 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /goal tracker/i, level: 3 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /mood status/i, level: 3 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /restart together/i, level: 3 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /mitra challenge board/i, level: 3 })).toBeInTheDocument();
  });
});
