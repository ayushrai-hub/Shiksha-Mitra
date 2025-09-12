import React, { useState } from 'react';
import { ArrowRight, Users2, Sparkles, X, CheckCircle } from 'lucide-react';

const Hero: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleJoinWaitlistOpen = () => setIsModalOpen(true);

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEmail('');
    setIsSubmitted(false);
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Store in localStorage (mock storage)
    const waitlist = JSON.parse(localStorage.getItem('shiksha-mitra-waitlist') || '[]');
    if (waitlist.includes(email)) {
      setError('This email is already on the waitlist.');
      return;
    }
    
    waitlist.push(email);
    localStorage.setItem('shiksha-mitra-waitlist', JSON.stringify(waitlist));
    
    setIsSubmitted(true);
    setError('');
    
    // Auto-close after 3 seconds
    setTimeout(() => {
      handleModalClose();
    }, 3000);
  };
  return (
    <section className="bg-gradient-to-br from-emerald-50 via-blue-50 to-indigo-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white p-4 rounded-full shadow-lg">
              <Users2 className="h-12 w-12 text-emerald-500" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Shiksha-Mitra
            <br />
            <span className="text-emerald-600">Your Growth Companion</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            A friend for your life's personal, academic, and professional journey. 
            Experience growth through mutual support, accountability, and shared wisdom.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button onClick={handleJoinWaitlistOpen} className="bg-emerald-500 text-white px-8 py-4 rounded-lg hover:bg-emerald-600 transition-all transform hover:scale-105 shadow-lg flex items-center space-x-2 text-lg font-semibold">
              <Sparkles className="h-5 w-5" />
              <span>Join the Waitlist</span>
            </button>
            <button className="bg-white text-emerald-600 px-8 py-4 rounded-lg hover:bg-gray-50 transition-colors border-2 border-emerald-500 flex items-center space-x-2 text-lg font-semibold">
              <span>Learn the Concept</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="text-emerald-500 text-3xl font-bold">2</div>
              <div className="text-gray-700 font-medium">People, One Journey</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="text-blue-500 text-3xl font-bold">∞</div>
              <div className="text-gray-700 font-medium">Endless Growth</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="text-indigo-500 text-3xl font-bold">1</div>
              <div className="text-gray-700 font-medium">Shared Purpose</div>
            </div>
          </div>

          {/* Waitlist Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">Join the Waitlist</h3>
                  <button
                    onClick={handleModalClose}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                {isSubmitted ? (
                  <div className="text-center py-6">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Success!</h4>
                    <p className="text-gray-600">You've been added to the waitlist. We'll keep you updated!</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <p className="text-gray-600 mb-4">
                      Be the first to know when Shiksha-Mitra launches. Enter your email to join our waitlist.
                    </p>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 mb-2"
                      required
                    />
                    {error && (
                      <p className="text-red-500 text-sm mb-4">{error}</p>
                    )}
                    <button
                      type="submit"
                      className="w-full bg-emerald-500 text-white py-3 rounded-md hover:bg-emerald-600 transition-colors font-semibold"
                    >
                      Join the Waitlist
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
