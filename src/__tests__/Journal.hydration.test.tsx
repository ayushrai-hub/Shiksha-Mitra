import { render, screen, within } from '@testing-library/react';
import Journal from '../features/Journal';

describe('Journal hydration', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('loads entries from localStorage and shows newest first with shared marker', async () => {
    // Component renders entries as-is; newest should be first in storage
    const seed = [
      { id: 2, date: '2025-01-02', text: 'New shared entry', shared: true },
      { id: 1, date: '2025-01-01', text: 'Old entry', shared: false },
    ];
    localStorage.setItem('sm_journal_v1', JSON.stringify(seed));

    render(<Journal />);

    const newEntry = await screen.findByText('New shared entry');
    const oldEntry = await screen.findByText('Old entry');
    expect(newEntry).toBeInTheDocument();
    expect(oldEntry).toBeInTheDocument();

    // Resolve each entry's card and assert DOM order: "new" precedes "old"
    const newCard = newEntry.closest('.bg-gray-50.rounded-lg.p-3') as HTMLElement;
    const oldCard = oldEntry.closest('.bg-gray-50.rounded-lg.p-3') as HTMLElement;
    expect(newCard).toBeTruthy();
    expect(oldCard).toBeTruthy();
    const isOldFollowingNew = (newCard.compareDocumentPosition(oldCard) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0;
    expect(isOldFollowingNew).toBe(true);

    // Shared marker on the newest entry (exact marker text)
    expect(within(newCard).getByText('• shared')).toBeInTheDocument();
  });
});
