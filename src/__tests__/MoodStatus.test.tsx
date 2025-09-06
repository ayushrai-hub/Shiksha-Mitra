import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MoodStatus from '../features/MoodStatus';

describe('MoodStatus', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('selects a mood, updates note, and persists to localStorage', async () => {
    const user = userEvent.setup();
    render(<MoodStatus />);

    const targetMood = '💪';
    const moodBtn = screen.getByRole('button', { name: `Select mood ${targetMood}` });
    await user.click(moodBtn);

    const noteInput = screen.getByPlaceholderText('Optional note');
    await user.type(noteInput, 'Feeling strong');

    // UI reflects current selection and note
    const currentSection = screen.getByText(/Current:/i).closest('div') as HTMLElement;
    expect(currentSection).toBeInTheDocument();
    expect(within(currentSection).getByText(targetMood)).toBeInTheDocument();
    expect(screen.getByText(/Feeling strong/)).toBeInTheDocument();

    // localStorage has the saved state
    const raw = localStorage.getItem('sm_mood_v1');
    expect(raw).toBeTruthy();
    const parsed = JSON.parse(raw!);
    expect(parsed).toEqual({ mood: targetMood, note: 'Feeling strong' });
  });
});
