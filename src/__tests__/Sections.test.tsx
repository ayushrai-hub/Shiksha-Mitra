import { render, screen } from '@testing-library/react';
import Hero from '../components/Hero';
import ConceptOverview from '../components/ConceptOverview';
import Benefits from '../components/Benefits';
import HowItWorks from '../components/HowItWorks';
import Activities from '../components/Activities';
import Tools from '../components/Tools';
import Compassion from '../components/Compassion';
import FindMitraSection from '../components/FindMitra';

// Smoke tests for section components: verify key headings are present

describe('Section components', () => {
  it('Hero renders main title and CTAs', () => {
    render(<Hero />);
    expect(screen.getByRole('heading', { name: /your growth companion/i, level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /find your shiksha-mitra/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /learn the concept/i })).toBeInTheDocument();
  });

  it('ConceptOverview renders section heading and promise heading', () => {
    render(<ConceptOverview />);
    expect(screen.getByRole('heading', { name: /understanding shiksha-mitra/i, level: 2 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /the shiksha-mitra promise/i, level: 3 })).toBeInTheDocument();
  });

  it('Benefits renders main and sub section headings', () => {
    render(<Benefits />);
    expect(screen.getByRole('heading', { name: /why shiksha-mitra works/i, level: 2 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /the benefits/i, level: 3 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /honest challenges/i, level: 3 })).toBeInTheDocument();
  });

  it('HowItWorks renders steps heading', () => {
    render(<HowItWorks />);
    expect(screen.getByRole('heading', { name: /how to start your journey/i, level: 2 })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /start your journey today/i })).toBeInTheDocument();
  });

  it('Activities renders list heading and highlight card', () => {
    render(<Activities />);
    expect(screen.getByRole('heading', { name: /activities you can do together/i, level: 2 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /meditation & mindfulness habits/i, level: 3 })).toBeInTheDocument();
  });

  it('Tools renders tools heading and coming soon header', () => {
    render(<Tools />);
    expect(screen.getByRole('heading', { name: /built-in tools for mitras/i, level: 2 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /coming soon: advanced features/i, level: 3 })).toBeInTheDocument();
  });

  it('Compassion renders main heading and process heading', () => {
    render(<Compassion />);
    expect(screen.getByRole('heading', { name: /consistency & compassion/i, level: 2 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /the gentle return process/i, level: 3 })).toBeInTheDocument();
  });

  it('FindMitra section renders heading and criteria heading', () => {
    render(<FindMitraSection />);
    expect(screen.getByRole('heading', { name: /how to find your shiksha-mitra/i, level: 2 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /matching criteria/i, level: 3 })).toBeInTheDocument();
  });
});
