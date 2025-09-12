import React from 'react';
import { CheckSquare, BookOpen, Target, Smile, RotateCcw, Trophy } from 'lucide-react';

const Tools: React.FC = () => {
  const tools = [
    {
      icon: CheckSquare,
      title: "Simple Shared To-Do List",
      description: "Create and manage tasks together with real-time sync",
      preview: ["Complete morning routine", "Read 20 pages", "Call family"]
    },
    {
      icon: BookOpen,
      title: "Daily Journal Space",
      description: "Private and shared journaling for reflection and growth",
      preview: ["Today's gratitude", "Lessons learned", "Tomorrow's focus"]
    },
    {
      icon: Target,
      title: "Goal Tracker with Check-ins",
      description: "Set, track, and celebrate progress on personal and shared goals",
      preview: ["Exercise 4/7 days", "Learn Spanish 85%", "Save money ✓"]
    },
    {
      icon: Smile,
      title: "Mood Status & Emotion Marker",
      description: "Share your emotional state to help your Mitra support you better",
      preview: ["😊 Energetic", "😌 Peaceful", "💪 Motivated"]
    },
    {
      icon: RotateCcw,
      title: "\"Restart Together\" Button",
      description: "When either Mitra falls off track, restart your journey together",
      preview: ["Reset habits", "New goals", "Fresh start"]
    },
    {
      icon: Trophy,
      title: "Mitra Challenge Board",
      description: "Weekly shared tasks and challenges to keep things engaging",
      preview: ["Read together", "Exercise challenge", "Skill practice"]
    }
  ];

  return (
    <section id="tools" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Built-in Tools for Mitras</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to support each other's growth, built right into the platform
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {tools.map((tool, index) => {
            const IconComponent = tool.icon;
            
            return (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all">
                <div className="flex items-start space-x-4">
                  <div className="bg-emerald-100 p-3 rounded-lg flex-shrink-0">
                    <IconComponent className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{tool.title}</h3>
                    <p className="text-gray-600 mb-4">{tool.description}</p>
                    <div className="bg-white p-3 rounded-lg border border-gray-100">
                      <div className="text-sm text-gray-500 mb-2">Preview:</div>
                      <div className="space-y-1">
                        {tool.preview.map((item, itemIndex) => (
                          <div key={itemIndex} className="text-sm text-gray-700 flex items-center space-x-2">
                            <div className="w-1 h-1 bg-emerald-400 rounded-full"></div>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-16 bg-gradient-to-r from-emerald-50 to-blue-50 p-8 rounded-2xl border border-emerald-100">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Coming Soon: Advanced Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              <div className="bg-white p-4 rounded-lg">
                <div className="font-semibold text-gray-900">Smart Matching</div>
                <div className="text-gray-600 text-sm">AI-powered Mitra pairing</div>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <div className="font-semibold text-gray-900">Progress Analytics</div>
                <div className="text-gray-600 text-sm">Detailed growth insights</div>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <div className="font-semibold text-gray-900">Video Check-ins</div>
                <div className="text-gray-600 text-sm">Face-to-face connections</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tools;