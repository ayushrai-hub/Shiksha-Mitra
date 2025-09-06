import { render, screen, within } from '@testing-library/react';
import MoodStatus from '../features/MoodStatus';

describe('MoodStatus hydration', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('loads mood and note from localStorage on mount', async () => {
    localStorage.setItem('sm_mood_v1', JSON.stringify({ mood: '💪', note: 'Feeling strong' }));

    render(<MoodStatus />);

    const current = screen.getByText(/Current:/i).closest('div')!;
    expect(within(current).getByText('💪')).toBeInTheDocument();
    expect(within(current).getByText(/Feeling strong/)).toBeInTheDocument();

    // Buttons reflect selected state via aria-pressed
    const selectedBtn = screen.getByRole('button', { name: /select mood 💪/i });
    expect(selectedBtn).toHaveAttribute('aria-pressed', 'true');
  });
});
