import React from 'react';

const ProfileModal = ({ session, onClose }) => {
  return (
    <div className="fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-75 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h2 className="text-lg font-bold text-gray-900">Profile Modal</h2>
        <p className="text-sm text-gray-700">User Email: {session.user.email}</p>
        <button
          onClick={onClose}
          className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ProfileModal;