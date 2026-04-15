import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

const Header = ({ session, onProfileClick }) => {
  const [showMenu, setShowMenu] = useState(false);
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
              <div className="relative">
                <div className="flex items-center space-x-3">
                  <span className="text-gray-700">{session.user.email}</span>
                  <button 
                    onClick={() => setShowMenu(!showMenu)}
                    className="p-1 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 111.06.02L10 11.168l3.71-1.938a.75.75 0 111.08 1.27l-4.25 2.22a.75.75 0 01-1.16 0l-4.25-2.22a.75.75 0 01.02-1.26z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                
                {showMenu && (
                  <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button">
                    <div className="px-4 py-3" role="none">
                      <p className="text-sm text-gray-700" role="none">
                        {session.user.email}
                      </p>
                    </div>
                    <div className="border-t border-gray-200" role="none">
                      <button
                        onClick={() => {
                          onProfileClick();
                          setShowMenu(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        Profile
                      </button>
                      <button
                        onClick={handleSignOut}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;