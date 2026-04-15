import React from 'react';
import { supabase } from '../lib/supabase';

const Header = ({ session }) => {
  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-1"></div>
          <div className="flex items-center justify-center">
            <h1 className="text-2xl font-bold text-gray-900">Flowtree</h1>
          </div>
          <div className="flex-1 flex justify-end">
            {session && (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">{session.user.email}</span>
                <button
                  onClick={handleSignOut}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;