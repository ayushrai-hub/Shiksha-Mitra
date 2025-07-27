import React from 'react';
import { Users, Heart, Mail, Twitter, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-emerald-500 p-2 rounded-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Shiksha-Mitra</h3>
                <p className="text-gray-400 text-sm">Grow with someone who believes in your growth</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
              A digital platform connecting two people who want to grow together through mutual support, 
              accountability, and shared wisdom. Rooted in ancient Vedic wisdom, designed for the modern world.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-gray-700 transition-colors">
                <Mail className="h-5 w-5" />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-gray-700 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-gray-700 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#concept" className="hover:text-emerald-400 transition-colors">The Concept</a></li>
              <li><a href="#how-it-works" className="hover:text-emerald-400 transition-colors">How It Works</a></li>
              <li><a href="#tools" className="hover:text-emerald-400 transition-colors">Built-in Tools</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Find Your Mitra</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Getting Started</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Community Guidelines</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 Shiksha-Mitra. Built with <Heart className="h-4 w-4 text-red-500 inline mx-1" /> for human connection and growth.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-emerald-400 text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 text-sm transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;