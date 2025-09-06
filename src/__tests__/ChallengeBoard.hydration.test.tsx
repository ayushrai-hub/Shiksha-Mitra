import { render, screen } from '@testing-library/react';
import ChallengeBoard from '../features/ChallengeBoard';

describe('ChallengeBoard hydration', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('loads challenges from localStorage with correct done state', async () => {
    const seed = [
      { id: 1, title: 'Hydrate A', done: true },
      { id: 2, title: 'Hydrate B', done: false },
    ];
    localStorage.setItem('sm_challenges_v1', JSON.stringify(seed));

    render(<ChallengeBoard />);

    const a = await screen.findByText('Hydrate A');
    const b = await screen.findByText('Hydrate B');

    const aLi = a.closest('li')!;
    const bLi = b.closest('li')!;

    const aCheckbox = aLi.querySelector('input[type="checkbox"]') as HTMLInputElement;
    const bCheckbox = bLi.querySelector('input[type="checkbox"]') as HTMLInputElement;

    expect(aCheckbox.checked).toBe(true);
    expect(bCheckbox.checked).toBe(false);

    // class reflects done state
    const aTitle = aLi.querySelector('span');
    const bTitle = bLi.querySelector('span');
    expect(aTitle).toHaveClass('line-through');
    expect(bTitle).not.toHaveClass('line-through');
  });
});
