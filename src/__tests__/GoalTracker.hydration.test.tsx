import { render, screen, within } from '@testing-library/react';
import GoalTracker from '../features/GoalTracker';

describe('GoalTracker hydration', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('loads goals from localStorage and shows correct progress', async () => {
    const seed = [
      { id: 9, title: 'Hydrate Read', target: '3 days/week', progress: 2 },
    ];
    localStorage.setItem('sm_goals_v1', JSON.stringify(seed));

    render(<GoalTracker />);

    const title = await screen.findByText('Hydrate Read');
    expect(title).toBeInTheDocument();
    const card = title.parentElement!.parentElement! as HTMLElement;
    expect(within(card).getByText(/Progress:/i)).toHaveTextContent('Progress: 2');
  });
});
