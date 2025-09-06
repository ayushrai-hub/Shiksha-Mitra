import { render, screen } from '@testing-library/react';
import SharedTodo from '../features/SharedTodo';

describe('SharedTodo hydration', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('loads tasks from localStorage on mount', async () => {
    const seed = [
      { id: 101, text: 'Seed A', done: true },
      { id: 102, text: 'Seed B', done: false },
    ];
    localStorage.setItem('sm_shared_todo_v1', JSON.stringify(seed));

    render(<SharedTodo />);

    const a = await screen.findByText('Seed A');
    const b = await screen.findByText('Seed B');
    expect(a).toBeInTheDocument();
    expect(b).toBeInTheDocument();

    const aCheckbox = a.closest('li')!.querySelector('input[type="checkbox"]') as HTMLInputElement;
    const bCheckbox = b.closest('li')!.querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(aCheckbox.checked).toBe(true);
    expect(bCheckbox.checked).toBe(false);
  });
});
