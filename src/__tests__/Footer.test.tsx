import { render, screen } from '@testing-library/react';
import Footer from '../components/Footer';

describe('Footer', () => {
  it('renders brand, platform links, support links, and social icons with labels', () => {
    render(<Footer />);

    expect(screen.getByRole('heading', { name: /shiksha-mitra/i, level: 3 })).toBeInTheDocument();

    // Social buttons have aria-labels
    expect(screen.getByLabelText(/contact via email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/follow on twitter/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/follow on instagram/i)).toBeInTheDocument();

    // Platform quick links
    expect(screen.getByRole('link', { name: /the concept/i })).toHaveAttribute('href', '#concept');
    expect(screen.getByRole('link', { name: /how it works/i })).toHaveAttribute('href', '#how-it-works');
    expect(screen.getByRole('link', { name: /built-in tools/i })).toHaveAttribute('href', '#tools');
    expect(screen.getByRole('link', { name: /find your mitra/i })).toHaveAttribute('href', '/find-mitra');

    // Legal links at bottom
    expect(screen.getByRole('link', { name: /terms of service/i })).toBeInTheDocument();
    const privacyLinks = screen.getAllByRole('link', { name: /privacy policy/i });
    expect(privacyLinks.length).toBeGreaterThanOrEqual(1);
    expect(screen.getByRole('link', { name: /cookie policy/i })).toBeInTheDocument();
  });
});
