import React from 'react';
import { Search, Users, Target, MessageCircle } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: Search,
      title: "Understand & Reflect",
      description: "Learn about the concept and reflect on what kind of Mitra you need for your growth journey."
    },
    {
      icon: Users,
      title: "Join & Match",
      description: "Join the platform and get matched with someone based on goals, mindset, and mutual interests."
    },
    {
      icon: Target,
      title: "Set Goals Together",
      description: "Define shared or individual goals and use our built-in features to track your progress."
    },
    {
      icon: MessageCircle,
      title: "Grow Together",
      description: "Update each other daily/weekly. Be honest, supportive, and respectful of each other's pace."
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">How to Start Your Journey</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Beginning your Shiksha-Mitra journey is simple and thoughtful. Here's how we guide you through each step.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={index} className="relative">
                <div className="bg-gradient-to-br from-emerald-50 to-blue-50 p-6 rounded-2xl text-center h-full">
                  <div className="bg-white p-4 rounded-full inline-block mb-4 shadow-md">
                    <IconComponent className="h-8 w-8 text-emerald-500" />
                  </div>
                  <div className="bg-emerald-500 text-white text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center absolute -top-2 -left-2">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-emerald-200"></div>
                )}
              </div>
            );
          })}
        </div>
        
        <div className="mt-16 bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-8 rounded-2xl">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Find Your Growth Companion?</h3>
            <p className="text-lg mb-6 opacity-90">
              Join thousands who have discovered the power of growing together
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold">
              Start Your Journey Today
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;