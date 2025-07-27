import React from 'react';
import { Heart, RefreshCw, Shield } from 'lucide-react';

const Compassion: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-emerald-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="bg-white p-4 rounded-full inline-block mb-6 shadow-lg">
            <Heart className="h-12 w-12 text-emerald-500" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Consistency & Compassion</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The heart of Shiksha-Mitra: Building habits with kindness, not judgment
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <RefreshCw className="h-6 w-6 text-emerald-500 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900">It's Okay to Miss Days</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Life happens. Work gets overwhelming. Sometimes we forget or feel unmotivated. 
                That's completely human and expected. Shiksha-Mitra is designed around this reality.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <Shield className="h-6 w-6 text-blue-500 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900">No Judgment Zone</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                You don't get judged here—you get supported. When one forgets, the other gently 
                brings them back. It's about returning to your path together, not perfect execution.
              </p>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">The Gentle Return Process</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="bg-emerald-100 text-emerald-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">1</div>
                <div>
                  <div className="font-semibold text-gray-900">Acknowledge Without Shame</div>
                  <div className="text-gray-600 text-sm">"I missed a few days, and that's okay"</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">2</div>
                <div>
                  <div className="font-semibold text-gray-900">Gentle Check-in</div>
                  <div className="text-gray-600 text-sm">Your Mitra asks: "How can I support you?"</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-indigo-100 text-indigo-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">3</div>
                <div>
                  <div className="font-semibold text-gray-900">Restart Together</div>
                  <div className="text-gray-600 text-sm">Press the "Restart Together" button and begin again</div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg">
              <p className="text-center text-gray-700 font-medium italic">
                "Everyone falls off sometimes. Shiksha-Mitra is about returning, together."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Compassion;