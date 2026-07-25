type StaffTab = "agents" | "teams" | "departments";

interface StaffAgentsSectionProps {
  onTabChange: (tab: StaffTab) => void;
}

export default function StaffAgentsSection({
  onTabChange,
}: StaffAgentsSectionProps) {
  return (
    <div className="flex flex-col items-start bg-linear-[0deg,#F4F7FA0%,#F4F7FA100%),#FF] min-w-screen min-h-screen relative">
      <div className="flex min-h-[1024px] pl-72 justify-center items-start w-full">
        <div className="flex flex-col items-start w-full h-full">
          <div className="flex py-0 px-8 justify-between items-center border-b border-b-[#C3C6D1] bg-[#FFF] w-full h-16">
            <div className="flex max-w-[672px] pr-[154px] justify-center items-center w-full">
              <div className="flex max-w-[448px] flex-col items-start w-full relative">
                <div className="flex pt-[9px] pr-12 pb-[9px] pl-10 flex-col items-start rounded border border-[#C3C6D1] bg-[#F3F3F6] w-full overflow-hidden">
                  <div className="flex flex-col items-start w-full overflow-hidden">
                    <p className="text-[#6B7280] font-iBMPlexSans text-sm w-full">
                      Search users, teams, or departements...
                    </p>
                  </div>
                </div>
                <div className="flex pl-3 items-center absolute w-fit h-[38px]">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="flex flex-col items-start w-fit "
                  >
                    <path
                      d="M13.8333 15L8.58333 9.75C8.16667 10.0833 7.6875 10.3472 7.14583 10.5417C6.60417 10.7361 6.02778 10.8333 5.41667 10.8333C3.90278 10.8333 2.62153 10.309 1.57292 9.26042C0.524305 8.21181 0 6.93056 0 5.41667C0 3.90278 0.524305 2.62153 1.57292 1.57292C2.62153 0.524305 3.90278 0 5.41667 0C6.93056 0 8.21181 0.524305 9.26042 1.57292C10.309 2.62153 10.8333 3.90278 10.8333 5.41667C10.8333 6.02778 10.7361 6.60417 10.5417 7.14583C10.3472 7.6875 10.0833 8.16667 9.75 8.58333L15 13.8333L13.8333 15ZM5.41667 9.16667C6.45833 9.16667 7.34375 8.80208 8.07292 8.07292C8.80208 7.34375 9.16667 6.45833 9.16667 5.41667C9.16667 4.375 8.80208 3.48958 8.07292 2.76042C7.34375 2.03125 6.45833 1.66667 5.41667 1.66667C4.375 1.66667 3.48958 2.03125 2.76042 2.76042C2.03125 3.48958 1.66667 4.375 1.66667 5.41667C1.66667 6.45833 2.03125 7.34375 2.76042 8.07292C3.48958 8.80208 4.375 9.16667 5.41667 9.16667Z"
                      fill="#737780"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 w-fit">
              <div className="flex justify-center items-center rounded-xl w-10 h-10 relative">
                <svg
                  width="16"
                  height="20"
                  viewBox="0 0 16 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex flex-col items-center w-fit "
                >
                  <path
                    d="M0 17V15H2V8C2 6.61667 2.41667 5.3875 3.25 4.3125C4.08333 3.2375 5.16667 2.53333 6.5 2.2V1.5C6.5 1.08333 6.64583 0.729167 6.9375 0.4375C7.22917 0.145833 7.58333 0 8 0C8.41667 0 8.77083 0.145833 9.0625 0.4375C9.35417 0.729167 9.5 1.08333 9.5 1.5V2.2C10.8333 2.53333 11.9167 3.2375 12.75 4.3125C13.5833 5.3875 14 6.61667 14 8V15H16V17H0ZM8 20C7.45 20 6.97917 19.8042 6.5875 19.4125C6.19583 19.0208 6 18.55 6 18H10C10 18.55 9.80417 19.0208 9.4125 19.4125C9.02083 19.8042 8.55 20 8 20ZM4 15H12V8C12 6.9 11.6083 5.95833 10.825 5.175C10.0417 4.39167 9.1 4 8 4C6.9 4 5.95833 4.39167 5.175 5.175C4.39167 5.95833 4 6.9 4 8V15Z"
                    fill="#43474F"
                  />
                </svg>
                <div className="absolute right-2 top-2 rounded-xl bg-[#BA1A1A] w-2 h-2"></div>
              </div>
              <div className="flex justify-center items-center rounded-xl w-10 h-10">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex flex-col items-center w-fit "
                >
                  <path
                    d="M9.95 16C10.3 16 10.5958 15.8792 10.8375 15.6375C11.0792 15.3958 11.2 15.1 11.2 14.75C11.2 14.4 11.0792 14.1042 10.8375 13.8625C10.5958 13.6208 10.3 13.5 9.95 13.5C9.6 13.5 9.30417 13.6208 9.0625 13.8625C8.82083 14.1042 8.7 14.4 8.7 14.75C8.7 15.1 8.82083 15.3958 9.0625 15.6375C9.30417 15.8792 9.6 16 9.95 16ZM9.05 12.15H10.9C10.9 11.6 10.9625 11.1667 11.0875 10.85C11.2125 10.5333 11.5667 10.1 12.15 9.55C12.5833 9.11667 12.925 8.70417 13.175 8.3125C13.425 7.92083 13.55 7.45 13.55 6.9C13.55 5.96667 13.2083 5.25 12.525 4.75C11.8417 4.25 11.0333 4 10.1 4C9.15 4 8.37917 4.25 7.7875 4.75C7.19583 5.25 6.78333 5.85 6.55 6.55L8.2 7.2C8.28333 6.9 8.47083 6.575 8.7625 6.225C9.05417 5.875 9.5 5.7 10.1 5.7C10.6333 5.7 11.0333 5.84583 11.3 6.1375C11.5667 6.42917 11.7 6.75 11.7 7.1C11.7 7.43333 11.6 7.74583 11.4 8.0375C11.2 8.32917 10.95 8.6 10.65 8.85C9.91667 9.5 9.46667 9.99167 9.3 10.325C9.13333 10.6583 9.05 11.2667 9.05 12.15ZM10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20ZM10 18C12.2333 18 14.125 17.225 15.675 15.675C17.225 14.125 18 12.2333 18 10C18 7.76667 17.225 5.875 15.675 4.325C14.125 2.775 12.2333 2 10 2C7.76667 2 5.875 2.775 4.325 4.325C2.775 5.875 2 7.76667 2 10C2 12.2333 2.775 14.125 4.325 15.675C5.875 17.225 7.76667 18 10 18Z"
                    fill="#43474F"
                  />
                </svg>
              </div>
              <svg
                width="9"
                height="32"
                viewBox="0 0 9 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="flex py-0 px-1 flex-col items-start w-[9px] h-8 "
              >
                <rect x="4" width="1" height="32" fill="#C3C6D1" />
              </svg>
              <div className="flex pl-2 items-center gap-3 w-fit">
                <div className="flex flex-col items-start w-fit">
                  <div className="flex flex-col items-end w-full">
                    <p className="text-[#1A1C1E] font-iBMPlexSans text-xs font-semibold leading-4 w-fit tracking-[0.05em]">
                      Dr. Budi Santoso
                    </p>
                  </div>
                  <div className="flex flex-col items-end w-full">
                    <p className="text-[#43474F] font-iBMPlexSans text-[10px] leading-[15px] w-fit tracking-[0.05em]">
                      SUPER ADMIN
                    </p>
                  </div>
                </div>
                <img
                  src="/DrBudiSantoso.png"
                  className="rounded-xl border border-[#C3C6D1] w-9 h-9 overflow-hidden max-w-none"
                  alt="Dr. Budi Santoso"
                />
              </div>
            </div>
          </div>
          <div className="flex p-6 flex-col items-start gap-6 w-full">
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
                onClick={() => onTabChange("agents")}
                className="cursor-pointer text-nowrap flex py-3 px-6 flex-col justify-center items-center border-b-2 border-b-[#001E40] w-fit"
              >
                <p className="text-[#001E40] font-iBMPlexSans text-sm font-bold leading-5 w-fit">
                  Agents
                </p>
              </button>
              <button
                onClick={() => onTabChange("teams")}
                className="cursor-pointer text-nowrap flex py-3 px-6 flex-col justify-center items-center border-b-2 border-b-[rgba(0,0,0,0.00)] w-fit"
              >
                <p className="text-[#43474F] font-iBMPlexSans text-sm leading-5 w-fit">
                  Teams
                </p>
              </button>
              <button
                onClick={() => onTabChange("departments")}
                className="cursor-pointer text-nowrap flex py-3 px-6 flex-col justify-center items-center border-b-2 border-b-[rgba(0,0,0,0.00)] w-fit"
              >
                <p className="text-[#43474F] font-iBMPlexSans text-sm leading-5 w-fit">
                  Departments
                </p>
              </button>
            </div>
            <div className="flex justify-between items-center w-full">
              <div className="flex min-w-[300px] items-center gap-3 w-full">
                <div className="flex max-w-[320px] flex-col items-start w-80 relative">
                  <div className="flex pt-[9px] pr-4 pb-[9px] pl-9 justify-center items-start rounded border border-[#C3C6D1] bg-[#FFF] w-full overflow-hidden">
                    <div className="flex flex-col items-start w-full overflow-hidden">
                      <p className="text-[#6B7280] font-iBMPlexSans text-sm w-full">
                        Cari agen...
                      </p>
                    </div>
                  </div>
                  <svg
                    width="11"
                    height="20"
                    viewBox="0 0 11 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="flex flex-col items-start absolute left-3 top-[9px] w-fit h-5 "
                  >
                    <path
                      d="M9.68333 10.5L6.00833 6.825C5.71667 7.05833 5.38125 7.24306 5.00208 7.37917C4.62292 7.51528 4.21944 7.58333 3.79167 7.58333C2.73194 7.58333 1.83507 7.21632 1.10104 6.48229C0.367014 5.74826 0 4.85139 0 3.79167C0 2.73194 0.367014 1.83507 1.10104 1.10104C1.83507 0.367014 2.73194 0 3.79167 0C4.85139 0 5.74826 0.367014 6.48229 1.10104C7.21632 1.83507 7.58333 2.73194 7.58333 3.79167C7.58333 4.21944 7.51528 4.62292 7.37917 5.00208C7.24306 5.38125 7.05833 5.71667 6.825 6.00833L10.5 9.68333L9.68333 10.5ZM3.79167 6.41667C4.52083 6.41667 5.14062 6.16146 5.65104 5.65104C6.16146 5.14062 6.41667 4.52083 6.41667 3.79167C6.41667 3.0625 6.16146 2.44271 5.65104 1.93229C5.14062 1.42188 4.52083 1.16667 3.79167 1.16667C3.0625 1.16667 2.44271 1.42188 1.93229 1.93229C1.42188 2.44271 1.16667 3.0625 1.16667 3.79167C1.16667 4.52083 1.42188 5.14062 1.93229 5.65104C2.44271 6.16146 3.0625 6.41667 3.79167 6.41667Z"
                      fill="#43474F"
                    />
                  </svg>
                </div>
                <div className="flex py-2 px-4 flex-col justify-center items-start rounded border border-[#C3C6D1] bg-[#FFF] w-fit relative">
                  <div className="flex pt-[9px] pr-[9px] pb-[9px] pl-[155px] flex-col justify-center items-start absolute w-[185px] h-[38px] overflow-hidden">
                    <svg
                      width="21"
                      height="21"
                      viewBox="0 0 21 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="shrink-0 w-[21px] h-[21px] overflow-hidden relative "
                    >
                      <path
                        d="M6.30078 8.40002L10.5008 12.6L14.7008 8.40002"
                        stroke="#6B7280"
                        strokeWidth="1.575"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="flex pr-[26px] flex-col items-start w-fit">
                    <p className="text-[#1A1C1E] font-iBMPlexSans text-sm leading-5 w-fit">
                      Semua Departemen
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 w-fit">
                <div className="flex py-2.5 px-5 items-center gap-2 rounded bg-[#001E40] shadow-[01px2px0rgba(0,0,0,0.05)] w-fit">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="flex flex-col items-center w-fit "
                  >
                    <path d="M6 8H0V6H6V0H8V6H14V8H8V14H6V8Z" fill="white" />
                  </svg>
                  <p className="text-[#FFF] font-iBMPlexSans text-sm font-bold leading-5 w-fit">
                    Add New Agent
                  </p>
                </div>
                <div className="flex py-2.5 px-4 items-center gap-2 rounded border border-[#C3C6D1] bg-[#FFF] w-fit">
                  <svg
                    width="22"
                    height="20"
                    viewBox="0 0 22 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="flex flex-col items-center w-fit "
                  >
                    <path
                      d="M16.675 7L15.575 4.6L13.175 3.5L15.575 2.4L16.675 0L17.775 2.4L20.175 3.5L17.775 4.6L16.675 7ZM18.675 14L17.875 12.3L16.175 11.5L17.875 10.7L18.675 9L19.475 10.7L21.175 11.5L19.475 12.3L18.675 14ZM5.675 20L5.375 17.65C5.25833 17.6 5.13333 17.5333 5 17.45C4.86667 17.3667 4.75833 17.2833 4.675 17.2L2.475 18.15L0 13.8L1.875 12.4C1.875 12.2667 1.875 12.1333 1.875 12C1.875 11.8667 1.875 11.7333 1.875 11.6L0 10.2L2.475 5.85L4.675 6.8C4.75833 6.71667 4.86667 6.63333 5 6.55C5.13333 6.46667 5.25833 6.4 5.375 6.35L5.675 4H10.675L10.975 6.35C11.0917 6.4 11.2167 6.46667 11.35 6.55C11.4833 6.63333 11.5917 6.71667 11.675 6.8L13.875 5.85L16.35 10.2L14.475 11.6C14.475 11.7333 14.475 11.8667 14.475 12C14.475 12.1333 14.475 12.2667 14.475 12.4L16.35 13.8L13.875 18.15L11.675 17.2C11.5917 17.2833 11.4833 17.3667 11.35 17.45C11.2167 17.5333 11.0917 17.6 10.975 17.65L10.675 20H5.675ZM8.175 15C9.00833 15 9.71667 14.7083 10.3 14.125C10.8833 13.5417 11.175 12.8333 11.175 12C11.175 11.1667 10.8833 10.4583 10.3 9.875C9.71667 9.29167 9.00833 9 8.175 9C7.34167 9 6.63333 9.29167 6.05 9.875C5.46667 10.4583 5.175 11.1667 5.175 12C5.175 12.8333 5.46667 13.5417 6.05 14.125C6.63333 14.7083 7.34167 15 8.175 15ZM7.425 18H8.925L9.125 16.2C9.60833 16.0667 10.0208 15.8958 10.3625 15.6875C10.7042 15.4792 11.0417 15.2 11.375 14.85L13.025 15.6L13.725 14.35L12.275 13.25C12.4083 12.8667 12.475 12.45 12.475 12C12.475 11.55 12.4083 11.1333 12.275 10.75L13.725 9.65L13.025 8.4L11.375 9.15C11.0417 8.8 10.7042 8.52083 10.3625 8.3125C10.0208 8.10417 9.60833 7.93333 9.125 7.8L8.925 6H7.425L7.225 7.8C6.74167 7.93333 6.32917 8.10417 5.9875 8.3125C5.64583 8.52083 5.30833 8.8 4.975 9.15L3.325 8.4L2.625 9.65L4.075 10.75C3.94167 11.1333 3.87083 11.55 3.8625 12C3.85417 12.45 3.925 12.8667 4.075 13.25L2.625 14.35L3.325 15.6L4.975 14.85C5.30833 15.2 5.64583 15.4792 5.9875 15.6875C6.32917 15.8958 6.74167 16.0667 7.225 16.2L7.425 18Z"
                      fill="#1A1C1E"
                    />
                  </svg>
                  <p className="text-[#1A1C1E] font-iBMPlexSans text-sm font-bold leading-5 w-fit">
                    More
                  </p>
                  <svg
                    width="12"
                    height="8"
                    viewBox="0 0 12 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="flex flex-col items-center w-fit "
                  >
                    <path
                      d="M6 7.4L0 1.4L1.4 0L6 4.6L10.6 0L12 1.4L6 7.4Z"
                      fill="#1A1C1E"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start rounded-lg border border-[#C3C6D1] bg-[#FFF] shadow-[01px2px0rgba(0,0,0,0.05)] w-full overflow-hidden">
              <div className="flex flex-col items-start -space-y-px w-full">
                <div className="flex flex-col items-start border-b border-b-[#C3C6D1] bg-[#F3F3F6] w-full">
                  <div className="flex justify-center items-center w-full">
                    <svg
                      width="48"
                      height="53"
                      viewBox="0 0 48 53"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="flex pt-[19px] pr-4 pb-[17px] pl-4 flex-col items-center w-12 "
                    >
                      <rect
                        x="16.5"
                        y="19.83"
                        width="15"
                        height="15"
                        rx="1.5"
                        fill="white"
                        stroke="#C3C6D1"
                      />
                    </svg>
                    <div className="flex pl-4 items-center gap-1 w-[217px]">
                      <p className="text-[#43474F] font-iBMPlexSans text-xs font-semibold leading-4 w-fit tracking-[0.05em]">
                        NAME
                      </p>
                      <svg
                        width="10"
                        height="12"
                        viewBox="0 0 10 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="flex flex-col items-start w-fit "
                      >
                        <path
                          d="M2.33333 6.41667V2.23125L0.83125 3.73333L0 2.91667L2.91667 0L5.83333 2.91667L5.00208 3.73333L3.5 2.23125V6.41667H2.33333ZM6.41667 11.6667L3.5 8.75L4.33125 7.93333L5.83333 9.43542V5.25H7V9.43542L8.50208 7.93333L9.33333 8.75L6.41667 11.6667Z"
                          fill="#43474F"
                        />
                      </svg>
                    </div>
                    <div className="flex pl-8 items-center gap-1 w-[130px]">
                      <p className="text-[#43474F] font-iBMPlexSans text-xs font-semibold leading-4 w-fit tracking-[0.05em]">
                        USERNAME
                      </p>
                      <svg
                        width="10"
                        height="12"
                        viewBox="0 0 10 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="flex flex-col items-start w-fit "
                      >
                        <path
                          d="M2.33333 6.41667V2.23125L0.83125 3.73333L0 2.91667L2.91667 0L5.83333 2.91667L5.00208 3.73333L3.5 2.23125V6.41667H2.33333ZM6.41667 11.6667L3.5 8.75L4.33125 7.93333L5.83333 9.43542V5.25H7V9.43542L8.50208 7.93333L9.33333 8.75L6.41667 11.6667Z"
                          fill="#43474F"
                        />
                      </svg>
                    </div>
                    <div className="flex pt-[18px] pr-4 pb-[19px] pl-8 flex-col items-center w-[102px]">
                      <p className="text-[#43474F] font-iBMPlexSans text-xs font-semibold leading-4 w-fit tracking-[0.05em]">
                        STATUS
                      </p>
                    </div>
                    <div className="flex pl-4 items-center gap-1 w-[209px]">
                      <p className="text-[#43474F] font-iBMPlexSans text-xs font-semibold leading-4 w-fit tracking-[0.05em]">
                        DEPARTMENT
                      </p>
                      <svg
                        width="10"
                        height="12"
                        viewBox="0 0 10 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="flex flex-col items-start w-fit "
                      >
                        <path
                          d="M2.33333 6.41667V2.23125L0.83125 3.73333L0 2.91667L2.91667 0L5.83333 2.91667L5.00208 3.73333L3.5 2.23125V6.41667H2.33333ZM6.41667 11.6667L3.5 8.75L4.33125 7.93333L5.83333 9.43542V5.25H7V9.43542L8.50208 7.93333L9.33333 8.75L6.41667 11.6667Z"
                          fill="#43474F"
                        />
                      </svg>
                    </div>
                    <div className="flex pt-[18px] pr-4 pb-[19px] pl-8 flex-col items-start w-[124px]">
                      <p className="text-[#43474F] font-iBMPlexSans text-xs font-semibold leading-4 w-fit tracking-[0.05em]">
                        CREATED
                      </p>
                    </div>
                    <div className="flex pt-[18px] pr-4 pb-[19px] pl-4 flex-col items-start w-[113px]">
                      <p className="text-[#43474F] font-iBMPlexSans text-xs font-semibold leading-4 w-fit tracking-[0.05em]">
                        LAST LOGIN
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-start -space-y-px w-full">
                  <div className="flex justify-center items-center w-full">
                    <svg
                      width="48"
                      height="65"
                      viewBox="0 0 48 65"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="flex pt-[26px] pr-4 pb-[23px] pl-4 flex-col items-center w-12 "
                    >
                      <rect
                        x="16.5"
                        y="26.39"
                        width="15"
                        height="15"
                        rx="1.5"
                        fill="white"
                        stroke="#C3C6D1"
                      />
                    </svg>
                    <div className="flex pl-4 items-center gap-3 w-[217px]">
                      <button className="cursor-pointer text-nowrap flex pt-2 pr-0 pb-[9px] pl-0 justify-center items-center shrink-0 rounded-xl bg-[rgba(31,71,123,0.10)] w-8 h-8">
                        <p className="text-[#1F477B] font-iBMPlexSans text-xs font-bold leading-4 w-fit">
                          SA
                        </p>
                      </button>
                      <div className="flex flex-col items-start w-fit">
                        <p className="text-[#001E40] font-iBMPlexSans text-sm font-bold leading-5 w-fit">
                          System Administrator
                        </p>
                      </div>
                    </div>
                    <div className="flex pt-[22px] pr-4 pb-[23px] pl-8 flex-col items-start w-[146px]">
                      <p className="text-[#43474F] font-liberationSerif text-sm leading-5 w-fit">
                        admin
                      </p>
                    </div>
                    <div className="flex py-[21px] px-4 flex-col items-center w-[86px]">
                      <button className="cursor-pointer text-nowrap flex py-0.5 px-2 justify-center items-center rounded-sm bg-[#E8F5E9] w-fit">
                        <p className="text-[#2E7D32] font-iBMPlexSans text-[11px] font-bold leading-5 w-fit">
                          Active
                        </p>
                      </button>
                    </div>
                    <div className="flex py-[23px] px-4 flex-col items-start w-[225px]">
                      <p className="text-[#43474F] font-iBMPlexSans text-sm leading-5 w-fit">
                        Unassigned
                      </p>
                    </div>
                    <div className="flex py-[23px] px-4 flex-col items-start w-[108px]">
                      <p className="text-[#43474F] font-iBMPlexSans text-sm leading-5 w-fit">
                        20&#x2F;7&#x2F;2026
                      </p>
                    </div>
                    <div className="flex py-[23px] px-4 flex-col items-start w-[113px]">
                      <p className="text-[#43474F] font-iBMPlexSans text-sm leading-5 w-fit">
                        Never
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-center items-center border-t border-t-[rgba(195,198,209,0.30)] bg-[rgba(243,243,246,0.50)] w-full">
                    <svg
                      width="48"
                      height="65"
                      viewBox="0 0 48 65"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="flex pt-[26px] pr-4 pb-[23px] pl-4 flex-col items-center w-12 "
                    >
                      <rect
                        x="16.5"
                        y="26.39"
                        width="15"
                        height="15"
                        rx="1.5"
                        fill="white"
                        stroke="#C3C6D1"
                      />
                    </svg>
                    <div className="flex pl-4 items-center gap-3 w-[217px]">
                      <button className="cursor-pointer text-nowrap flex pt-2 pr-0 pb-[9px] pl-0 justify-center items-center shrink-0 rounded-xl bg-[#D8E2FF] w-8 h-8">
                        <p className="text-[#004493] font-iBMPlexSans text-xs font-bold leading-4 w-fit">
                          DK
                        </p>
                      </button>
                      <div className="flex flex-col items-start w-fit">
                        <p className="text-[#001E40] font-iBMPlexSans text-sm font-bold leading-5 w-fit">
                          Deni Keamanan
                        </p>
                      </div>
                    </div>
                    <div className="flex pt-[22px] pr-4 pb-[23px] pl-8 flex-col items-start w-[146px]">
                      <p className="text-[#43474F] font-liberationSerif text-sm leading-5 w-fit">
                        agent.keamanan
                      </p>
                    </div>
                    <div className="flex py-[21px] px-4 flex-col items-center w-[86px]">
                      <button className="cursor-pointer text-nowrap flex py-0.5 px-2 justify-center items-center rounded-sm bg-[#E8F5E9] w-fit">
                        <p className="text-[#2E7D32] font-iBMPlexSans text-[11px] font-bold leading-5 w-fit">
                          Active
                        </p>
                      </button>
                    </div>
                    <div className="flex py-[23px] px-4 flex-col items-start w-[225px]">
                      <p className="text-[#43474F] font-iBMPlexSans text-sm leading-5 w-fit">
                        Unit Keamanan Siber
                      </p>
                    </div>
                    <div className="flex py-[23px] px-4 flex-col items-start w-[108px]">
                      <p className="text-[#43474F] font-iBMPlexSans text-sm leading-5 w-fit">
                        19&#x2F;7&#x2F;2026
                      </p>
                    </div>
                    <div className="flex py-[23px] px-4 flex-col items-start w-[113px]">
                      <p className="text-[#43474F] font-iBMPlexSans text-sm leading-5 w-fit">
                        Never
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-center items-center border-t border-t-[rgba(195,198,209,0.30)] w-full">
                    <svg
                      width="48"
                      height="65"
                      viewBox="0 0 48 65"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="flex pt-[26px] pr-4 pb-[23px] pl-4 flex-col items-center w-12 "
                    >
                      <rect
                        x="16.5"
                        y="26.39"
                        width="15"
                        height="15"
                        rx="1.5"
                        fill="white"
                        stroke="#C3C6D1"
                      />
                    </svg>
                    <div className="flex pl-4 items-center gap-3 w-[217px]">
                      <button className="cursor-pointer text-nowrap flex pt-2 pr-0 pb-[9px] pl-0 justify-center items-center shrink-0 rounded-xl bg-[#E0E3E6] w-8 h-8">
                        <p className="text-[#43474A] font-iBMPlexSans text-xs font-bold leading-4 w-fit">
                          CJ
                        </p>
                      </button>
                      <div className="flex flex-col items-start w-fit">
                        <p className="text-[#001E40] font-iBMPlexSans text-sm font-bold leading-5 w-fit">
                          Citra Jaringan
                        </p>
                      </div>
                    </div>
                    <div className="flex pt-[22px] pr-4 pb-[23px] pl-8 flex-col items-start w-[146px]">
                      <p className="text-[#43474F] font-liberationSerif text-sm leading-5 w-fit">
                        agent.jaringan
                      </p>
                    </div>
                    <div className="flex py-[21px] px-4 flex-col items-center w-[86px]">
                      <button className="cursor-pointer text-nowrap flex py-0.5 px-2 justify-center items-center rounded-sm bg-[#E8F5E9] w-fit">
                        <p className="text-[#2E7D32] font-iBMPlexSans text-[11px] font-bold leading-5 w-fit">
                          Active
                        </p>
                      </button>
                    </div>
                    <div className="flex py-[23px] px-4 flex-col items-start w-[225px]">
                      <p className="text-[#43474F] font-iBMPlexSans text-sm leading-5 w-fit">
                        Unit Jaringan &amp; Infrastruktur
                      </p>
                    </div>
                    <div className="flex py-[23px] px-4 flex-col items-start w-[108px]">
                      <p className="text-[#43474F] font-iBMPlexSans text-sm leading-5 w-fit">
                        19&#x2F;7&#x2F;2026
                      </p>
                    </div>
                    <div className="flex py-[23px] px-4 flex-col items-start w-[113px]">
                      <p className="text-[#43474F] font-iBMPlexSans text-sm leading-5 w-fit">
                        Never
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-center items-center border-t border-t-[rgba(195,198,209,0.30)] bg-[rgba(243,243,246,0.50)] w-full">
                    <svg
                      width="48"
                      height="65"
                      viewBox="0 0 48 65"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="flex pt-[26px] pr-4 pb-[23px] pl-4 flex-col items-center w-12 "
                    >
                      <rect
                        x="16.5"
                        y="26.39"
                        width="15"
                        height="15"
                        rx="1.5"
                        fill="white"
                        stroke="#C3C6D1"
                      />
                    </svg>
                    <div className="flex pl-4 items-center gap-3 w-[217px]">
                      <button className="cursor-pointer text-nowrap flex pt-2 pr-0 pb-[9px] pl-0 justify-center items-center shrink-0 rounded-xl bg-[#FFDAD6] w-8 h-8">
                        <p className="text-[#93000A] font-iBMPlexSans text-xs font-bold leading-4 w-fit">
                          BH
                        </p>
                      </button>
                      <div className="flex flex-col items-start w-fit">
                        <p className="text-[#001E40] font-iBMPlexSans text-sm font-bold leading-5 w-fit">
                          Budi Hardware
                        </p>
                      </div>
                    </div>
                    <div className="flex pt-[22px] pr-4 pb-[23px] pl-8 flex-col items-start w-[146px]">
                      <p className="text-[#43474F] font-liberationSerif text-sm leading-5 w-fit">
                        agent.hardware
                      </p>
                    </div>
                    <div className="flex py-[21px] px-4 flex-col items-center w-[86px]">
                      <button className="cursor-pointer text-nowrap flex py-0.5 px-2 justify-center items-center rounded-sm bg-[#E8F5E9] w-fit">
                        <p className="text-[#2E7D32] font-iBMPlexSans text-[11px] font-bold leading-5 w-fit">
                          Active
                        </p>
                      </button>
                    </div>
                    <div className="flex py-[23px] px-4 flex-col items-start w-[225px]">
                      <p className="text-[#43474F] font-iBMPlexSans text-sm leading-5 w-fit">
                        Unit Hardware &amp; Perangkat
                      </p>
                    </div>
                    <div className="flex py-[23px] px-4 flex-col items-start w-[108px]">
                      <p className="text-[#43474F] font-iBMPlexSans text-sm leading-5 w-fit">
                        19&#x2F;7&#x2F;2026
                      </p>
                    </div>
                    <div className="flex py-[23px] px-4 flex-col items-start w-[113px]">
                      <p className="text-[#43474F] font-iBMPlexSans text-sm leading-5 w-fit">
                        Never
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-center items-center border-t border-t-[rgba(195,198,209,0.30)] w-full">
                    <svg
                      width="48"
                      height="65"
                      viewBox="0 0 48 65"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="flex pt-[26px] pr-4 pb-[23px] pl-4 flex-col items-center w-12 "
                    >
                      <rect
                        x="16.5"
                        y="26.39"
                        width="15"
                        height="15"
                        rx="1.5"
                        fill="white"
                        stroke="#C3C6D1"
                      />
                    </svg>
                    <div className="flex pl-4 items-center gap-3 w-[217px]">
                      <button className="cursor-pointer text-nowrap flex pt-2 pr-0 pb-[9px] pl-0 justify-center items-center shrink-0 rounded-xl bg-[#D5E3FF] w-8 h-8">
                        <p className="text-[#1F477B] font-iBMPlexSans text-xs font-bold leading-4 w-fit">
                          AS
                        </p>
                      </button>
                      <div className="flex flex-col items-start w-fit">
                        <p className="text-[#001E40] font-iBMPlexSans text-sm font-bold leading-5 w-fit">
                          Andi Software
                        </p>
                      </div>
                    </div>
                    <div className="flex pt-[22px] pr-4 pb-[23px] pl-8 flex-col items-start w-[146px]">
                      <p className="text-[#43474F] font-liberationSerif text-sm leading-5 w-fit">
                        agent.software
                      </p>
                    </div>
                    <div className="flex pt-[21px] pr-4 pb-5 pl-4 flex-col items-center w-[86px]">
                      <button className="cursor-pointer text-nowrap flex py-0.5 px-2 justify-center items-center rounded-sm bg-[#E8F5E9] w-fit">
                        <p className="text-[#2E7D32] font-iBMPlexSans text-[11px] font-bold leading-5 w-fit">
                          Active
                        </p>
                      </button>
                    </div>
                    <div className="flex pt-[23px] pr-4 pb-[22px] pl-4 flex-col items-start w-[225px]">
                      <p className="text-[#43474F] font-iBMPlexSans text-sm leading-5 w-fit">
                        Unit Software &amp; Aplikasi
                      </p>
                    </div>
                    <div className="flex pt-[23px] pr-4 pb-[22px] pl-4 flex-col items-start w-[108px]">
                      <p className="text-[#43474F] font-iBMPlexSans text-sm leading-5 w-fit">
                        19&#x2F;7&#x2F;2026
                      </p>
                    </div>
                    <div className="flex pt-[23px] pr-4 pb-[22px] pl-4 flex-col items-start w-[113px]">
                      <p className="text-[#43474F] font-iBMPlexSans text-sm leading-5 w-fit">
                        Never
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex p-4 justify-between items-center border-t border-t-[#C3C6D1] bg-[#F3F3F6] w-full">
                <div className="flex flex-col items-start w-fit">
                  <p className="text-[#001E40] font-iBMPlexSans text-sm leading-5 w-fit">
                    Showing 1 - 5 of 48 Agents
                  </p>
                </div>
                <div className="flex items-center gap-2 w-fit">
                  <div className="flex p-1 flex-col justify-center items-center opacity-50 w-fit">
                    <svg
                      width="8"
                      height="12"
                      viewBox="0 0 8 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="flex justify-center items-start w-fit "
                    >
                      <path
                        d="M6 12L0 6L6 0L7.4 1.4L2.8 6L7.4 10.6L6 12Z"
                        fill="#43474F"
                      />
                    </svg>
                  </div>
                  <button className="cursor-pointer text-nowrap flex flex-col justify-center items-center rounded-sm bg-[#001E40] w-8 h-8">
                    <p className="text-[#FFF] font-iBMPlexSans text-sm font-bold leading-5 w-fit">
                      1
                    </p>
                  </button>
                  <button className="cursor-pointer text-nowrap flex flex-col justify-center items-center rounded-sm w-8 h-8">
                    <p className="text-[#1A1C1E] font-iBMPlexSans text-sm leading-5 w-fit">
                      2
                    </p>
                  </button>
                  <button className="cursor-pointer text-nowrap flex flex-col justify-center items-center rounded-sm w-8 h-8">
                    <p className="text-[#1A1C1E] font-iBMPlexSans text-sm leading-5 w-fit">
                      3
                    </p>
                  </button>
                  <div className="flex py-0 px-1 flex-col items-start w-fit">
                    <p className="text-[#1A1C1E] font-iBMPlexSans text-sm leading-5 w-fit">
                      ...
                    </p>
                  </div>
                  <button className="cursor-pointer text-nowrap flex flex-col justify-center items-center rounded-sm w-8 h-8">
                    <p className="text-[#1A1C1E] font-iBMPlexSans text-sm leading-5 w-fit">
                      10
                    </p>
                  </button>
                  <div className="flex p-1 flex-col justify-center items-center w-fit">
                    <svg
                      width="8"
                      height="12"
                      viewBox="0 0 8 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="flex justify-center items-start w-fit "
                    >
                      <path
                        d="M4.6 6L0 1.4L1.4 0L7.4 6L1.4 12L0 10.6L4.6 6Z"
                        fill="#43474F"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between items-start absolute bg-[#001E40] w-72 h-full">
        <div className="flex pb-4 flex-col items-start w-full">
          <div className="flex p-6 items-center gap-3 w-full">
            <svg
              width="28"
              height="23"
              viewBox="0 0 28 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="flex flex-col items-start w-fit "
            >
              <path
                d="M13.75 22.5L5 17.75V10.25L0 7.5L13.75 0L27.5 7.5V17.5H25V8.875L22.5 10.25V17.75L13.75 22.5ZM13.75 12.125L22.3125 7.5L13.75 2.875L5.1875 7.5L13.75 12.125ZM13.75 19.6562L20 16.2812V11.5625L13.75 15L7.5 11.5625V16.2812L13.75 19.6562Z"
                fill="white"
              />
            </svg>
            <div className="flex flex-col justify-center items-start gap-px w-[134px] h-[38px]">
              <div className="flex flex-col items-start w-[134px]">
                <p className="text-[#FFF] font-iBMPlexSans text-sm font-bold leading-[17.5px] w-fit tracking-[-0.025em]">
                  IT HELPDESK
                </p>
              </div>
              <div className="flex flex-col items-start opacity-80 w-[134px]">
                <p className="text-[#FFF] font-iBMPlexSans text-[10px] font-semibold leading-5 w-fit">
                  UNIVERSITAS DIPONEGORO
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex py-0 px-2 flex-col items-start w-full h-full overflow-hidden">
          <div className="flex flex-col items-start gap-1 w-full">
            <div className="flex py-3 px-4 items-center gap-4 rounded-sm w-full">
              <svg
                width="15"
                height="17"
                viewBox="0 0 15 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="flex flex-col items-start w-fit "
              >
                <path
                  d="M1.83333 14.6667H4.58333V9.16667H10.0833V14.6667H12.8333V6.41667L7.33333 2.29167L1.83333 6.41667V14.6667ZM0 16.5V5.5L7.33333 0L14.6667 5.5V16.5H8.25V11H6.41667V16.5H0Z"
                  fill="white"
                  fillOpacity="0.7"
                />
              </svg>
              <div className="flex flex-col items-start w-fit">
                <p className="text-[rgba(255,255,255,0.70)] font-iBMPlexSans text-sm font-medium leading-5 w-fit">
                  Beranda
                </p>
              </div>
            </div>
            <div className="flex py-3 px-4 items-center gap-4 rounded-sm w-full">
              <svg
                width="19"
                height="15"
                viewBox="0 0 19 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="flex flex-col items-start w-fit "
              >
                <path
                  d="M9.16667 11.9167C9.42639 11.9167 9.6441 11.8288 9.81979 11.6531C9.99549 11.4774 10.0833 11.2597 10.0833 11C10.0833 10.7403 9.99549 10.5226 9.81979 10.3469C9.6441 10.1712 9.42639 10.0833 9.16667 10.0833C8.90694 10.0833 8.68924 10.1712 8.51354 10.3469C8.33785 10.5226 8.25 10.7403 8.25 11C8.25 11.2597 8.33785 11.4774 8.51354 11.6531C8.68924 11.8288 8.90694 11.9167 9.16667 11.9167ZM9.16667 8.25C9.42639 8.25 9.6441 8.16215 9.81979 7.98646C9.99549 7.81076 10.0833 7.59306 10.0833 7.33333C10.0833 7.07361 9.99549 6.8559 9.81979 6.68021C9.6441 6.50451 9.42639 6.41667 9.16667 6.41667C8.90694 6.41667 8.68924 6.50451 8.51354 6.68021C8.33785 6.8559 8.25 7.07361 8.25 7.33333C8.25 7.59306 8.33785 7.81076 8.51354 7.98646C8.68924 8.16215 8.90694 8.25 9.16667 8.25ZM9.16667 4.58333C9.42639 4.58333 9.6441 4.49549 9.81979 4.31979C9.99549 4.1441 10.0833 3.92639 10.0833 3.66667C10.0833 3.40694 9.99549 3.18924 9.81979 3.01354C9.6441 2.83785 9.42639 2.75 9.16667 2.75C8.90694 2.75 8.68924 2.83785 8.51354 3.01354C8.33785 3.18924 8.25 3.40694 8.25 3.66667C8.25 3.92639 8.33785 4.1441 8.51354 4.31979C8.68924 4.49549 8.90694 4.58333 9.16667 4.58333ZM16.5 14.6667H1.83333C1.32917 14.6667 0.897569 14.4872 0.538542 14.1281C0.179514 13.7691 0 13.3375 0 12.8333V9.16667C0.504167 9.16667 0.935764 8.98715 1.29479 8.62813C1.65382 8.2691 1.83333 7.8375 1.83333 7.33333C1.83333 6.82917 1.65382 6.39757 1.29479 6.03854C0.935764 5.67951 0.504167 5.5 0 5.5V1.83333C0 1.32917 0.179514 0.897569 0.538542 0.538542C0.897569 0.179514 1.32917 0 1.83333 0H16.5C17.0042 0 17.4358 0.179514 17.7948 0.538542C18.1538 0.897569 18.3333 1.32917 18.3333 1.83333V5.5C17.8292 5.5 17.3976 5.67951 17.0385 6.03854C16.6795 6.39757 16.5 6.82917 16.5 7.33333C16.5 7.8375 16.6795 8.2691 17.0385 8.62813C17.3976 8.98715 17.8292 9.16667 18.3333 9.16667V12.8333C18.3333 13.3375 18.1538 13.7691 17.7948 14.1281C17.4358 14.4872 17.0042 14.6667 16.5 14.6667ZM16.5 12.8333V10.4958C15.9347 10.1597 15.4878 9.71285 15.1594 9.15521C14.8309 8.59757 14.6667 7.99028 14.6667 7.33333C14.6667 6.67639 14.8309 6.0691 15.1594 5.51146C15.4878 4.95382 15.9347 4.50694 16.5 4.17083V1.83333H1.83333V4.17083C2.39861 4.50694 2.84549 4.95382 3.17396 5.51146C3.50243 6.0691 3.66667 6.67639 3.66667 7.33333C3.66667 7.99028 3.50243 8.59757 3.17396 9.15521C2.84549 9.71285 2.39861 10.1597 1.83333 10.4958V12.8333H16.5Z"
                  fill="white"
                  fillOpacity="0.7"
                />
              </svg>
              <div className="flex flex-col items-start w-fit">
                <p className="text-[rgba(255,255,255,0.70)] font-iBMPlexSans text-sm font-medium leading-5 w-fit">
                  Tickets
                </p>
              </div>
            </div>
            <div className="flex py-3 px-4 items-center gap-4 rounded-sm w-full">
              <svg
                width="21"
                height="15"
                viewBox="0 0 21 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="flex flex-col items-start w-fit "
              >
                <path
                  d="M0 14.6667V12.1C0 11.5806 0.133681 11.1031 0.401042 10.6677C0.668403 10.2323 1.02361 9.9 1.46667 9.67083C2.41389 9.19722 3.37639 8.84201 4.35417 8.60521C5.33194 8.3684 6.325 8.25 7.33333 8.25C8.34167 8.25 9.33472 8.3684 10.3125 8.60521C11.2903 8.84201 12.2528 9.19722 13.2 9.67083C13.6431 9.9 13.9983 10.2323 14.2656 10.6677C14.533 11.1031 14.6667 11.5806 14.6667 12.1V14.6667H0ZM16.5 14.6667V11.9167C16.5 11.2444 16.3128 10.599 15.9385 9.98021C15.5642 9.36146 15.0333 8.83055 14.3458 8.3875C15.125 8.47917 15.8583 8.63576 16.5458 8.85729C17.2333 9.07882 17.875 9.35 18.4708 9.67083C19.0208 9.97639 19.441 10.3163 19.7313 10.6906C20.0215 11.0649 20.1667 11.4736 20.1667 11.9167V14.6667H16.5ZM7.33333 7.33333C6.325 7.33333 5.46181 6.97431 4.74375 6.25625C4.02569 5.53819 3.66667 4.675 3.66667 3.66667C3.66667 2.65833 4.02569 1.79514 4.74375 1.07708C5.46181 0.359028 6.325 0 7.33333 0C8.34167 0 9.20486 0.359028 9.92292 1.07708C10.641 1.79514 11 2.65833 11 3.66667C11 4.675 10.641 5.53819 9.92292 6.25625C9.20486 6.97431 8.34167 7.33333 7.33333 7.33333ZM16.5 3.66667C16.5 4.675 16.141 5.53819 15.4229 6.25625C14.7049 6.97431 13.8417 7.33333 12.8333 7.33333C12.6653 7.33333 12.4514 7.31424 12.1917 7.27604C11.9319 7.23785 11.7181 7.19583 11.55 7.15C11.9625 6.66111 12.2795 6.11875 12.501 5.52292C12.7226 4.92708 12.8333 4.30833 12.8333 3.66667C12.8333 3.025 12.7226 2.40625 12.501 1.81042C12.2795 1.21458 11.9625 0.672222 11.55 0.183333C11.7639 0.106944 11.9778 0.0572917 12.1917 0.034375C12.4056 0.0114583 12.6194 0 12.8333 0C13.8417 0 14.7049 0.359028 15.4229 1.07708C16.141 1.79514 16.5 2.65833 16.5 3.66667ZM1.83333 12.8333H12.8333V12.1C12.8333 11.9319 12.7913 11.7792 12.7073 11.6417C12.6233 11.5042 12.5125 11.3972 12.375 11.3208C11.55 10.9083 10.7174 10.599 9.87708 10.3927C9.03681 10.1865 8.18889 10.0833 7.33333 10.0833C6.47778 10.0833 5.62986 10.1865 4.78958 10.3927C3.94931 10.599 3.11667 10.9083 2.29167 11.3208C2.15417 11.3972 2.0434 11.5042 1.95938 11.6417C1.87535 11.7792 1.83333 11.9319 1.83333 12.1V12.8333ZM7.33333 5.5C7.8375 5.5 8.2691 5.32049 8.62813 4.96146C8.98715 4.60243 9.16667 4.17083 9.16667 3.66667C9.16667 3.1625 8.98715 2.7309 8.62813 2.37188C8.2691 2.01285 7.8375 1.83333 7.33333 1.83333C6.82917 1.83333 6.39757 2.01285 6.03854 2.37188C5.67951 2.7309 5.5 3.1625 5.5 3.66667C5.5 4.17083 5.67951 4.60243 6.03854 4.96146C6.39757 5.32049 6.82917 5.5 7.33333 5.5Z"
                  fill="white"
                  fillOpacity="0.7"
                />
              </svg>
              <div className="flex flex-col items-start w-fit">
                <p className="text-[rgba(255,255,255,0.70)] font-iBMPlexSans text-sm font-medium leading-5 w-fit">
                  Manajemen Pengguna
                </p>
              </div>
            </div>
            <div className="flex py-3 px-4 items-center gap-4 rounded-sm w-full">
              <svg
                width="18"
                height="19"
                viewBox="0 0 18 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="flex flex-col items-start w-fit "
              >
                <path
                  d="M3.20833 8.25L8.25 0L13.2917 8.25H3.20833ZM13.2917 18.3333C12.1458 18.3333 11.1719 17.9323 10.3698 17.1302C9.56771 16.3281 9.16667 15.3542 9.16667 14.2083C9.16667 13.0625 9.56771 12.0885 10.3698 11.2865C11.1719 10.4844 12.1458 10.0833 13.2917 10.0833C14.4375 10.0833 15.4115 10.4844 16.2135 11.2865C17.0156 12.0885 17.4167 13.0625 17.4167 14.2083C17.4167 15.3542 17.0156 16.3281 16.2135 17.1302C15.4115 17.9323 14.4375 18.3333 13.2917 18.3333ZM0 17.875V10.5417H7.33333V17.875H0ZM13.2917 16.5C13.9333 16.5 14.4757 16.2785 14.9187 15.8354C15.3618 15.3924 15.5833 14.85 15.5833 14.2083C15.5833 13.5667 15.3618 13.0243 14.9187 12.5813C14.4757 12.1382 13.9333 11.9167 13.2917 11.9167C12.65 11.9167 12.1076 12.1382 11.6646 12.5813C11.2215 13.0243 11 13.5667 11 14.2083C11 14.85 11.2215 15.3924 11.6646 15.8354C12.1076 16.2785 12.65 16.5 13.2917 16.5ZM1.83333 16.0417H5.5V12.375H1.83333V16.0417ZM6.4625 6.41667H10.0375L8.25 3.52917L6.4625 6.41667Z"
                  fill="white"
                  fillOpacity="0.7"
                />
              </svg>
              <div className="flex flex-col items-start w-fit">
                <p className="text-[rgba(255,255,255,0.70)] font-iBMPlexSans text-sm font-medium leading-5 w-fit">
                  Kategori Laporan
                </p>
              </div>
            </div>
            <div className="flex py-3 px-4 items-center gap-4 rounded-sm w-full">
              <svg
                width="17"
                height="18"
                viewBox="0 0 17 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="flex flex-col items-start w-fit "
              >
                <path
                  d="M0 17.4167V15.5833H11V17.4167H0ZM5.17917 12.9708L0 7.79167L1.925 5.82083L7.15 11L5.17917 12.9708ZM11 7.15L5.82083 1.925L7.79167 0L12.9708 5.17917L11 7.15ZM15.2167 16.5L3.25417 4.5375L4.5375 3.25417L16.5 15.2167L15.2167 16.5Z"
                  fill="white"
                  fillOpacity="0.7"
                />
              </svg>
              <div className="flex flex-col items-start w-fit">
                <p className="text-[rgba(255,255,255,0.70)] font-iBMPlexSans text-sm font-medium leading-5 w-fit">
                  Manajemen SLA
                </p>
              </div>
            </div>
            <div className="flex py-3 px-4 items-center gap-4 rounded-sm bg-[#036] w-full">
              <svg
                width="19"
                height="19"
                viewBox="0 0 19 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="flex flex-col items-start w-fit "
              >
                <path
                  d="M1.83333 18.3333C1.32917 18.3333 0.897569 18.1538 0.538542 17.7948C0.179514 17.4358 0 17.0042 0 16.5V6.41667C0 5.9125 0.179514 5.4809 0.538542 5.12187C0.897569 4.76285 1.32917 4.58333 1.83333 4.58333H6.41667V1.83333C6.41667 1.32917 6.59618 0.897569 6.95521 0.538542C7.31424 0.179514 7.74583 0 8.25 0H10.0833C10.5875 0 11.0191 0.179514 11.3781 0.538542C11.7372 0.897569 11.9167 1.32917 11.9167 1.83333V4.58333H16.5C17.0042 4.58333 17.4358 4.76285 17.7948 5.12187C18.1538 5.4809 18.3333 5.9125 18.3333 6.41667V16.5C18.3333 17.0042 18.1538 17.4358 17.7948 17.7948C17.4358 18.1538 17.0042 18.3333 16.5 18.3333H1.83333ZM1.83333 16.5H16.5V6.41667H11.9167C11.9167 6.92083 11.7372 7.35243 11.3781 7.71146C11.0191 8.07049 10.5875 8.25 10.0833 8.25H8.25C7.74583 8.25 7.31424 8.07049 6.95521 7.71146C6.59618 7.35243 6.41667 6.92083 6.41667 6.41667H1.83333V16.5ZM3.66667 14.6667H9.16667V14.2542C9.16667 13.9944 9.0941 13.7538 8.94896 13.5323C8.80382 13.3108 8.60139 13.1389 8.34167 13.0167C8.03611 12.8792 7.72674 12.776 7.41354 12.7073C7.10035 12.6385 6.76806 12.6042 6.41667 12.6042C6.06528 12.6042 5.73299 12.6385 5.41979 12.7073C5.1066 12.776 4.79722 12.8792 4.49167 13.0167C4.23194 13.1389 4.02951 13.3108 3.88438 13.5323C3.73924 13.7538 3.66667 13.9944 3.66667 14.2542V14.6667ZM11 13.2917H14.6667V11.9167H11V13.2917ZM6.41667 11.9167C6.79861 11.9167 7.12326 11.783 7.39062 11.5156C7.65799 11.2483 7.79167 10.9236 7.79167 10.5417C7.79167 10.1597 7.65799 9.83507 7.39062 9.56771C7.12326 9.30035 6.79861 9.16667 6.41667 9.16667C6.03472 9.16667 5.71007 9.30035 5.44271 9.56771C5.17535 9.83507 5.04167 10.1597 5.04167 10.5417C5.04167 10.9236 5.17535 11.2483 5.44271 11.5156C5.71007 11.783 6.03472 11.9167 6.41667 11.9167ZM11 10.5417H14.6667V9.16667H11V10.5417ZM8.25 6.41667H10.0833V1.83333H8.25V6.41667Z"
                  fill="white"
                />
              </svg>
              <div className="flex flex-col items-start w-fit">
                <p className="text-[#FFF] font-iBMPlexSans text-sm font-bold leading-5 w-fit">
                  Manajemen Staff
                </p>
              </div>
            </div>
            <div className="flex py-3 px-4 items-center gap-4 rounded-sm w-full">
              <svg
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="flex flex-col items-start w-fit "
              >
                <path
                  d="M3.66667 12.8333H5.5V6.41667H3.66667V12.8333ZM7.33333 12.8333H9.16667V3.66667H7.33333V12.8333ZM11 12.8333H12.8333V9.16667H11V12.8333ZM1.83333 16.5C1.32917 16.5 0.897569 16.3205 0.538542 15.9615C0.179514 15.6024 0 15.1708 0 14.6667V1.83333C0 1.32917 0.179514 0.897569 0.538542 0.538542C0.897569 0.179514 1.32917 0 1.83333 0H14.6667C15.1708 0 15.6024 0.179514 15.9615 0.538542C16.3205 0.897569 16.5 1.32917 16.5 1.83333V14.6667C16.5 15.1708 16.3205 15.6024 15.9615 15.9615C15.6024 16.3205 15.1708 16.5 14.6667 16.5H1.83333ZM1.83333 14.6667H14.6667V1.83333H1.83333V14.6667ZM1.83333 1.83333V14.6667V1.83333Z"
                  fill="white"
                  fillOpacity="0.7"
                />
              </svg>
              <div className="flex flex-col items-start w-fit">
                <p className="text-[rgba(255,255,255,0.70)] font-iBMPlexSans text-sm font-medium leading-5 w-fit">
                  Laporan &amp; Ekspor
                </p>
              </div>
            </div>
            <div className="flex py-3 px-4 items-center gap-4 rounded-sm w-full">
              <svg
                width="21"
                height="21"
                viewBox="0 0 21 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="flex flex-col items-start w-fit "
              >
                <path
                  d="M10.0833 11.9167L8.25 10.0833L10.0833 8.25L11.9167 10.0833L10.0833 11.9167ZM8.13542 6.53125L5.84375 4.23958L10.0833 0L14.3229 4.23958L12.0312 6.53125L10.0833 4.58333L8.13542 6.53125ZM4.23958 14.3229L0 10.0833L4.23958 5.84375L6.53125 8.13542L4.58333 10.0833L6.53125 12.0312L4.23958 14.3229ZM15.9271 14.3229L13.6354 12.0312L15.5833 10.0833L13.6354 8.13542L15.9271 5.84375L20.1667 10.0833L15.9271 14.3229ZM10.0833 20.1667L5.84375 15.9271L8.13542 13.6354L10.0833 15.5833L12.0312 13.6354L14.3229 15.9271L10.0833 20.1667Z"
                  fill="white"
                  fillOpacity="0.7"
                />
              </svg>
              <div className="flex flex-col items-start w-fit">
                <p className="text-[rgba(255,255,255,0.70)] font-iBMPlexSans text-sm font-medium leading-5 w-fit">
                  Log API Webhook
                </p>
              </div>
            </div>
            <div className="flex py-3 px-4 items-center gap-4 rounded-sm w-full">
              <svg
                width="19"
                height="19"
                viewBox="0 0 19 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="flex flex-col items-start w-fit "
              >
                <path
                  d="M6.69167 18.3333L6.325 15.4C6.12639 15.3236 5.93924 15.2319 5.76354 15.125C5.58785 15.0181 5.41597 14.9035 5.24792 14.7812L2.52083 15.9271L0 11.5729L2.36042 9.78542C2.34514 9.67847 2.3375 9.57535 2.3375 9.47604C2.3375 9.37674 2.3375 9.27361 2.3375 9.16667C2.3375 9.05972 2.3375 8.9566 2.3375 8.85729C2.3375 8.75799 2.34514 8.65486 2.36042 8.54792L0 6.76042L2.52083 2.40625L5.24792 3.55208C5.41597 3.42986 5.59167 3.31528 5.775 3.20833C5.95833 3.10139 6.14167 3.00972 6.325 2.93333L6.69167 0H11.7333L12.1 2.93333C12.2986 3.00972 12.4858 3.10139 12.6615 3.20833C12.8372 3.31528 13.009 3.42986 13.1771 3.55208L15.9042 2.40625L18.425 6.76042L16.0646 8.54792C16.0799 8.65486 16.0875 8.75799 16.0875 8.85729C16.0875 8.9566 16.0875 9.05972 16.0875 9.16667C16.0875 9.27361 16.0875 9.37674 16.0875 9.47604C16.0875 9.57535 16.0722 9.67847 16.0417 9.78542L18.4021 11.5729L15.8813 15.9271L13.1771 14.7812C13.009 14.9035 12.8333 15.0181 12.65 15.125C12.4667 15.2319 12.2833 15.3236 12.1 15.4L11.7333 18.3333H6.69167ZM8.29583 16.5H10.1062L10.4271 14.0708C10.9007 13.9486 11.3399 13.7691 11.7448 13.5323C12.1497 13.2955 12.5201 13.009 12.8562 12.6729L15.125 13.6125L16.0187 12.0542L14.0479 10.5646C14.1243 10.3507 14.1778 10.1253 14.2083 9.88854C14.2389 9.65174 14.2542 9.41111 14.2542 9.16667C14.2542 8.92222 14.2389 8.6816 14.2083 8.44479C14.1778 8.20799 14.1243 7.98264 14.0479 7.76875L16.0187 6.27917L15.125 4.72083L12.8562 5.68333C12.5201 5.33194 12.1497 5.03785 11.7448 4.80104C11.3399 4.56424 10.9007 4.38472 10.4271 4.2625L10.1292 1.83333H8.31875L7.99792 4.2625C7.52431 4.38472 7.08507 4.56424 6.68021 4.80104C6.27535 5.03785 5.90486 5.32431 5.56875 5.66042L3.3 4.72083L2.40625 6.27917L4.37708 7.74583C4.30069 7.975 4.24722 8.20417 4.21667 8.43333C4.18611 8.6625 4.17083 8.90694 4.17083 9.16667C4.17083 9.41111 4.18611 9.64792 4.21667 9.87708C4.24722 10.1063 4.30069 10.3354 4.37708 10.5646L2.40625 12.0542L3.3 13.6125L5.56875 12.65C5.90486 13.0014 6.27535 13.2955 6.68021 13.5323C7.08507 13.7691 7.52431 13.9486 7.99792 14.0708L8.29583 16.5ZM9.25833 12.375C10.1444 12.375 10.9007 12.0618 11.5271 11.4354C12.1535 10.809 12.4667 10.0528 12.4667 9.16667C12.4667 8.28056 12.1535 7.52431 11.5271 6.89792C10.9007 6.27153 10.1444 5.95833 9.25833 5.95833C8.35694 5.95833 7.59688 6.27153 6.97813 6.89792C6.35938 7.52431 6.05 8.28056 6.05 9.16667C6.05 10.0528 6.35938 10.809 6.97813 11.4354C7.59688 12.0618 8.35694 12.375 9.25833 12.375Z"
                  fill="white"
                  fillOpacity="0.7"
                />
              </svg>
              <div className="flex flex-col items-start w-fit">
                <p className="text-[rgba(255,255,255,0.70)] font-iBMPlexSans text-sm font-medium leading-5 w-fit">
                  Pengaturan Sistem
                </p>
              </div>
            </div>
          </div>
          <div className="flex pt-[448px] pr-6 pb-6 pl-6 flex-col items-start border-t border-t-[rgba(255,255,255,0.10)] w-full h-[514px]">
            <div className="flex items-center gap-3 w-fit">
              <svg
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="flex flex-col items-center w-fit "
              >
                <path
                  d="M1.83333 16.5C1.32917 16.5 0.897569 16.3205 0.538542 15.9615C0.179514 15.6024 0 15.1708 0 14.6667V1.83333C0 1.32917 0.179514 0.897569 0.538542 0.538542C0.897569 0.179514 1.32917 0 1.83333 0H8.25V1.83333H1.83333V14.6667H8.25V16.5H1.83333ZM11.9167 12.8333L10.6562 11.5042L12.9937 9.16667H5.5V7.33333H12.9937L10.6562 4.99583L11.9167 3.66667L16.5 8.25L11.9167 12.8333Z"
                  fill="#F87171"
                />
              </svg>
              <p className="text-[#F87171] font-iBMPlexSans text-sm font-medium leading-5 w-fit">
                Logout
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}