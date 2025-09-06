import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ChallengeBoard from '../features/ChallengeBoard';

describe('ChallengeBoard', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('toggles a challenge and persists state', async () => {
    const user = userEvent.setup();
    render(<ChallengeBoard />);

    // Default seed has "Read 20 pages" unchecked
    const itemText = await screen.findByText('Read 20 pages');
    const listItem = itemText.closest('li')!;
    const checkbox = listItem.querySelector('input[type="checkbox"]') as HTMLInputElement;

    expect(checkbox.checked).toBe(false);

    // Toggle to done
    await user.click(checkbox);
    expect(checkbox.checked).toBe(true);

    // Visual line-through class applied to the title span
    const titleSpan = listItem.querySelector('span');
    expect(titleSpan).toHaveClass('line-through');

    // Persistence
    const raw = localStorage.getItem('sm_challenges_v1');
    expect(raw).toBeTruthy();
    const parsed = JSON.parse(raw!);
    const updated = parsed.find((c: any) => c.title === 'Read 20 pages');
    expect(updated?.done).toBe(true);
  });
});
