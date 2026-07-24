'use client';

import React, { useState, useEffect } from 'react';

export interface StatisticsData {
  avgResponseTime: {
    value: string;
    changeText: string;
    isPositive: boolean; // Jika true gunakan hijau (baik), jika false gunakan merah muda/abu-abu
  };
  csatScore: {
    value: string;
    changeText: string;
  };
  slaCompliance: {
    value: string;
    changeText: string;
    isNegative: boolean; // Untuk SLA jika turun maka warning/merah
  };
  knowledgeArticles: {
    value: string;
    changeText: string;
  };
}

interface TicketStatisticsProps {
  data?: StatisticsData;
}

// Dummy initial data sesuai UI yang diberikan
const DUMMY_DATA: StatisticsData = {
  avgResponseTime: { value: '12m 45s', changeText: '2.4% from last week', isPositive: true },
  csatScore: { value: '4.8/5.0', changeText: '0.2 from last week' },
  slaCompliance: { value: '96.2%', changeText: '1.5% from last week', isNegative: true },
  knowledgeArticles: { value: '1,402', changeText: '12 new this month' },
};

export default function TicketStatistics({ data: externalData }: TicketStatisticsProps) {
  const [stats, setStats] = useState<StatisticsData>(DUMMY_DATA);
  const [isLoading, setIsLoading] = useState(!externalData);

  useEffect(() => {
    // Jika data tidak dipassing dari parent, simulasi fetch dari API backend
    if (!externalData) {
      const fetchStats = async () => {
        // Simulasi delay jaringan
        await new Promise((resolve) => setTimeout(resolve, 800));
        setStats(DUMMY_DATA);
        setIsLoading(false);
      };
      fetchStats();
    } else {
      setStats(externalData);
      setIsLoading(false);
    }
  }, [externalData]);

  return (
    <div className="flex justify-center items-start gap-4 w-full">
      {/* 1. Avg Response Time */}
      <div className={`flex p-4 justify-between items-center rounded-lg border border-[#C3C6D1] bg-[#FFF] w-full ${isLoading ? 'opacity-70 animate-pulse' : ''}`}>
        <div className="flex flex-col items-start gap-1 w-fit">
          <div className="flex flex-col items-start w-full">
            <p className="text-[#43474F] font-iBMPlexSans text-xs font-semibold leading-4 w-fit tracking-[0.05em]">
              Avg. Response Time
            </p>
          </div>
          <div className="flex flex-col items-start w-full">
            <p className="text-[#001E40] font-iBMPlexSans text-2xl font-semibold leading-8 w-fit tracking-[-0.01em]">
              {stats.avgResponseTime.value}
            </p>
          </div>
          <div className="flex items-center gap-1 w-full">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex flex-col items-start w-fit ">
              <path d="M4.08333 0V7.10208L0.816667 3.83542L0 4.66667L4.66667 9.33333L9.33333 4.66667L8.51667 3.83542L5.25 7.10208V0H4.08333Z" fill="#16A34A" />
            </svg>
            <p className="text-[#16A34A] font-iBMPlexSans text-[11px] font-medium leading-[16.5px] w-fit">
              {stats.avgResponseTime.changeText}
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center rounded-xl bg-[#D5E3FF] w-12 h-12">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex flex-col items-start w-fit ">
            <path d="M13.3 14.7L14.7 13.3L11 9.6V5H9V10.4L13.3 14.7ZM10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20ZM10 18C12.2167 18 14.1042 17.2208 15.6625 15.6625C17.2208 14.1042 18 12.2167 18 10C18 7.78333 17.2208 5.89583 15.6625 4.3375C14.1042 2.77917 12.2167 2 10 2C7.78333 2 5.89583 2.77917 4.3375 4.3375C2.77917 5.89583 2 7.78333 2 10C2 12.2167 2.77917 14.1042 4.3375 15.6625C5.89583 17.2208 7.78333 18 10 18Z" fill="#001B3C" />
          </svg>
        </div>
      </div>

      {/* 2. CSAT Score */}
      <div className={`flex p-4 justify-between items-center rounded-lg border border-[#C3C6D1] bg-[#FFF] w-full ${isLoading ? 'opacity-70 animate-pulse' : ''}`}>
        <div className="flex flex-col items-start gap-1 w-fit">
          <div className="flex flex-col items-start w-full">
            <p className="text-[#43474F] font-iBMPlexSans text-xs font-semibold leading-4 w-fit tracking-[0.05em]">
              CSAT Score
            </p>
          </div>
          <div className="flex flex-col items-start w-full">
            <p className="text-[#001E40] font-iBMPlexSans text-2xl font-semibold leading-8 w-fit tracking-[-0.01em]">
              {stats.csatScore.value}
            </p>
          </div>
          <div className="flex items-center gap-1 w-full">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex flex-col items-start w-fit ">
              <path d="M4.08333 9.33333V2.23125L0.816667 5.49792L0 4.66667L4.66667 0L9.33333 4.66667L8.51667 5.49792L5.25 2.23125V9.33333H4.08333Z" fill="#16A34A" />
            </svg>
            <p className="text-[#16A34A] font-iBMPlexSans text-[11px] font-medium leading-[16.5px] w-fit">
              {stats.csatScore.changeText}
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center rounded-xl bg-[#D8E2FF] w-12 h-12">
          <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex flex-col items-start w-fit ">
            <path d="M6.85 14.825L10 12.925L13.15 14.85L12.325 11.25L15.1 8.85L11.45 8.525L10 5.125L8.55 8.5L4.9 8.825L7.675 11.25L6.85 14.825ZM3.825 19L5.45 11.975L0 7.25L7.2 6.625L10 0L12.8 6.625L20 7.25L14.55 11.975L16.175 19L10 15.275L3.825 19Z" fill="#001A41" />
          </svg>
        </div>
      </div>

      {/* 3. SLA Compliance */}
      <div className={`flex pt-4 pr-4 pb-4 pl-4 justify-between items-center rounded-lg border border-[#C3C6D1] bg-[#FFF] w-full ${isLoading ? 'opacity-70 animate-pulse' : ''}`}>
        <div className="flex flex-col items-start gap-1 w-fit">
          <div className="flex flex-col items-start w-full">
            <p className="text-[#43474F] font-iBMPlexSans text-xs font-semibold leading-4 w-fit tracking-[0.05em]">
              SLA Compliance
            </p>
          </div>
          <div className="flex flex-col items-start w-full">
            <p className="text-[#001E40] font-iBMPlexSans text-2xl font-semibold leading-8 w-fit tracking-[-0.01em]">
              {stats.slaCompliance.value}
            </p>
          </div>
          <div className="flex items-center gap-1 w-full">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex flex-col items-start w-fit ">
              <path d="M4.08333 0V7.10208L0.816667 3.83542L0 4.66667L4.66667 9.33333L9.33333 4.66667L8.51667 3.83542L5.25 7.10208V0H4.08333Z" fill="#BA1A1A" />
            </svg>
            <p className="text-[#BA1A1A] font-iBMPlexSans text-[11px] font-medium leading-[16.5px] w-fit">
              {stats.slaCompliance.changeText}
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center rounded-xl bg-[#FFDAD6] w-12 h-12">
          <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex flex-col items-start w-fit ">
            <path d="M0 19V17H12V19H0ZM5.65 14.15L0 8.5L2.1 6.35L7.8 12L5.65 14.15ZM12 7.8L6.35 2.1L8.5 0L14.15 5.65L12 7.8ZM16.6 18L3.55 4.95L4.95 3.55L18 16.6L16.6 18Z" fill="#93000A" />
          </svg>
        </div>
      </div>

      {/* 4. Knowledge Articles */}
      <div className={`flex p-4 justify-between items-center rounded-lg border border-[#C3C6D1] bg-[#FFF] w-full ${isLoading ? 'opacity-70 animate-pulse' : ''}`}>
        <div className="flex flex-col items-start gap-1 w-fit">
          <div className="flex flex-col items-start w-full">
            <p className="text-[#43474F] font-iBMPlexSans text-xs font-semibold leading-4 w-fit tracking-[0.05em]">
              Knowledge Articles
            </p>
          </div>
          <div className="flex flex-col items-start w-full">
            <p className="text-[#001E40] font-iBMPlexSans text-2xl font-semibold leading-8 w-fit tracking-[-0.01em]">
              {stats.knowledgeArticles.value}
            </p>
          </div>
          <div className="flex items-center gap-1 w-full">
            <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex flex-col items-start w-fit ">
              <path d="M3.5 4.66667H0V3.5H3.5V0H4.66667V3.5H8.16667V4.66667H4.66667V8.16667H3.5V4.66667Z" fill="#43474F" />
            </svg>
            <p className="text-[#43474F] font-iBMPlexSans text-[11px] font-medium leading-[16.5px] w-fit">
              {stats.knowledgeArticles.changeText}
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center rounded-xl bg-[#E0E3E6] w-12 h-12">
          <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex flex-col items-start w-fit ">
            <path d="M11 19.5C10.2 18.8667 9.33333 18.375 8.4 18.025C7.46667 17.675 6.5 17.5 5.5 17.5C4.8 17.5 4.1125 17.5917 3.4375 17.775C2.7625 17.9583 2.11667 18.2167 1.5 18.55C1.15 18.7333 0.8125 18.725 0.4875 18.525C0.1625 18.325 0 18.0333 0 17.65V5.6C0 5.41667 0.0458333 5.24167 0.1375 5.075C0.229167 4.90833 0.366667 4.78333 0.55 4.7C1.31667 4.3 2.11667 4 2.95 3.8C3.78333 3.6 4.63333 3.5 5.5 3.5C6.46667 3.5 7.4125 3.625 8.3375 3.875C9.2625 4.125 10.15 4.5 11 5V17.1C11.85 16.5667 12.7417 16.1667 13.675 15.9C14.6083 15.6333 15.55 15.5 16.5 15.5C17.1 15.5 17.6875 15.55 18.2625 15.65C18.8375 15.75 19.4167 15.9 20 16.1V4.1C20.25 4.18333 20.4958 4.27083 20.7375 4.3625C20.9792 4.45417 21.2167 4.56667 21.45 4.7C21.6333 4.78333 21.7708 4.90833 21.8625 5.075C21.9542 5.24167 22 5.41667 22 5.6V17.65C22 18.0333 21.8375 18.325 21.5125 18.525C21.1875 18.725 20.85 18.7333 20.5 18.55C19.8833 18.2167 19.2375 17.9583 18.5625 17.775C17.8875 17.5917 17.2 17.5 16.5 17.5C15.5 17.5 14.5333 17.675 13.6 18.025C12.6667 18.375 11.8 18.8667 11 19.5ZM13 14.5V5L18 0V10L13 14.5ZM9 16.125V6.225C8.45 5.99167 7.87917 5.8125 7.2875 5.6875C6.69583 5.5625 6.1 5.5 5.5 5.5C4.88333 5.5 4.28333 5.55833 3.7 5.675C3.11667 5.79167 2.55 5.96667 2 6.2V16.125C2.58333 15.9083 3.1625 15.75 3.7375 15.65C4.3125 15.55 4.9 15.5 5.5 15.5C6.1 15.5 6.6875 15.55 7.2625 15.65C7.8375 15.75 8.41667 15.9083 9 16.125ZM9 16.125V6.225V16.125Z" fill="#43474A" />
          </svg>
        </div>
      </div>
    </div>
  );
}