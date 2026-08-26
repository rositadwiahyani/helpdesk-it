import React from 'react';

interface StaffHeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function StaffHeader({ activeTab, setActiveTab }: StaffHeaderProps) {
  return (
    <>
      <div className="flex pb-2 flex-col items-start gap-1 w-full">
        <div className="flex flex-col items-start w-full">
          <p className="text-[#001E40] font-iBMPlexSans text-2xl font-semibold leading-8 w-full tracking-[-0.01em]">
            Manajemen Staff
          </p>
        </div>
        <div className="flex flex-col items-start w-full">
          <p className="text-[#43474F] font-iBMPlexSans text-sm leading-5 w-full">
            Kelola agen, tim, dan departemen pada sistem Helpdesk.
          </p>
        </div>
      </div>
      <div className="flex items-center border-b border-b-[#C3C6D1] w-full">
        <button
          onClick={() => setActiveTab('Agents')}
          className={`cursor-pointer text-nowrap flex py-3 px-6 flex-col justify-center items-center border-b-2 w-fit ${
            activeTab === 'Agents' ? 'border-b-[#001E40]' : 'border-b-[rgba(0,0,0,0.00)]'
          }`}
        >
          <p
            className={`font-iBMPlexSans text-sm leading-5 w-fit ${
              activeTab === 'Agents' ? 'text-[#001E40] font-bold' : 'text-[#43474F]'
            }`}
          >
            Agents
          </p>
        </button>
        <button
          onClick={() => setActiveTab('Teams')}
          className={`cursor-pointer text-nowrap flex py-3 px-6 flex-col justify-center items-center border-b-2 w-fit ${
            activeTab === 'Teams' ? 'border-b-[#001E40]' : 'border-b-[rgba(0,0,0,0.00)]'
          }`}
        >
          <p
            className={`font-iBMPlexSans text-sm leading-5 w-fit ${
              activeTab === 'Teams' ? 'text-[#001E40] font-bold' : 'text-[#43474F]'
            }`}
          >
            Teams
          </p>
        </button>
        <button
          onClick={() => setActiveTab('Departments')}
          className={`cursor-pointer text-nowrap flex py-3 px-6 flex-col justify-center items-center border-b-2 w-fit ${
            activeTab === 'Departments' ? 'border-b-[#001E40]' : 'border-b-[rgba(0,0,0,0.00)]'
          }`}
        >
          <p
            className={`font-iBMPlexSans text-sm leading-5 w-fit ${
              activeTab === 'Departments' ? 'text-[#001E40] font-bold' : 'text-[#43474F]'
            }`}
          >
            Departments
          </p>
        </button>
      </div>
    </>
  );
}