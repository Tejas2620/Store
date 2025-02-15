import React from 'react';

export const LoadingOverlay = () => {
  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-xl">
        <div className="flex items-center gap-4">
          <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
          <p className="text-gray-700 font-medium">Loading...</p>
        </div>
      </div>
    </div>
  );
};