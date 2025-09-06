import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GoalTracker from '../features/GoalTracker';

describe('GoalTracker', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('adds a goal, increments progress, and persists', async () => {
    const user = userEvent.setup();
    render(<GoalTracker />);

    const titleInput = screen.getByPlaceholderText('Goal title');
    const targetInput = screen.getByPlaceholderText('Target (e.g., 4 days/week)');
    const addBtn = screen.getByRole('button', { name: /add goal/i });

    await user.type(titleInput, 'Read Books');
    await user.type(targetInput, '5 days/week');
    await user.click(addBtn);

    const item = await screen.findByText(/Read Books/i);
    expect(item).toBeInTheDocument();

    // Progress should start at 0
    const card = item.parentElement!.parentElement! as HTMLElement; // card container
    const progress = within(card).getByText(/Progress:/i);
    expect(progress).toHaveTextContent('Progress: 0');

    // Increment via Check-in button
    const checkinBtn = within(card).getByRole('button', { name: /check/i });
    await user.click(checkinBtn);
    expect(within(card).getByText(/Progress:/i)).toHaveTextContent('Progress: 1');

    // Persistence
    const raw = localStorage.getItem('sm_goals_v1');
    expect(raw).toBeTruthy();
    const parsed = JSON.parse(raw!);
    expect(parsed[0].title).toBe('Read Books');
    expect(parsed[0].progress).toBe(1);
  });
});
