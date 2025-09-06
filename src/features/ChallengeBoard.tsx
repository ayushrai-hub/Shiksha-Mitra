import React, { useEffect, useState } from 'react';
import { Trophy } from 'lucide-react';

interface Challenge { id: number; title: string; done: boolean }

const ChallengeBoard: React.FC = () => {
  const STORAGE_KEY = 'sm_challenges_v1';
  const [challenges, setChallenges] = useState<Challenge[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw) as Challenge[];
    } catch {}
    return [
      { id: 1, title: 'Read 20 pages', done: false },
      { id: 2, title: 'Exercise 3 times', done: false },
    ];
  });
  const toggle = (id: number) => setChallenges(prev => prev.map(c => c.id === id ? { ...c, done: !c.done } : c));

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(challenges));
    } catch {}
  }, [challenges]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex items-center mb-4">
        <Trophy className="h-6 w-6 text-purple-600 mr-2" />
        <h3 className="text-xl font-semibold text-gray-900">Mitra Challenge Board</h3>
      </div>
      <ul className="space-y-2">
        {challenges.map(c => (
          <li key={c.id} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
            <span className={c.done ? 'line-through text-gray-400' : 'text-gray-800'}>{c.title}</span>
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input type="checkbox" checked={c.done} onChange={() => toggle(c.id)} /> Done
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChallengeBoard;
