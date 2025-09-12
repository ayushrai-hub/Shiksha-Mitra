import React, { useState } from 'react';
import { X, CheckCircle } from 'lucide-react';

const WaitlistModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => {
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
      closeModal();
    }, 3000);
  };

  // Export the openModal function so other components can use it
  React.useEffect(() => {
    (window as any).openWaitlistModal = openModal;
    return () => {
      delete (window as any).openWaitlistModal;
    };
  }, []);

  return (
    <>
      {/* Modal overlay and content */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Join the Waitlist</h3>
              <button
                onClick={closeModal}
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
    </>
  );
};

export default WaitlistModal;
