import React from 'react';
import { BookOpen, Heart, Target, Users } from 'lucide-react';

const ConceptOverview: React.FC = () => {
  return (
    <section id="concept" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Understanding Shiksha-Mitra</h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Rooted in ancient Vedic wisdom, reimagined for the modern world
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="bg-emerald-100 p-3 rounded-lg flex-shrink-0">
                <BookOpen className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">What is "Shiksha"?</h3>
                <p className="text-gray-600 leading-relaxed">
                  <strong>Shiksha</strong> goes beyond academic knowledge. It encompasses life skills, mental clarity, 
                  health, discipline, financial awareness, and finding your purpose. It's holistic education 
                  for complete human development.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 p-3 rounded-lg flex-shrink-0">
                <Heart className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">What is a "Mitra"?</h3>
                <p className="text-gray-600 leading-relaxed">
                  <strong>Mitra</strong> is not just a friend, but someone who holds sacred space for your growth. 
                  They help you stay consistent, offer emotional support, and celebrate your victories while 
                  supporting you through challenges.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-indigo-100 p-3 rounded-lg flex-shrink-0">
                <Users className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">The Modern Need</h3>
                <p className="text-gray-600 leading-relaxed">
                  In today's hyper-individualized digital age, people face challenges alone—academic pressure, 
                  professional burnout, emotional stress. Shiksha-Mitra gives you a real person to journey 
                  through life's highs and lows together.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-emerald-50 to-blue-50 p-8 rounded-2xl">
            <div className="text-center mb-6">
              <Target className="h-12 w-12 text-emerald-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">The Shiksha-Mitra Promise</h3>
            </div>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="font-semibold text-gray-900">Accountability + Empathy</div>
                <div className="text-gray-600 text-sm">Someone who keeps you on track with kindness</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="font-semibold text-gray-900">Education + Emotional Maturity</div>
                <div className="text-gray-600 text-sm">Learn together while growing emotionally</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="font-semibold text-gray-900">Growth + Consistency</div>
                <div className="text-gray-600 text-sm">Steady progress through mutual support</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white p-8 rounded-2xl max-w-4xl mx-auto">
            <p className="text-xl font-medium leading-relaxed">
              "You can be from different countries, domains, backgrounds, races, or genders—what connects 
              you is the shared desire to grow. It's a platform for people who want to grow—without doing it alone."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConceptOverview;