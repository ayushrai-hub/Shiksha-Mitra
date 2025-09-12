import React from 'react';
import { MessageSquare, Target, Clock, BookOpen, Lightbulb, Heart, RefreshCw } from 'lucide-react';

const Activities: React.FC = () => {
  const activities = [
    {
      icon: MessageSquare,
      title: "Daily Check-ins",
      description: "\"How was your day?\" - Share your highs, lows, and everything in between",
      color: "emerald"
    },
    {
      icon: Target,
      title: "Weekly Goal Reviews",
      description: "Reflect on progress, adjust targets, and celebrate achievements together",
      color: "blue"
    },
    {
      icon: Clock,
      title: "Pomodoro Work Sessions",
      description: "Focus together with shared productivity sessions and mutual accountability",
      color: "indigo"
    },
    {
      icon: BookOpen,
      title: "Learning Challenges",
      description: "Read books, take courses, or explore new skills as a team",
      color: "purple"
    },
    {
      icon: Lightbulb,
      title: "Self-improvement Tasks",
      description: "Build habits, develop skills, and work on personal growth projects",
      color: "amber"
    },
    {
      icon: Heart,
      title: "Emotional Unload Sessions",
      description: "Safe space to share feelings, process experiences, and receive support",
      color: "rose"
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap: { [key: string]: { bg: string, text: string, border: string } } = {
      emerald: { bg: "bg-emerald-100", text: "text-emerald-600", border: "border-emerald-200" },
      blue: { bg: "bg-blue-100", text: "text-blue-600", border: "border-blue-200" },
      indigo: { bg: "bg-indigo-100", text: "text-indigo-600", border: "border-indigo-200" },
      purple: { bg: "bg-purple-100", text: "text-purple-600", border: "border-purple-200" },
      amber: { bg: "bg-amber-100", text: "text-amber-600", border: "border-amber-200" },
      rose: { bg: "bg-rose-100", text: "text-rose-600", border: "border-rose-200" },
    };
    return colorMap[color] || colorMap.emerald;
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Activities You Can Do Together</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From daily connections to deep learning experiences, discover meaningful ways to grow with your Mitra
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {activities.map((activity, index) => {
            const IconComponent = activity.icon;
            const colorClasses = getColorClasses(activity.color);
            
            return (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className={`${colorClasses.bg} p-3 rounded-lg inline-block mb-4`}>
                  <IconComponent className={`h-6 w-6 ${colorClasses.text}`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{activity.title}</h3>
                <p className="text-gray-600 leading-relaxed">{activity.description}</p>
              </div>
            );
          })}
        </div>
        
        <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-emerald-500">
          <div className="flex items-start space-x-4">
            <div className="bg-emerald-100 p-3 rounded-lg flex-shrink-0">
              <RefreshCw className="h-6 w-6 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Meditation & Mindfulness Habits</h3>
              <p className="text-gray-600 leading-relaxed">
                Practice mindfulness together, share meditation experiences, and build a foundation of 
                mental clarity and emotional balance. Start with just 5 minutes a day and grow together.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Activities;