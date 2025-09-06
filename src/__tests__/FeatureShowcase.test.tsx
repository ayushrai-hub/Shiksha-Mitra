import { render, screen } from '@testing-library/react';
import FeatureShowcase from '../features/FeatureShowcase';

describe('FeatureShowcase', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders the feature showcase heading and all feature cards', () => {
    render(<FeatureShowcase />);

    // Section heading
    expect(
      screen.getByRole('heading', { name: /mvp feature showcase/i, level: 2 })
    ).toBeInTheDocument();

    // Fallback: directly assert on headings we know exist
    expect(screen.getByRole('heading', { name: /shared to.?do/i, level: 3 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /daily journal/i, level: 3 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /goal tracker/i, level: 3 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /mood status/i, level: 3 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /restart together/i, level: 3 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /mitra challenge board/i, level: 3 })).toBeInTheDocument();

    // Sanity: At least 6 feature cards present
    const headings = screen.getAllByRole('heading', { level: 3 });
    expect(headings.length).toBeGreaterThanOrEqual(6);
  });
});
