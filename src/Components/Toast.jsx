import React from 'react';

export const Toast = ({ message, type, onClose }) => {
  return (
    <div className={`fixed bottom-4 right-4 z-50 transform transition-all duration-500 ${type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
      <div className="flex items-center gap-3 text-white px-6 py-3 rounded-lg shadow-lg">
        {type === 'success' ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        )}
        <p className="font-medium">{message}</p>
        <button onClick={onClose} className="ml-2 hover:opacity-80">×</button>
      </div>
    </div>
  );
};