import React, { useEffect, useState } from 'react';
import { Target, Check } from 'lucide-react';

interface Goal { id: number; title: string; target: string; progress: number; notes?: string }

const GoalTracker: React.FC = () => {
  const STORAGE_KEY = 'sm_goals_v1';
  const [goals, setGoals] = useState<Goal[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw) as Goal[];
    } catch {}
    return [
      { id: 1, title: 'Exercise', target: '4 days/week', progress: 2, notes: 'Felt great this week' },
    ];
  });
  const [title, setTitle] = useState('');
  const [target, setTarget] = useState('');

  const addGoal = () => {
    const t = title.trim();
    if (!t) return;
    setGoals(prev => [{ id: Date.now(), title: t, target, progress: 0 }, ...prev]);
    setTitle(''); setTarget('');
  };
  const inc = (id: number) => setGoals(prev => prev.map(g => g.id === id ? { ...g, progress: g.progress + 1 } : g));

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
    } catch {}
  }, [goals]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex items-center mb-4">
        <Target className="h-6 w-6 text-indigo-600 mr-2" />
        <h3 className="text-xl font-semibold text-gray-900">Goal Tracker</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4">
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Goal title" className="border rounded-lg px-3 py-2" />
        <input value={target} onChange={e => setTarget(e.target.value)} placeholder="Target (e.g., 4 days/week)" className="border rounded-lg px-3 py-2" />
        <button onClick={addGoal} className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600">Add Goal</button>
      </div>
      <div className="space-y-3">
        {goals.map(g => (
          <div key={g.id} className="bg-gray-50 rounded-lg p-3 flex items-center justify-between">
            <div>
              <div className="font-semibold text-gray-900">{g.title} <span className="text-gray-500 font-normal">({g.target})</span></div>
              <div className="text-sm text-gray-600">Progress: {g.progress}</div>
            </div>
            <button onClick={() => inc(g.id)} className="bg-white border px-3 py-2 rounded-lg hover:bg-gray-100 flex items-center gap-1">
              <Check className="h-4 w-4 text-indigo-600" /> Check‑in
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoalTracker;
