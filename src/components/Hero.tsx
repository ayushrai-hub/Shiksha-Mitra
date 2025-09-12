import React from 'react';
import { ArrowRight, Users2, Sparkles } from 'lucide-react';

const Hero: React.FC = () => {
  const handleJoinWaitlistOpen = () => {
    const modalFunc = (window as any).openWaitlistModal;
    if (modalFunc) {
      modalFunc();
    }
  };

  return (
    <section className="bg-gradient-to-br from-emerald-50 via-blue-50 to-indigo-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white p-4 rounded-full shadow-lg">
              <Users2 className="h-12 w-12 text-emerald-500" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Shiksha-Mitra
            <br />
            <span className="text-emerald-600">Your Growth Companion</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            A friend for your life's personal, academic, and professional journey. 
            Experience growth through mutual support, accountability, and shared wisdom.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <button onClick={handleJoinWaitlistOpen} className="bg-emerald-500 text-white px-8 py-4 rounded-lg hover:bg-emerald-600 transition-all transform hover:scale-105 shadow-lg flex items-center space-x-2 text-lg font-semibold">
              <Sparkles className="h-5 w-5" />
              <span>Join the Waitlist</span>
            </button>
            <button className="bg-white text-emerald-600 px-8 py-4 rounded-lg hover:bg-gray-50 transition-colors border-2 border-emerald-500 flex items-center space-x-2 text-lg font-semibold">
              <span>Learn the Concept</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>

          {/* Additional Waitlist Entry Point */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-4 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-md">
              <span className="text-gray-700 font-semibold">🚀 Ready to Begin?</span>
              <button
                onClick={handleJoinWaitlistOpen}
                className="bg-emerald-500 text-white px-6 py-2 rounded-full hover:bg-emerald-600 transition-colors font-semibold text-sm"
              >
                Join the Waitlist →
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="text-emerald-500 text-3xl font-bold">2</div>
              <div className="text-gray-700 font-medium">People, One Journey</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="text-blue-500 text-3xl font-bold">∞</div>
              <div className="text-gray-700 font-medium">Endless Growth</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="text-indigo-500 text-3xl font-bold">1</div>
              <div className="text-gray-700 font-medium">Shared Purpose</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
