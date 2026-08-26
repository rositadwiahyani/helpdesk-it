"use client";

import React from "react";

interface LogsSummaryCardsProps {
  incomingToday?: number | string;
  outgoingToday?: number | string;
  successRate?: number | string;
  errors24h?: number | string;
}

export default function LogsSummaryCards({
  incomingToday = 412,
  outgoingToday = 836,
  successRate = "99.8%",
  errors24h = 2,
}: LogsSummaryCardsProps) {
  return (
    <div className="flex justify-center items-start w-full">
      <div className="flex p-6 items-center gap-4 rounded-xl border border-[#E5E7EB] bg-[rgba(255,255,255,0.00)] shadow-[01px2px0rgba(0,0,0,0.05)] w-full">
        <svg
          width="39"
          height="43"
          viewBox="0 0 39 43"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="flex pt-3 pr-3 pb-4 pl-3 flex-col items-start rounded-lg w-fit "
        >
          <path
            d="M12 27V17H14V23.6L25.6 12L27 13.4L15.4 25H22V27H12Z"
            fill="black"
          />
        </svg>
        <div className="flex flex-col items-start w-fit">
          <div className="flex flex-col items-start w-full">
            <p className="text-[#000] font-nimbusSans text-base leading-6 w-fit">
              INCOMING TODAY
            </p>
          </div>
          <div className="flex flex-col items-start w-full">
            <p className="text-[#000] font-nimbusSans text-base font-bold leading-6 w-fit">
              {incomingToday}
            </p>
          </div>
        </div>
      </div>
      <div className="flex p-6 items-center gap-4 rounded-xl border border-[#E5E7EB] bg-[rgba(255,255,255,0.00)] shadow-[01px2px0rgba(0,0,0,0.05)] w-full">
        <svg
          width="39"
          height="43"
          viewBox="0 0 39 43"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="flex pt-3 pr-3 pb-4 pl-3 flex-col items-start rounded-lg w-fit "
        >
          <path
            d="M13.4 27L12 25.6L23.6 14H17V12H27V22H25V15.4L13.4 27Z"
            fill="black"
          />
        </svg>
        <div className="flex flex-col items-start w-fit">
          <div className="flex flex-col items-start w-full">
            <p className="text-[#000] font-nimbusSans text-base leading-6 w-fit">
              OUTGOING TODAY
            </p>
          </div>
          <div className="flex flex-col items-start w-full">
            <p className="text-[#000] font-nimbusSans text-base font-bold leading-6 w-fit">
              {outgoingToday}
            </p>
          </div>
        </div>
      </div>
      <div className="flex p-6 items-center gap-4 rounded-xl border border-[#E5E7EB] bg-[rgba(255,255,255,0.00)] shadow-[01px2px0rgba(0,0,0,0.05)] w-full">
        <svg
          width="44"
          height="48"
          viewBox="0 0 44 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="flex pt-3 pr-3 pb-4 pl-3 flex-col items-start rounded-lg bg-[#E2F5EA] w-fit "
        >
          <rect width="44" height="48" rx="8" fill="#E2F5EA" />
          <path
            d="M20.6 26.6L27.65 19.55L26.25 18.15L20.6 23.8L17.75 20.95L16.35 22.35L20.6 26.6ZM22 32C20.6167 32 19.3167 31.7375 18.1 31.2125C16.8833 30.6875 15.825 29.975 14.925 29.075C14.025 28.175 13.3125 27.1167 12.7875 25.9C12.2625 24.6833 12 23.3833 12 22C12 20.6167 12.2625 19.3167 12.7875 18.1C13.3125 16.8833 14.025 15.825 14.925 14.925C15.825 14.025 16.8833 13.3125 18.1 12.7875C19.3167 12.2625 20.6167 12 22 12C23.3833 12 24.6833 12.2625 25.9 12.7875C27.1167 13.3125 28.175 14.025 29.075 14.925C29.975 15.825 30.6875 16.8833 31.2125 18.1C31.7375 19.3167 32 20.6167 32 22C32 23.3833 31.7375 24.6833 31.2125 25.9C30.6875 27.1167 29.975 28.175 29.075 29.075C28.175 29.975 27.1167 30.6875 25.9 31.2125C24.6833 31.7375 23.3833 32 22 32ZM22 30C24.2333 30 26.125 29.225 27.675 27.675C29.225 26.125 30 24.2333 30 22C30 19.7667 29.225 17.875 27.675 16.325C26.125 14.775 24.2333 14 22 14C19.7667 14 17.875 14.775 16.325 16.325C14.775 17.875 14 19.7667 14 22C14 24.2333 14.775 26.125 16.325 27.675C17.875 29.225 19.7667 30 22 30Z"
            fill="#006B3E"
          />
        </svg>
        <div className="flex flex-col items-start w-fit">
          <div className="flex flex-col items-start w-full">
            <p className="text-[#000] font-nimbusSans text-base leading-6 w-fit">
              SUCCESS RATE
            </p>
          </div>
          <div className="flex flex-col items-start w-full">
            <p className="text-[#000] font-nimbusSans text-base font-bold leading-6 w-fit">
              {successRate}
            </p>
          </div>
        </div>
      </div>
      <div className="flex py-[30px] px-6 items-center gap-4 rounded-xl border border-[#E5E7EB] bg-[rgba(255,255,255,0.00)] shadow-[01px2px0rgba(0,0,0,0.05)] w-full">
        <svg
          width="44"
          height="48"
          viewBox="0 0 44 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="flex pt-3 pr-3 pb-4 pl-3 flex-col items-start rounded-lg w-fit "
        >
          <path
            d="M22 27C22.2833 27 22.5208 26.9042 22.7125 26.7125C22.9042 26.5208 23 26.2833 23 26C23 25.7167 22.9042 25.4792 22.7125 25.2875C22.5208 25.0958 22.2833 25 22 25C21.7167 25 21.4792 25.0958 21.2875 25.2875C21.0958 25.4792 21 25.7167 21 26C21 26.2833 21.0958 26.5208 21.2875 26.7125C21.4792 26.9042 21.7167 27 22 27ZM21 23H23V17H21V23ZM22 32C20.6167 32 19.3167 31.7375 18.1 31.2125C16.8833 30.6875 15.825 29.975 14.925 29.075C14.025 28.175 13.3125 27.1167 12.7875 25.9C12.2625 24.6833 12 23.3833 12 22C12 20.6167 12.2625 19.3167 12.7875 18.1C13.3125 16.8833 14.025 15.825 14.925 14.925C15.825 14.025 16.8833 13.3125 18.1 12.7875C19.3167 12.2625 20.6167 12 22 12C23.3833 12 24.6833 12.2625 25.9 12.7875C27.1167 13.3125 28.175 14.025 29.075 14.925C29.975 15.825 30.6875 16.8833 31.2125 18.1C31.7375 19.3167 32 20.6167 32 22C32 23.3833 31.7375 24.6833 31.2125 25.9C30.6875 27.1167 29.975 28.175 29.075 29.075C28.175 29.975 27.1167 30.6875 25.9 31.2125C24.6833 31.7375 23.3833 32 22 32ZM22 30C24.2333 30 26.125 29.225 27.675 27.675C29.225 26.125 30 24.2333 30 22C30 19.7667 29.225 17.875 27.675 16.325C26.125 14.775 24.2333 14 22 14C19.7667 14 17.875 14.775 16.325 16.325C14.775 17.875 14 19.7667 14 22C14 24.2333 14.775 26.125 16.325 27.675C17.875 29.225 19.7667 30 22 30Z"
            fill="black"
          />
        </svg>
        <div className="flex flex-col items-start w-fit">
          <div className="flex flex-col items-start w-full">
            <p className="text-[#000] font-nimbusSans text-base leading-6 w-fit">
              ERRORS &#40;24H&#41;
            </p>
          </div>
          <div className="flex flex-col items-start w-full">
            <p className="text-[#000] font-nimbusSans text-base font-bold leading-6 w-fit">
              {errors24h}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}