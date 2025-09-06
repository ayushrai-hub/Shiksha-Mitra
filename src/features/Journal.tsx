import React, { useEffect, useState } from 'react';
import { BookOpen, Send } from 'lucide-react';

interface JournalEntry { id: number; date: string; text: string; shared: boolean }

const Journal: React.FC = () => {
  const [text, setText] = useState('');
  const STORAGE_KEY = 'sm_journal_v1';
  const [entries, setEntries] = useState<JournalEntry[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw) as JournalEntry[];
    } catch {}
    return [
      { id: 1, date: new Date().toISOString().slice(0,10), text: 'Grateful for a calm day.', shared: false },
    ];
  });

  const addEntry = (shared: boolean) => {
    const t = text.trim();
    if (!t) return;
    setEntries(prev => [{ id: Date.now(), date: new Date().toISOString().slice(0,10), text: t, shared }, ...prev]);
    setText('');
  };

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    } catch {}
  }, [entries]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex items-center mb-4">
        <BookOpen className="h-6 w-6 text-blue-600 mr-2" />
        <h3 className="text-xl font-semibold text-gray-900">Daily Journal</h3>
      </div>
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Write your reflection..."
        className="w-full border rounded-lg px-3 py-2 mb-3 h-24 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <div className="flex gap-2 mb-4">
        <button onClick={() => addEntry(false)} className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700">Save Private</button>
        <button onClick={() => addEntry(true)} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-1">
          <Send className="h-4 w-4" /> Share Excerpt
        </button>
      </div>
      <div className="space-y-2">
        {entries.map(e => (
          <div key={e.id} className="bg-gray-50 rounded-lg p-3">
            <div className="text-xs text-gray-500 mb-1">{e.date} {e.shared && <span className="text-blue-600 font-medium">• shared</span>}</div>
            <div className="text-gray-800 whitespace-pre-wrap">{e.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Journal;
