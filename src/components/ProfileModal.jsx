import React from 'react';

const ProfileModal = ({ session, onClose }) => {
  return (
    <div className="fixed top-0 left-0 z-50 w-full h-full bg-gray-700 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h2 className="text-lg font-bold text-gray-900 mb-2">Profile Settings</h2>
        <p className="text-sm text-gray-700 mb-4">You are logged in as {session.user.email}</p>
        <button
          onClick={onClose}
          className="py-2 px-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ProfileModal;