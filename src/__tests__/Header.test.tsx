import { render, screen } from '@testing-library/react';
import Header from '../components/Header';
import { MemoryRouter } from 'react-router-dom';

describe('Header', () => {
  it('renders brand and nav links with accessible names', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /shiksha-mitra/i, level: 1 })).toBeInTheDocument();

    // Static anchor links
    expect(screen.getByRole('link', { name: /concept/i })).toHaveAttribute('href', '#concept');
    expect(screen.getByRole('link', { name: /how it works/i })).toHaveAttribute('href', '#how-it-works');
    expect(screen.getByRole('link', { name: /features/i })).toHaveAttribute('href', '#features');
    expect(screen.getByRole('link', { name: /tools/i })).toHaveAttribute('href', '#tools');

    // NavLink routed links
    expect(screen.getByRole('link', { name: /dashboard/i })).toHaveAttribute('href', '/dashboard');
    expect(screen.getByRole('link', { name: /find your mitra/i })).toHaveAttribute('href', '/find-mitra');
  });
});
