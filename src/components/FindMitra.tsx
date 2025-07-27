import React from 'react';
import { Search, Users, Clock, Globe, Target } from 'lucide-react';

const FindMitra: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">How to Find Your Shiksha-Mitra</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're building the perfect matching system to connect you with your ideal growth companion
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <Search className="h-6 w-6 text-emerald-600 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900">Coming Soon: Smart Matching</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Our thoughtful matching algorithm will connect you based on:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span>Personal and professional goals</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span>Learning interests and skill areas</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span>Time zones and availability</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span>Communication style preferences</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span>Emotional support priorities</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <Users className="h-6 w-6 text-blue-600 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900">Current Option: Community Pairing</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Until our matching system launches, connect through:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Shared interest forms and questionnaires</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Community forums and introduction threads</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Manual pairing with our support team</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Matching Criteria</h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-white p-2 rounded-lg">
                  <Target className="h-5 w-5 text-indigo-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Goals Alignment</h4>
                  <p className="text-gray-600 text-sm">Similar aspirations in career, health, learning, or personal growth</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-white p-2 rounded-lg">
                  <Clock className="h-5 w-5 text-purple-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Time Compatibility</h4>
                  <p className="text-gray-600 text-sm">Matching schedules and time zones for regular check-ins</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-white p-2 rounded-lg">
                  <Globe className="h-5 w-5 text-emerald-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Cultural Openness</h4>
                  <p className="text-gray-600 text-sm">Embracing diversity and learning from different backgrounds</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 bg-white p-4 rounded-lg">
              <p className="text-center text-gray-700 font-medium">
                💫 The perfect Mitra isn't someone exactly like you—they're someone who complements your growth journey
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white p-8 rounded-2xl max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Ready to Begin?</h3>
            <p className="text-lg mb-6">
              Join our early community and be among the first to experience the power of Shiksha-Mitra
            </p>
            <button className="bg-white text-emerald-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold">
              Join the Waitlist
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FindMitra;