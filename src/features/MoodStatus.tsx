import React, { useEffect, useState } from 'react';
import { Smile } from 'lucide-react';

const MOODS = ['😊', '😌', '💪', '😔', '😴', '😤'];

const MoodStatus: React.FC = () => {
  const STORAGE_KEY = 'sm_mood_v1';
  const [mood, setMood] = useState<string>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return (JSON.parse(raw) as { mood: string; note: string }).mood || '😊';
    } catch {}
    return '😊';
  });
  const [note, setNote] = useState<string>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return (JSON.parse(raw) as { mood: string; note: string }).note || '';
    } catch {}
    return '';
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ mood, note }));
    } catch {}
  }, [mood, note]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex items-center mb-4">
        <Smile className="h-6 w-6 text-emerald-600 mr-2" />
        <h3 className="text-xl font-semibold text-gray-900">Mood Status</h3>
      </div>
      <div className="flex flex-wrap gap-2 mb-3">
        {MOODS.map(m => (
          <button
            key={m}
            className={`px-3 py-2 rounded-lg border ${mood === m ? 'bg-emerald-50 border-emerald-300' : 'bg-white'}`}
            onClick={() => setMood(m)}
            aria-pressed={mood === m}
            aria-label={`Select mood ${m}`}
          >{m}</button>
        ))}
      </div>
      <input
        value={note}
        onChange={e => setNote(e.target.value)}
        placeholder="Optional note"
        className="w-full border rounded-lg px-3 py-2"
      />
      <div className="text-sm text-gray-600 mt-2">Current: <span className="text-gray-800">{mood}</span> {note && `— ${note}`}</div>
    </div>
  );
};

export default MoodStatus;
