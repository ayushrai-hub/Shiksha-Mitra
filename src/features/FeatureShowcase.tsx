import React from 'react';
import SharedTodo from './SharedTodo';
import Journal from './Journal';
import GoalTracker from './GoalTracker';
import MoodStatus from './MoodStatus';
import RestartTogether from './RestartTogether';
import ChallengeBoard from './ChallengeBoard';

const FeatureShowcase: React.FC = () => {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">MVP Feature Showcase</h2>
          <p className="text-lg text-gray-600">Interactive demos of core tools (local state only)</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SharedTodo />
          <Journal />
          <GoalTracker />
          <MoodStatus />
          <RestartTogether />
          <ChallengeBoard />
        </div>
      </div>
    </section>
  );
};

export default FeatureShowcase;
