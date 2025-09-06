import React, { useEffect, useState } from 'react';

interface Submission {
  id: number;
  name: string;
  email: string;
  goals: string;
  preferences: string;
}

const FindMitra: React.FC = () => {
  const STORAGE_KEY = 'sm_find_mitra_forms_v1';
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [goals, setGoals] = useState('');
  const [preferences, setPreferences] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [draftCount, setDraftCount] = useState(0);

  useEffect(() => {
    const draft = [name, email, goals, preferences].filter(Boolean).length;
    setDraftCount(draft);
  }, [name, email, goals, preferences]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const entry: Submission = { id: Date.now(), name, email, goals, preferences };
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const list = raw ? (JSON.parse(raw) as Submission[]) : [];
      list.unshift(entry);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch {}
    setSubmitted(true);
    setName(''); setEmail(''); setGoals(''); setPreferences('');
  };

  return (
    <main className="bg-gray-50 py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Your Mitra</h1>
        <p className="text-gray-600 mb-8">Tell us a bit about you and what you seek in a growth partner. We'll use this to help match you.</p>

        {submitted && (
          <div className="mb-6 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-emerald-800">
            Thank you! Your interest is recorded. We'll reach out via email once matching opens.
          </div>
        )}

        <form onSubmit={onSubmit} className="bg-white rounded-xl shadow-md p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input value={name} onChange={e => setName(e.target.value)} className="w-full border rounded-lg px-3 py-2" placeholder="Your name" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full border rounded-lg px-3 py-2" placeholder="you@example.com" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your current goals</label>
            <textarea value={goals} onChange={e => setGoals(e.target.value)} className="w-full border rounded-lg px-3 py-2" rows={4} placeholder="e.g., Build a reading habit, improve fitness, learn a skill" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mitra preferences</label>
            <textarea value={preferences} onChange={e => setPreferences(e.target.value)} className="w-full border rounded-lg px-3 py-2" rows={3} placeholder="e.g., Similar timezone, weekly call, accountability-focused" />
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-500">Draft status: {draftCount}/4 fields filled</p>
            <button type="submit" className="bg-emerald-600 text-white px-5 py-2 rounded-lg hover:bg-emerald-700">Submit</button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default FindMitra;
