import React from 'react';

const ProfileModal = ({ session, onClose }) => {
  return (
    <div className="fixed top-0 left-0 z-50 w-full h-full bg-gray-700 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h2 className="text-lg font-bold text-gray-900">Profile Settings</h2>
        <p className="text-sm text-gray-600">User ID: {session.user.id}</p>
        <p className="text-sm text-gray-600">Email: {session.user.email}</p>
        <button
          onClick={onClose}
          className="mt-4 py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ProfileModal;