// Main Application Content
import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AuthPage } from './pages/Auth';
import Header from './components/Header';
import Hero from './components/Hero';
import ConceptOverview from './components/ConceptOverview';
import Benefits from './components/Benefits';
import HowItWorks from './components/HowItWorks';
import Activities from './components/Activities';
import Tools from './components/Tools';
import Compassion from './components/Compassion';
import FindMitra from './components/FindMitra';
import Footer from './components/Footer';
import WaitlistModal from './components/WaitlistModal';

// Main Application Content
function AppContent() {
  const { isAuthenticated, user, logout } = useAuth();
  const [showLanding, setShowLanding] = useState(true);

  if (!isAuthenticated || !user) {
    if (showLanding) {
      return (
        <div className="min-h-screen bg-gray-50">
          <Header />
          <Hero />
          <ConceptOverview />
          <Benefits />
          <HowItWorks />
          <Activities />
          <Tools />
          <Compassion />
          <FindMitra />
          <Footer />
          {/* Add a get started button or login prompt at the end */}
          <div className="fixed bottom-6 right-6">
            <button
              onClick={() => setShowLanding(false)}
              className="bg-emerald-500 text-white px-6 py-3 rounded-full hover:bg-emerald-600 transition-colors shadow-lg"
            >
              Get Started
            </button>
          </div>
          <WaitlistModal />
        </div>
      );
    } else {
      return <AuthPage onBack={() => setShowLanding(true)} />;
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with user info and logout */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="ml-3 text-xl font-bold text-gray-900">Shiksha-Mitra</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Welcome, <span className="font-medium text-gray-900">{user.name}</span>
              </div>
              <div className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                {user.role}
              </div>
              <button
                onClick={logout}
                className="px-4 py-2 bg-gray-600 text-white text-sm rounded-md hover:bg-gray-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* User Dashboard */}
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">Your Learning Dashboard</h2>
                <p className="mt-2 text-gray-600">Welcome to your personalized learning experience</p>
              </div>

              <div className="p-6">
                {/* User Info Card */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
                      <p className="text-gray-600">{user.email}</p>
                      <p className="text-sm text-blue-600 mt-1">Role: {user.role}</p>
                    </div>
                    <div className="h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xl font-bold">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                      <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Find Study Buddies</h3>
                    <p className="text-gray-600 mb-4">Connect with fellow learners and study together</p>
                    <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                      Browse Matches
                    </button>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                      <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Study Materials</h3>
                    <p className="text-gray-600 mb-4">Access curated learning resources</p>
                    <button className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
                      Browse Library
                    </button>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                      <svg className="h-6 w-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.3 3.3 0 0113.7 20h-3.599a3.3 3.3 0 01-2.324-.808l-.547-.547z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Learning Assistant</h3>
                    <p className="text-gray-600 mb-4">Get personalized help with your studies</p>
                    <button className="w-full bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors">
                      Chat with AI
                    </button>
                  </div>
                </div>

                {/* Motivational message */}
                <div className="mt-8 text-center">
                  <blockquote className="text-2xl font-medium text-gray-900 italic">
                    "Education is the passport to the future, for tomorrow belongs to those who prepare for it today."
                  </blockquote>
                  <cite className="mt-2 text-gray-600">- Malcolm X</cite>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

// Main App with Auth Provider
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
