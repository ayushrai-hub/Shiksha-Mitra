import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Journal from '../features/Journal';

describe('Journal', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('adds private and shared entries, shows newest first, and persists', async () => {
    const user = userEvent.setup();
    render(<Journal />);

    const textarea = screen.getByPlaceholderText('Write your reflection...');

    // Add a private entry
    await user.type(textarea, 'Private note');
    await user.click(screen.getByRole('button', { name: /save private/i }));
    const firstPrivate = await screen.findByText('Private note');
    expect(firstPrivate).toBeInTheDocument();
    // Private entry should not show shared marker
    const privateItem = firstPrivate.closest('div')!;
    expect(within(privateItem).queryByText(/shared/i)).not.toBeInTheDocument();

    // Add a shared entry; it should appear before the previous one (newest first)
    await user.type(textarea, 'Shared note');
    await user.click(screen.getByRole('button', { name: /share excerpt/i }));
    const shared = await screen.findByText('Shared note');
    expect(shared).toBeInTheDocument();

    // Entries container
    const list = shared.closest('.bg-gray-50')!.parentElement!; // container of entry items
    // Ensure order by checking first entry contains 'Shared note'
    const allTextBlocks = within(list).getAllByText(/(Private note|Shared note)/);
    expect(allTextBlocks[0]).toHaveTextContent('Shared note');

    // Shared marker visible for shared entry
    const sharedWrapper = shared.closest('div')!;
    expect(within(sharedWrapper).getByText(/shared/i)).toBeInTheDocument();

    // Persistence
    const raw = localStorage.getItem('sm_journal_v1');
    expect(raw).toBeTruthy();
    const parsed = JSON.parse(raw!);
    expect(Array.isArray(parsed)).toBe(true);
    expect(parsed[0].text).toBe('Shared note');
    expect(parsed[0].shared).toBe(true);
  });
});
