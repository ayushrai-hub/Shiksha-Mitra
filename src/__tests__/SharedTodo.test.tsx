import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SharedTodo from '../features/SharedTodo';

describe('SharedTodo', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('adds, toggles, and removes tasks; persists to localStorage', async () => {
    const user = userEvent.setup();
    render(<SharedTodo />);

    const input = screen.getByPlaceholderText('Add a task');
    const addBtn = screen.getByRole('button', { name: /add task/i });

    await user.type(input, 'Test task');
    await user.click(addBtn);

    const task = await screen.findByText('Test task');
    expect(task).toBeInTheDocument();

    // toggle done
    const checkbox = task.closest('li')!.querySelector('input[type="checkbox"]')! as HTMLInputElement;
    expect(checkbox.checked).toBe(false);
    await user.click(checkbox);
    expect(checkbox.checked).toBe(true);

    // remove
    const removeBtn = task.closest('li')!.querySelector('button[aria-label="Remove task"]') as HTMLButtonElement;
    await user.click(removeBtn);
    expect(screen.queryByText('Test task')).not.toBeInTheDocument();

    // state persisted after operations
    const raw = localStorage.getItem('sm_shared_todo_v1');
    expect(raw).toBeTruthy();
  });
});
