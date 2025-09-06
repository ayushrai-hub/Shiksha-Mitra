import { render, screen, fireEvent } from '@testing-library/react';
import FindMitra from '../pages/FindMitra';

describe('FindMitra page', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders heading, helper text and form fields', () => {
    render(<FindMitra />);
    expect(screen.getByRole('heading', { name: /find your mitra/i, level: 1 })).toBeInTheDocument();
    expect(screen.getByText(/tell us a bit about you/i)).toBeInTheDocument();

    expect(screen.getByPlaceholderText(/your name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/you@example.com/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/e\.g\., build a reading habit, improve fitness, learn a skill/i)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/e\.g\., similar timezone, weekly call, accountability-focused/i)
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('submits form and shows success message, persists to localStorage', () => {
    render(<FindMitra />);

    fireEvent.change(screen.getByPlaceholderText(/your name/i), { target: { value: 'Alice' } });
    fireEvent.change(screen.getByPlaceholderText(/you@example.com/i), { target: { value: 'alice@example.com' } });
    fireEvent.change(
      screen.getByPlaceholderText(/e\.g\., build a reading habit, improve fitness, learn a skill/i),
      { target: { value: 'Read and exercise' } }
    );
    fireEvent.change(
      screen.getByPlaceholderText(/e\.g\., similar timezone, weekly call, accountability-focused/i),
      { target: { value: 'Evening check-ins' } }
    );

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(
      screen.getByText(/your interest is recorded/i)
    ).toBeInTheDocument();

    const raw = localStorage.getItem('sm_find_mitra_forms_v1');
    expect(raw).toBeTruthy();
    const parsed = JSON.parse(raw!);
    expect(Array.isArray(parsed)).toBe(true);
    expect(parsed[0]).toMatchObject({
      name: 'Alice',
      email: 'alice@example.com',
    });
  });
});
