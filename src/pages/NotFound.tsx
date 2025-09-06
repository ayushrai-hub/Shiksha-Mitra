import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <main className="min-h-[60vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <p className="text-sm font-semibold text-emerald-600">404</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">Page not found</h1>
        <p className="mt-2 text-gray-600">Sorry, we couldn’t find the page you’re looking for.</p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Link to="/" className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700">Go home</Link>
          <Link to="/dashboard" className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-white">Open Dashboard</Link>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
