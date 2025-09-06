import React, { useEffect, useState } from 'react';
import { Plus, CheckSquare, XCircle } from 'lucide-react';

interface Task { id: number; text: string; done: boolean }

const SharedTodo: React.FC = () => {
  const STORAGE_KEY = 'sm_shared_todo_v1';
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw) as Task[];
    } catch {}
    return [
      { id: 1, text: 'Complete morning routine', done: false },
      { id: 2, text: 'Read 20 pages', done: true },
    ];
  });
  const [text, setText] = useState('');

  const addTask = () => {
    const t = text.trim();
    if (!t) return;
    setTasks(prev => [{ id: Date.now(), text: t, done: false }, ...prev]);
    setText('');
  };

  const toggle = (id: number) => setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  const remove = (id: number) => setTasks(prev => prev.filter(t => t.id !== id));

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch {}
  }, [tasks]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex items-center mb-4">
        <CheckSquare className="h-6 w-6 text-emerald-600 mr-2" />
        <h3 className="text-xl font-semibold text-gray-900">Shared To‑Do</h3>
      </div>
      <div className="flex gap-2 mb-4">
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Add a task"
          className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />
        <button aria-label="Add task" onClick={addTask} className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600">
          <Plus className="h-4 w-4" />
        </button>
      </div>
      <ul className="space-y-2">
        {tasks.map(t => (
          <li key={t.id} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={t.done} onChange={() => toggle(t.id)} />
              <span className={t.done ? 'line-through text-gray-400' : 'text-gray-800'}>{t.text}</span>
            </label>
            <button aria-label="Remove task" onClick={() => remove(t.id)} className="text-gray-400 hover:text-rose-500">
              <XCircle className="h-5 w-5" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SharedTodo;
