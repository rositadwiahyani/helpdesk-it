"use client";

import React from "react";

interface LogsToolbarProps {
  onFilterClick?: () => void;
  onRefreshClick?: () => void;
  isRefreshing?: boolean;
}

export default function LogsToolbar({
  onFilterClick,
  onRefreshClick,
  isRefreshing = false,
}: LogsToolbarProps) {
  return (
    <div className="flex items-start gap-3 w-fit">
      <div
        className="flex py-2 px-4 items-center gap-2 rounded-lg border border-[#E5E7EB] w-fit"
        onClick={onFilterClick}
        style={{ cursor: "pointer" }}
      >
        <svg
          width="18"
          height="12"
          viewBox="0 0 18 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="flex flex-col items-center w-fit "
        >
          <path
            d="M7 12V10H11V12H7ZM3 7V5H15V7H3ZM0 2V0H18V2H0Z"
            fill="black"
          />
        </svg>
        <p className="text-[#000] font-nimbusSans text-base leading-6 w-fit">
          Filter
        </p>
      </div>
      <div
        className="flex py-[9px] px-4 items-center gap-2 rounded-lg bg-[rgba(255,255,255,0.00)] shadow-[01px2px0rgba(0,0,0,0.05)] w-fit"
        onClick={isRefreshing ? undefined : onRefreshClick}
        style={{
          cursor: isRefreshing ? "wait" : "pointer",
          opacity: isRefreshing ? 0.6 : 1,
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`flex flex-col items-center w-fit ${
            isRefreshing ? "animate-spin" : ""
          }`}
        >
          <path
            d="M8 16C5.76667 16 3.875 15.225 2.325 13.675C0.775 12.125 0 10.2333 0 8C0 5.76667 0.775 3.875 2.325 2.325C3.875 0.775 5.76667 0 8 0C9.15 0 10.25 0.2375 11.3 0.7125C12.35 1.1875 13.25 1.86667 14 2.75V0H16V7H9V5H13.2C12.6667 4.06667 11.9375 3.33333 11.0125 2.8C10.0875 2.26667 9.08333 2 8 2C6.33333 2 4.91667 2.58333 3.75 3.75C2.58333 4.91667 2 6.33333 2 8C2 9.66667 2.58333 11.0833 3.75 12.25C4.91667 13.4167 6.33333 14 8 14C9.28333 14 10.4417 13.6333 11.475 12.9C12.5083 12.1667 13.2333 11.2 13.65 10H15.75C15.2833 11.7667 14.3333 13.2083 12.9 14.325C11.4667 15.4417 9.83333 16 8 16Z"
            fill="black"
          />
        </svg>
        <p className="text-[#000] font-nimbusSans text-base leading-6 w-fit">
          {isRefreshing ? "Refreshing..." : "Refresh Data"}
        </p>
      </div>
    </div>
  );
}