import React from 'react';

const ProfileModal = ({ onClose, session }) => {
  return (
    <div className="fixed top-0 left-0 z-50 w-full h-full bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-4 max-w-md">
        <h2 className="text-lg font-bold text-gray-900">Profile Modal</h2>
        <p className="text-gray-600">This is a profile modal for {session.user.email}</p>
        <button onClick={onClose} className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700">
          Close
        </button>
      </div>
    </div>
  );
};

export default ProfileModal;