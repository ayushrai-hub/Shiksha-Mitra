import React from 'react';
import { RotateCcw, Heart } from 'lucide-react';

const RestartTogether: React.FC = () => {
  const handleRestart = () => {
    // Placeholder for a guided reset flow; in MVP it simply shows a toast-like message.
    alert('Restarted together. Fresh start! Be gentle and consistent.');
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex items-center mb-4">
        <RotateCcw className="h-6 w-6 text-amber-600 mr-2" />
        <h3 className="text-xl font-semibold text-gray-900">Restart Together</h3>
      </div>
      <p className="text-gray-600 mb-4">If you fell off, that's okay. Restart with compassion and begin again.</p>
      <button onClick={handleRestart} className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 flex items-center gap-2">
        <Heart className="h-4 w-4" /> Restart Now
      </button>
    </div>
  );
};

export default RestartTogether;
