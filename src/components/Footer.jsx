import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full bg-gray-800 text-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start space-y-6 md:space-y-0">
        <div className="text-center md:text-left">
          <Link to="/" className="text-2xl font-bold text-white hover:text-gray-200 transition-colors duration-200">
            FlowTree
          </Link>
          <p className="mt-2 text-gray-400">Streamline your workflow.</p>
        </div>

        <div className="flex flex-col items-center md:items-start space-y-2">
          <h3 className="text-lg font-semibold text-white">Quick Links</h3>
          <Link to="/" className="text-gray-400 hover:text-white transition-colors duration-200">Home</Link>
        </div>

        <div className="flex flex-col items-center md:items-start space-y-2">
          <h3 className="text-lg font-semibold text-white">Legal</h3>
          <Link to="/privacy-policy" className="text-gray-400 hover:text-white transition-colors duration-200">Privacy Policy</Link>
          <Link to="/terms-of-service" className="text-gray-400 hover:text-white transition-colors duration-200">Terms of Service</Link>
        </div>

        <div className="text-center md:text-right">
          <p className="text-gray-400">&copy; {new Date().getFullYear()} FlowTree. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;