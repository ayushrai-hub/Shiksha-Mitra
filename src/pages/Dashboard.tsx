import React from 'react';
import SharedTodo from '../features/SharedTodo';
import Journal from '../features/Journal';
import GoalTracker from '../features/GoalTracker';
import MoodStatus from '../features/MoodStatus';
import RestartTogether from '../features/RestartTogether';
import ChallengeBoard from '../features/ChallengeBoard';

const Dashboard: React.FC = () => {
  return (
    <main className="bg-gray-50 py-16" id="dashboard">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Dashboard</h1>
          <p className="text-gray-600 mt-1">Track goals, journal, manage shared todos, and more.</p>
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
    </main>
  );
};

export default Dashboard;
