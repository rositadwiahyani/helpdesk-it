import React from 'react';

export default function ProfileLoading() {
  return (
    <div className="flex flex-col gap-6 p-6 md:p-10 w-full animate-pulse">
      {/* Header Skeleton */}
      <div>
        <div className="h-8 w-40 bg-gray-200 rounded-md mb-2"></div>
        <div className="h-4 w-64 bg-gray-200 rounded-md"></div>
      </div>

      {/* Card Skeleton */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Card Header */}
        <div className="p-5 md:p-6 border-b border-gray-100">
          <div className="h-6 w-48 bg-gray-200 rounded-md"></div>
        </div>

        {/* Card Body */}
        <div className="p-5 md:p-8 flex flex-col bg-white">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Avatar Section */}
            <div className="md:col-span-1 flex flex-col items-center gap-3 pt-2">
              <div className="w-24 h-24 rounded-full bg-gray-200"></div>
              <div className="h-4 w-16 bg-gray-200 rounded-md mt-1"></div>
            </div>
            
            {/* Fields Section */}
            <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <div className="h-4 w-16 bg-gray-200 rounded-md"></div>
                <div className="h-10 w-full bg-gray-200 rounded-xl"></div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="h-4 w-16 bg-gray-200 rounded-md"></div>
                <div className="h-10 w-full bg-gray-200 rounded-xl"></div>
              </div>
              <div className="flex flex-col gap-2 sm:col-span-2">
                <div className="h-4 w-24 bg-gray-200 rounded-md"></div>
                <div className="h-10 w-full bg-gray-200 rounded-xl"></div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="h-4 w-28 bg-gray-200 rounded-md"></div>
                <div className="h-10 w-full bg-gray-200 rounded-xl"></div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="h-4 w-28 bg-gray-200 rounded-md"></div>
                <div className="h-10 w-full bg-gray-200 rounded-xl"></div>
              </div>
            </div>
          </div>

          <hr className="border-gray-100 my-8" />

          {/* Auth Section */}
          <div className="flex flex-col gap-4">
            <div className="h-5 w-32 bg-gray-200 rounded-md mb-2"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:grid-cols-4">
              <div className="flex flex-col gap-2 md:col-span-2 sm:col-span-1">
                <div className="h-4 w-20 bg-gray-200 rounded-md"></div>
                <div className="h-10 w-full bg-gray-200 rounded-xl"></div>
              </div>
              <div className="flex flex-col gap-2 md:col-span-2 sm:col-span-1">
                <div className="h-4 w-32 bg-gray-200 rounded-md"></div>
                <div className="h-10 w-full bg-gray-200 rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 border-t border-gray-100 p-5 md:p-6 flex justify-center gap-3">
          <div className="h-10 w-32 bg-gray-200 rounded-xl"></div>
          <div className="h-10 w-24 bg-gray-200 rounded-xl"></div>
        </div>
      </div>
    </div>
  );
}
