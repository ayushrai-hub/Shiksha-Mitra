import { render, screen } from '@testing-library/react';
import App from '../App';
import { MemoryRouter } from 'react-router-dom';

describe('App shell and routes', () => {
  it('renders the landing sections on root route', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    // Section headings from landing page
    expect(screen.getByRole('heading', { name: /understanding shiksha-mitra/i, level: 2 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /why shiksha-mitra works/i, level: 2 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /how to start your journey/i, level: 2 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /activities you can do together/i, level: 2 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /built-in tools for mitras/i, level: 2 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /mvp feature showcase/i, level: 2 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /consistency & compassion/i, level: 2 })).toBeInTheDocument();
  });

  it('renders dashboard page on /dashboard', () => {
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: /your dashboard/i, level: 1 })).toBeInTheDocument();
  });

  it('renders find mitra page on /find-mitra', () => {
    render(
      <MemoryRouter initialEntries={['/find-mitra']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: /find your mitra/i, level: 1 })).toBeInTheDocument();
  });

  it('renders 404 not found for unknown routes', () => {
    render(
      <MemoryRouter initialEntries={['/unknown-route']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/page not found/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /go home/i })).toBeInTheDocument();
  });
});
