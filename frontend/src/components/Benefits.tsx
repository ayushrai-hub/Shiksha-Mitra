import React from 'react';
import { CheckCircle, AlertCircle, Shield, TrendingUp, Users, Target } from 'lucide-react';

const Benefits: React.FC = () => {
  const benefits = [
    {
      icon: Shield,
      title: "Emotional and Mental Support",
      description: "A safe space to share your struggles and celebrations"
    },
    {
      icon: Target,
      title: "Shared Accountability",
      description: "Someone who gently keeps you on track with your goals"
    },
    {
      icon: TrendingUp,
      title: "Personal Goal Tracking",
      description: "Monitor progress together with built-in tracking tools"
    },
    {
      icon: Users,
      title: "Reduces Isolation",
      description: "Connect with someone who truly understands your journey"
    }
  ];

  const challenges = [
    "Finding the right Mitra match",
    "Maintaining mutual consistency",
    "Overcoming hesitation in sharing personal goals"
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Shiksha-Mitra Works</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We believe in transparency. Here's what makes our platform powerful and the challenges we help you overcome.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Benefits */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <div className="flex items-center mb-6">
              <CheckCircle className="h-8 w-8 text-emerald-500 mr-3" />
              <h3 className="text-2xl font-bold text-gray-900">The Benefits</h3>
            </div>
            <div className="space-y-6">
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="bg-emerald-100 p-2 rounded-lg flex-shrink-0">
                      <IconComponent className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{benefit.title}</h4>
                      <p className="text-gray-600 text-sm">{benefit.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-8 p-4 bg-emerald-50 rounded-lg">
              <p className="text-emerald-800 font-medium">
                ✨ Builds emotional maturity and productivity together
              </p>
            </div>
          </div>
          
          {/* Challenges */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <div className="flex items-center mb-6">
              <AlertCircle className="h-8 w-8 text-amber-500 mr-3" />
              <h3 className="text-2xl font-bold text-gray-900">Honest Challenges</h3>
            </div>
            <div className="space-y-4 mb-6">
              {challenges.map((challenge, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">{challenge}</p>
                </div>
              ))}
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">How We Help You Overcome These:</h4>
              <ul className="text-blue-800 text-sm space-y-1">
                <li>• Thoughtful matching algorithm (coming soon)</li>
                <li>• Gentle reminders and restart options</li>
                <li>• Safe space guidelines and community support</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;