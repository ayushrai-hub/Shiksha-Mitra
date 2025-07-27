import React from 'react';
import { Users, Heart } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <div className="bg-emerald-500 p-2 rounded-lg">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Shiksha-Mitra</h1>
              <p className="text-xs text-gray-500">Grow with someone who believes in your growth</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#concept" className="text-gray-700 hover:text-emerald-600 transition-colors">Concept</a>
            <a href="#how-it-works" className="text-gray-700 hover:text-emerald-600 transition-colors">How It Works</a>
            <a href="#tools" className="text-gray-700 hover:text-emerald-600 transition-colors">Tools</a>
            <button className="bg-emerald-500 text-white px-6 py-2 rounded-lg hover:bg-emerald-600 transition-colors flex items-center space-x-2">
              <Heart className="h-4 w-4" />
              <span>Find Your Mitra</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;