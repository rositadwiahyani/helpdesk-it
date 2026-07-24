interface UsersStatisticsProps {
  totalUsers?: number;
  activeUsers?: number;
  blockedUsers?: number;
}

export default function UsersStatistics({
  totalUsers = 1240,
  activeUsers = 482,
  blockedUsers = 12,
}: UsersStatisticsProps) {
  return (
    <div className="flex justify-center items-start gap-6 w-full">
      <div className="flex p-4 items-center gap-4 rounded-lg border border-[#C3C6D1] bg-[#FFF] shadow-[01px2px0rgba(0,0,0,0.05)] w-[293px]">
        <div className="flex justify-center items-center shrink-0 rounded-xl bg-[#D8E2FF] w-12 h-12">
          <svg
            width="22"
            height="16"
            viewBox="0 0 22 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="flex flex-col items-start w-fit "
          >
            <path
              d="M0 16V13.2C0 12.6333 0.145833 12.1125 0.4375 11.6375C0.729167 11.1625 1.11667 10.8 1.6 10.55C2.63333 10.0333 3.68333 9.64583 4.75 9.3875C5.81667 9.12917 6.9 9 8 9C9.1 9 10.1833 9.12917 11.25 9.3875C12.3167 9.64583 13.3667 10.0333 14.4 10.55C14.8833 10.8 15.2708 11.1625 15.5625 11.6375C15.8542 12.1125 16 12.6333 16 13.2V16H0ZM18 16V13C18 12.2667 17.7958 11.5625 17.3875 10.8875C16.9792 10.2125 16.4 9.63333 15.65 9.15C16.5 9.25 17.3 9.42083 18.05 9.6625C18.8 9.90417 19.5 10.2 20.15 10.55C20.75 10.8833 21.2083 11.2542 21.525 11.6625C21.8417 12.0708 22 12.5167 22 13V16H18ZM8 8C6.9 8 5.95833 7.60833 5.175 6.825C4.39167 6.04167 4 5.1 4 4C4 2.9 4.39167 1.95833 5.175 1.175C5.95833 0.391667 6.9 0 8 0C9.1 0 10.0417 0.391667 10.825 1.175C11.6083 1.95833 12 2.9 12 4C12 5.1 11.6083 6.04167 10.825 6.825C10.0417 7.60833 9.1 8 8 8ZM18 4C18 5.1 17.6083 6.04167 16.825 6.825C16.0417 7.60833 15.1 8 14 8C13.8167 8 13.5833 7.97917 13.3 7.9375C13.0167 7.89583 12.7833 7.85 12.6 7.8C13.05 7.26667 13.3958 6.675 13.6375 6.025C13.8792 5.375 14 4.7 14 4C14 3.3 13.8792 2.625 13.6375 1.975C13.3958 1.325 13.05 0.733333 12.6 0.2C12.8333 0.116667 13.0667 0.0625 13.3 0.0375C13.5333 0.0125 13.7667 0 14 0C15.1 0 16.0417 0.391667 16.825 1.175C17.6083 1.95833 18 2.9 18 4ZM2 14H14V13.2C14 13.0167 13.9542 12.85 13.8625 12.7C13.7708 12.55 13.65 12.4333 13.5 12.35C12.6 11.9 11.6917 11.5625 10.775 11.3375C9.85833 11.1125 8.93333 11 8 11C7.06667 11 6.14167 11.1125 5.225 11.3375C4.30833 11.5625 3.4 11.9 2.5 12.35C2.35 12.4333 2.22917 12.55 2.1375 12.7C2.04583 12.85 2 13.0167 2 13.2V14ZM8 6C8.55 6 9.02083 5.80417 9.4125 5.4125C9.80417 5.02083 10 4.55 10 4C10 3.45 9.80417 2.97917 9.4125 2.5875C9.02083 2.19583 8.55 2 8 2C7.45 2 6.97917 2.19583 6.5875 2.5875C6.19583 2.97917 6 3.45 6 4C6 4.55 6.19583 5.02083 6.5875 5.4125C6.97917 5.80417 7.45 6 8 6Z"
              fill="#0059BB"
            />
          </svg>
        </div>
        <div className="flex flex-col items-start w-fit">
          <div className="flex flex-col items-start w-full">
            <p className="text-[#43474F] font-iBMPlexSans text-xs font-semibold leading-4 w-fit tracking-[0.05em]">
              Total Pelapor
            </p>
          </div>
          <div className="flex flex-col items-start w-full">
            <p className="text-[#1A1C1E] font-iBMPlexSans text-xl font-bold leading-7 w-fit">
              {totalUsers.toLocaleString('en-US')}
            </p>
          </div>
        </div>
      </div>
      <div className="flex p-4 items-center gap-4 rounded-lg border border-[#C3C6D1] bg-[#FFF] shadow-[01px2px0rgba(0,0,0,0.05)] w-[293px]">
        <div className="flex justify-center items-center shrink-0 rounded-xl bg-[#EFF6FF] w-12 h-12">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="flex flex-col items-start w-fit "
          >
            <path
              d="M9 18C6.7 18 4.69583 17.2375 2.9875 15.7125C1.27917 14.1875 0.3 12.2833 0.05 10H2.1C2.33333 11.7333 3.10417 13.1667 4.4125 14.3C5.72083 15.4333 7.25 16 9 16C10.95 16 12.6042 15.3208 13.9625 13.9625C15.3208 12.6042 16 10.95 16 9C16 7.05 15.3208 5.39583 13.9625 4.0375C12.6042 2.67917 10.95 2 9 2C7.85 2 6.775 2.26667 5.775 2.8C4.775 3.33333 3.93333 4.06667 3.25 5H6V7H0V1H2V3.35C2.85 2.28333 3.8875 1.45833 5.1125 0.875C6.3375 0.291667 7.63333 0 9 0C10.25 0 11.4208 0.2375 12.5125 0.7125C13.6042 1.1875 14.5542 1.82917 15.3625 2.6375C16.1708 3.44583 16.8125 4.39583 17.2875 5.4875C17.7625 6.57917 18 7.75 18 9C18 10.25 17.7625 11.4208 17.2875 12.5125C16.8125 13.6042 16.1708 14.5542 15.3625 15.3625C14.5542 16.1708 13.6042 16.8125 12.5125 17.2875C11.4208 17.7625 10.25 18 9 18ZM11.8 13.2L8 9.4V4H10V8.6L13.2 11.8L11.8 13.2Z"
              fill="#2563EB"
            />
          </svg>
        </div>
        <div className="flex flex-col items-start w-fit">
          <div className="flex flex-col items-start w-full">
            <p className="text-[#43474F] font-iBMPlexSans text-xs font-semibold leading-4 w-fit tracking-[0.05em]">
              Aktif 30 Hari Terakhir
            </p>
          </div>
          <div className="flex flex-col items-start w-full">
            <p className="text-[#1A1C1E] font-iBMPlexSans text-xl font-bold leading-7 w-fit">
              {activeUsers.toLocaleString('en-US')}
            </p>
          </div>
        </div>
      </div>
      <div className="flex p-4 items-center gap-4 rounded-lg border border-[#C3C6D1] bg-[#FFF] shadow-[01px2px0rgba(0,0,0,0.05)] w-[293px]">
        <div className="flex justify-center items-center shrink-0 rounded-xl bg-[#FFDAD6] w-12 h-12">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="flex flex-col items-start w-fit "
          >
            <path
              d="M10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20ZM10 18C10.9 18 11.7667 17.8542 12.6 17.5625C13.4333 17.2708 14.2 16.85 14.9 16.3L3.7 5.1C3.15 5.8 2.72917 6.56667 2.4375 7.4C2.14583 8.23333 2 9.1 2 10C2 12.2333 2.775 14.125 4.325 15.675C5.875 17.225 7.76667 18 10 18ZM16.3 14.9C16.85 14.2 17.2708 13.4333 17.5625 12.6C17.8542 11.7667 18 10.9 18 10C18 7.76667 17.225 5.875 15.675 4.325C14.125 2.775 12.2333 2 10 2C9.1 2 8.23333 2.14583 7.4 2.4375C6.56667 2.72917 5.8 3.15 5.1 3.7L16.3 14.9Z"
              fill="#BA1A1A"
            />
          </svg>
        </div>
        <div className="flex flex-col items-start w-fit">
          <div className="flex flex-col items-start w-full">
            <p className="text-[#43474F] font-iBMPlexSans text-xs font-semibold leading-4 w-fit tracking-[0.05em]">
              Akun Terblokir
            </p>
          </div>
          <div className="flex flex-col items-start w-full">
            <p className="text-[#1A1C1E] font-iBMPlexSans text-xl font-bold leading-7 w-fit">
              {blockedUsers.toLocaleString('en-US')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}