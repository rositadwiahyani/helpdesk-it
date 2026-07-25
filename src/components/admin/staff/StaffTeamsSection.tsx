type StaffTab = "agents" | "teams" | "departments";

interface StaffTeamsSectionProps {
  onTabChange: (tab: StaffTab) => void;
}

export default function StaffTeamsSection({
  onTabChange,
}: StaffTeamsSectionProps) {
  return (
    <div className="flex flex-col items-start bg-linear-[0deg,#F9F9FC0%,#F9F9FC100%),#FF] min-w-screen min-h-screen relative">
      <div className="flex min-h-[1024px] pl-72 justify-center items-start w-full">
        <div className="flex pb-[266px] flex-col items-start w-full h-full">
          <div className="flex p-6 flex-col items-start gap-6 bg-[#F9F9FC] w-[992px]">
            <div className="flex flex-col items-start gap-1 w-full">
              <div className="flex flex-col items-start w-full">
                <p className="text-[#001E40] font-iBMPlexSans text-[32px] font-semibold leading-10 w-full tracking-[-0.02em]">
                  Manajemen Staff
                </p>
              </div>
              <div className="flex flex-col items-start w-full">
                <p className="text-[#43474F] font-iBMPlexSans text-base leading-6 w-full">
                  Kelola agen, tim, dan departemen pada sistem Helpdesk.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-8 border-b border-b-[#C3C6D1] w-full">
              <button
                onClick={() => onTabChange("agents")}
                className="cursor-pointer text-nowrap flex py-3 px-2 flex-col justify-center items-center w-fit"
              >
                <p className="text-[#43474F] font-iBMPlexSans text-sm font-medium leading-5 w-fit">
                  Agents
                </p>
              </button>
              <button
                onClick={() => onTabChange("teams")}
                className="cursor-pointer text-nowrap flex py-3 px-2 flex-col justify-center items-center w-fit relative"
              >
                <p className="text-[#001E40] font-iBMPlexSans text-sm font-bold leading-5 w-fit">
                  Teams
                </p>
                <div className="absolute bottom-0 bg-[#001E40] w-[59px] h-0.5"></div>
              </button>
              <button
                onClick={() => onTabChange("departments")}
                className="cursor-pointer text-nowrap flex py-3 px-2 flex-col justify-center items-center w-fit"
              >
                <p className="text-[#43474F] font-iBMPlexSans text-sm font-medium leading-5 w-fit">
                  Departments
                </p>
              </button>
            </div>
            <div className="flex flex-col items-start rounded-lg border border-[#C3C6D1] bg-[#FFF] shadow-[01px2px0rgba(0,0,0,0.05)] w-full overflow-hidden">
              <div className="flex pt-4 pr-4 pb-4 pl-4 justify-between items-center border-b border-b-[#C3C6D1] bg-[#FFF] w-full">
                <div className="flex items-center gap-2 w-fit">
                  <div className="flex flex-col items-start w-fit">
                    <p className="text-[#1A1C1E] font-iBMPlexSans text-xl font-medium leading-7 w-fit">
                      Teams
                    </p>
                  </div>
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="flex flex-col items-start w-fit "
                  >
                    <path
                      d="M6.75 11.25H8.25V6.75H6.75V11.25ZM7.5 5.25C7.7125 5.25 7.89062 5.17813 8.03438 5.03438C8.17813 4.89062 8.25 4.7125 8.25 4.5C8.25 4.2875 8.17813 4.10938 8.03438 3.96563C7.89062 3.82188 7.7125 3.75 7.5 3.75C7.2875 3.75 7.10938 3.82188 6.96562 3.96563C6.82187 4.10938 6.75 4.2875 6.75 4.5C6.75 4.7125 6.82187 4.89062 6.96562 5.03438C7.10938 5.17813 7.2875 5.25 7.5 5.25ZM7.5 15C6.4625 15 5.4875 14.8031 4.575 14.4094C3.6625 14.0156 2.86875 13.4812 2.19375 12.8062C1.51875 12.1312 0.984375 11.3375 0.590625 10.425C0.196875 9.5125 0 8.5375 0 7.5C0 6.4625 0.196875 5.4875 0.590625 4.575C0.984375 3.6625 1.51875 2.86875 2.19375 2.19375C2.86875 1.51875 3.6625 0.984375 4.575 0.590625C5.4875 0.196875 6.4625 0 7.5 0C8.5375 0 9.5125 0.196875 10.425 0.590625C11.3375 0.984375 12.1312 1.51875 12.8062 2.19375C13.4812 2.86875 14.0156 3.6625 14.4094 4.575C14.8031 5.4875 15 6.4625 15 7.5C15 8.5375 14.8031 9.5125 14.4094 10.425C14.0156 11.3375 13.4812 12.1312 12.8062 12.8062C12.1312 13.4812 11.3375 14.0156 10.425 14.4094C9.5125 14.8031 8.5375 15 7.5 15ZM7.5 13.5C9.175 13.5 10.5938 12.9188 11.7563 11.7563C12.9188 10.5938 13.5 9.175 13.5 7.5C13.5 5.825 12.9188 4.40625 11.7563 3.24375C10.5938 2.08125 9.175 1.5 7.5 1.5C5.825 1.5 4.40625 2.08125 3.24375 3.24375C2.08125 4.40625 1.5 5.825 1.5 7.5C1.5 9.175 2.08125 10.5938 3.24375 11.7563C4.40625 12.9188 5.825 13.5 7.5 13.5Z"
                      fill="#43474F"
                    />
                  </svg>
                </div>
                <div className="flex items-center gap-3 w-fit">
                  <div className="flex py-2 px-4 items-center gap-2 rounded bg-[#001E40] w-fit">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="flex flex-col items-center w-fit "
                    >
                      <path
                        d="M5 6.66667H0V5H5V0H6.66667V5H11.6667V6.66667H6.66667V11.6667H5V6.66667Z"
                        fill="white"
                      />
                    </svg>
                    <p className="text-[#FFF] font-iBMPlexSans text-sm font-bold leading-5 w-fit">
                      Add New Team
                    </p>
                  </div>
                  <div className="flex py-2 px-4 items-center gap-2 rounded border border-[#C3C6D1] w-fit">
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 17 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="flex flex-col items-center w-fit "
                    >
                      <path
                        d="M6.08333 16.6667L5.75 14C5.56944 13.9306 5.39931 13.8472 5.23958 13.75C5.07986 13.6528 4.92361 13.5486 4.77083 13.4375L2.29167 14.4792L0 10.5208L2.14583 8.89583C2.13194 8.79861 2.125 8.70486 2.125 8.61458C2.125 8.52431 2.125 8.43056 2.125 8.33333C2.125 8.23611 2.125 8.14236 2.125 8.05208C2.125 7.96181 2.13194 7.86806 2.14583 7.77083L0 6.14583L2.29167 2.1875L4.77083 3.22917C4.92361 3.11806 5.08333 3.01389 5.25 2.91667C5.41667 2.81944 5.58333 2.73611 5.75 2.66667L6.08333 0H10.6667L11 2.66667C11.1806 2.73611 11.3507 2.81944 11.5104 2.91667C11.6701 3.01389 11.8264 3.11806 11.9792 3.22917L14.4583 2.1875L16.75 6.14583L14.6042 7.77083C14.6181 7.86806 14.625 7.96181 14.625 8.05208C14.625 8.14236 14.625 8.23611 14.625 8.33333C14.625 8.43056 14.625 8.52431 14.625 8.61458C14.625 8.70486 14.6111 8.79861 14.5833 8.89583L16.7292 10.5208L14.4375 14.4792L11.9792 13.4375C11.8264 13.5486 11.6667 13.6528 11.5 13.75C11.3333 13.8472 11.1667 13.9306 11 14L10.6667 16.6667H6.08333ZM7.54167 15H9.1875L9.47917 12.7917C9.90972 12.6806 10.309 12.5174 10.6771 12.3021C11.0451 12.0868 11.3819 11.8264 11.6875 11.5208L13.75 12.375L14.5625 10.9583L12.7708 9.60417C12.8403 9.40972 12.8889 9.20486 12.9167 8.98958C12.9444 8.77431 12.9583 8.55556 12.9583 8.33333C12.9583 8.11111 12.9444 7.89236 12.9167 7.67708C12.8889 7.46181 12.8403 7.25694 12.7708 7.0625L14.5625 5.70833L13.75 4.29167L11.6875 5.16667C11.3819 4.84722 11.0451 4.57986 10.6771 4.36458C10.309 4.14931 9.90972 3.98611 9.47917 3.875L9.20833 1.66667H7.5625L7.27083 3.875C6.84028 3.98611 6.44097 4.14931 6.07292 4.36458C5.70486 4.57986 5.36806 4.84028 5.0625 5.14583L3 4.29167L2.1875 5.70833L3.97917 7.04167C3.90972 7.25 3.86111 7.45833 3.83333 7.66667C3.80556 7.875 3.79167 8.09722 3.79167 8.33333C3.79167 8.55556 3.80556 8.77083 3.83333 8.97917C3.86111 9.1875 3.90972 9.39583 3.97917 9.60417L2.1875 10.9583L3 12.375L5.0625 11.5C5.36806 11.8194 5.70486 12.0868 6.07292 12.3021C6.44097 12.5174 6.84028 12.6806 7.27083 12.7917L7.54167 15ZM8.41667 11.25C9.22222 11.25 9.90972 10.9653 10.4792 10.3958C11.0486 9.82639 11.3333 9.13889 11.3333 8.33333C11.3333 7.52778 11.0486 6.84028 10.4792 6.27083C9.90972 5.70139 9.22222 5.41667 8.41667 5.41667C7.59722 5.41667 6.90625 5.70139 6.34375 6.27083C5.78125 6.84028 5.5 7.52778 5.5 8.33333C5.5 9.13889 5.78125 9.82639 6.34375 10.3958C6.90625 10.9653 7.59722 11.25 8.41667 11.25Z"
                        fill="#1A1C1E"
                      />
                    </svg>
                    <p className="text-[#1A1C1E] font-iBMPlexSans text-sm font-bold leading-5 w-fit">
                      More
                    </p>
                    <svg
                      width="10"
                      height="7"
                      viewBox="0 0 10 7"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="flex flex-col items-center w-fit "
                    >
                      <path
                        d="M5 6.16667L0 1.16667L1.16667 0L5 3.83333L8.83333 0L10 1.16667L5 6.16667Z"
                        fill="#1A1C1E"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start w-full overflow-hidden">
                <div className="flex flex-col items-start bg-[#F3F3F6] w-full">
                  <div className="flex pr-4 justify-center items-center gap-4 w-full">
                    <svg
                      width="48"
                      height="49"
                      viewBox="0 0 48 49"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="flex pt-[17px] pr-4 pb-4 pl-4 flex-col items-start w-12 "
                    >
                      <rect
                        x="16.5"
                        y="17.34"
                        width="15"
                        height="15"
                        rx="1.5"
                        fill="white"
                        stroke="#C3C6D1"
                      />
                    </svg>
                    <div className="flex items-center gap-1 w-[203px]">
                      <p className="text-[#43474F] font-iBMPlexSans text-xs font-semibold leading-4 w-fit tracking-[0.05em]">
                        TEAM NAME
                      </p>
                      <svg
                        width="6"
                        height="11"
                        viewBox="0 0 6 11"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="flex flex-col items-start w-fit "
                      >
                        <path
                          d="M2.625 10.4417L0 7.81667L0.845833 6.97083L2.625 8.75L4.40417 6.97083L5.25 7.81667L2.625 10.4417ZM0.845833 3.47083L0 2.625L2.625 0L5.25 2.625L4.40417 3.47083L2.625 1.69167L0.845833 3.47083Z"
                          fill="#43474F"
                        />
                      </svg>
                    </div>
                    <div className="flex pl-4 items-center gap-1 w-[114px]">
                      <p className="text-[#43474F] font-iBMPlexSans text-xs font-semibold leading-4 w-fit tracking-[0.05em]">
                        STATUS
                      </p>
                      <svg
                        width="6"
                        height="11"
                        viewBox="0 0 6 11"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="flex flex-col items-start w-fit "
                      >
                        <path
                          d="M2.625 10.4417L0 7.81667L0.845833 6.97083L2.625 8.75L4.40417 6.97083L5.25 7.81667L2.625 10.4417ZM0.845833 3.47083L0 2.625L2.625 0L5.25 2.625L4.40417 3.47083L2.625 1.69167L0.845833 3.47083Z"
                          fill="#43474F"
                        />
                      </svg>
                    </div>
                    <div className="flex pl-4 items-center gap-1 w-[97px]">
                      <p className="text-[#43474F] font-iBMPlexSans text-xs font-semibold leading-4 w-fit tracking-[0.05em]">
                        MEMBERS
                      </p>
                      <svg
                        width="6"
                        height="11"
                        viewBox="0 0 6 11"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="flex flex-col items-start w-fit "
                      >
                        <path
                          d="M2.625 10.4417L0 7.81667L0.845833 6.97083L2.625 8.75L4.40417 6.97083L5.25 7.81667L2.625 10.4417ZM0.845833 3.47083L0 2.625L2.625 0L5.25 2.625L4.40417 3.47083L2.625 1.69167L0.845833 3.47083Z"
                          fill="#43474F"
                        />
                      </svg>
                    </div>
                    <div className="flex pl-4 items-center gap-1 w-[141px]">
                      <p className="text-[#43474F] font-iBMPlexSans text-xs font-semibold leading-4 w-fit tracking-[0.05em]">
                        TEAM LEAD
                      </p>
                      <svg
                        width="6"
                        height="11"
                        viewBox="0 0 6 11"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="flex flex-col items-start w-fit "
                      >
                        <path
                          d="M2.625 10.4417L0 7.81667L0.845833 6.97083L2.625 8.75L4.40417 6.97083L5.25 7.81667L2.625 10.4417ZM0.845833 3.47083L0 2.625L2.625 0L5.25 2.625L4.40417 3.47083L2.625 1.69167L0.845833 3.47083Z"
                          fill="#43474F"
                        />
                      </svg>
                    </div>
                    <div className="flex pl-4 items-center gap-1 w-[99px]">
                      <p className="text-[#43474F] font-iBMPlexSans text-xs font-semibold leading-4 w-fit tracking-[0.05em]">
                        CREATED
                      </p>
                      <svg
                        width="6"
                        height="11"
                        viewBox="0 0 6 11"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="flex flex-col items-start w-fit "
                      >
                        <path
                          d="M2.625 10.4417L0 7.81667L0.845833 6.97083L2.625 8.75L4.40417 6.97083L5.25 7.81667L2.625 10.4417ZM0.845833 3.47083L0 2.625L2.625 0L5.25 2.625L4.40417 3.47083L2.625 1.69167L0.845833 3.47083Z"
                          fill="#43474F"
                        />
                      </svg>
                    </div>
                    <div className="flex pl-4 items-center gap-1 w-32">
                      <p className="text-[#43474F] font-iBMPlexSans text-xs font-semibold leading-4 w-fit tracking-[0.05em]">
                        LAST UPDATED
                      </p>
                      <svg
                        width="6"
                        height="11"
                        viewBox="0 0 6 11"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="flex flex-col items-start w-fit "
                      >
                        <path
                          d="M2.625 10.4417L0 7.81667L0.845833 6.97083L2.625 8.75L4.40417 6.97083L5.25 7.81667L2.625 10.4417ZM0.845833 3.47083L0 2.625L2.625 0L5.25 2.625L4.40417 3.47083L2.625 1.69167L0.845833 3.47083Z"
                          fill="#43474F"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-start w-full">
                  <div className="w-full h-[61px] relative">
                    <svg
                      width="48"
                      height="61"
                      viewBox="0 0 48 61"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="flex pt-[23px] pr-4 pb-[21px] pl-4 flex-col items-start w-12 absolute left-0 top-0 "
                    >
                      <rect
                        x="16.5"
                        y="23.89"
                        width="15"
                        height="15"
                        rx="1.5"
                        fill="white"
                        stroke="#C3C6D1"
                      />
                    </svg>
                    <div className="flex pt-5 pr-4 pb-[21px] pl-4 flex-col items-start w-[235px] absolute left-12 top-0">
                      <p className="text-[#001E40] font-iBMPlexSans text-sm font-bold leading-5 w-fit">
                        Network Infrastructure Team
                      </p>
                    </div>
                    <div className="flex pt-5 pr-4 pb-[19px] pl-4 flex-col items-start w-[130px] absolute left-[283px] top-0">
                      <div className="flex py-px px-2 items-start rounded-sm bg-[#DCFCE7] w-fit">
                        <p className="text-[#166534] font-iBMPlexSans text-[11px] font-bold leading-5 w-fit">
                          ACTIVE
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start -space-x-2 w-[81px] absolute left-[428px] top-4">
                      <button className="cursor-pointer text-nowrap flex pt-0.5 pr-0 pb-[3px] pl-0 justify-center items-center shrink-0 rounded-xl border-2 border-[#FFF] bg-[#036] w-7 h-7">
                        <p className="text-[#FFF] font-iBMPlexSans text-[10px] font-bold leading-5 w-fit">
                          JD
                        </p>
                      </button>
                      <div className="flex flex-col items-start shrink-0 w-7 h-7">
                        <button className="cursor-pointer text-nowrap flex pt-0.5 pr-0 pb-[3px] pl-0 justify-center items-center shrink-0 rounded-xl border-2 border-[#FFF] bg-[#0070EA] w-7 h-7">
                          <p className="text-[#FFF] font-iBMPlexSans text-[10px] font-bold leading-5 w-fit">
                            AS
                          </p>
                        </button>
                      </div>
                      <div className="flex flex-col items-start shrink-0 w-7 h-7">
                        <button className="cursor-pointer text-nowrap flex pt-0.5 pr-0 pb-[3px] pl-0 justify-center items-center shrink-0 rounded-xl border-2 border-[#FFF] bg-[#E2E2E5] w-7 h-7">
                          <p className="text-[#1A1C1E] font-iBMPlexSans text-[10px] font-bold leading-5 w-fit">
                            +5
                          </p>
                        </button>
                      </div>
                    </div>
                    <div className="flex p-4 items-center gap-2 w-[157px] absolute left-[526px] top-0">
                      <div className="flex justify-center items-center shrink-0 rounded-xl bg-[#EEEEF0] w-6 h-6">
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 10 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="flex flex-col items-start w-fit "
                        >
                          <path
                            d="M4.66667 4.66667C4.025 4.66667 3.47569 4.43819 3.01875 3.98125C2.56181 3.52431 2.33333 2.975 2.33333 2.33333C2.33333 1.69167 2.56181 1.14236 3.01875 0.685417C3.47569 0.228472 4.025 0 4.66667 0C5.30833 0 5.85764 0.228472 6.31458 0.685417C6.77153 1.14236 7 1.69167 7 2.33333C7 2.975 6.77153 3.52431 6.31458 3.98125C5.85764 4.43819 5.30833 4.66667 4.66667 4.66667ZM0 9.33333V7.7C0 7.36944 0.0850694 7.06563 0.255208 6.78854C0.425347 6.51146 0.651389 6.3 0.933333 6.15417C1.53611 5.85278 2.14861 5.62674 2.77083 5.47604C3.39306 5.32535 4.025 5.25 4.66667 5.25C5.30833 5.25 5.94028 5.32535 6.5625 5.47604C7.18472 5.62674 7.79722 5.85278 8.4 6.15417C8.68194 6.3 8.90799 6.51146 9.07812 6.78854C9.24826 7.06563 9.33333 7.36944 9.33333 7.7V9.33333H0ZM1.16667 8.16667H8.16667V7.7C8.16667 7.59306 8.13993 7.49583 8.08646 7.40833C8.03299 7.32083 7.9625 7.25278 7.875 7.20417C7.35 6.94167 6.82014 6.74479 6.28542 6.61354C5.75069 6.48229 5.21111 6.41667 4.66667 6.41667C4.12222 6.41667 3.58264 6.48229 3.04792 6.61354C2.51319 6.74479 1.98333 6.94167 1.45833 7.20417C1.37083 7.25278 1.30035 7.32083 1.24688 7.40833C1.1934 7.49583 1.16667 7.59306 1.16667 7.7V8.16667ZM4.66667 3.5C4.9875 3.5 5.26215 3.38576 5.49062 3.15729C5.7191 2.92882 5.83333 2.65417 5.83333 2.33333C5.83333 2.0125 5.7191 1.73785 5.49062 1.50937C5.26215 1.2809 4.9875 1.16667 4.66667 1.16667C4.34583 1.16667 4.07118 1.2809 3.84271 1.50937C3.61424 1.73785 3.5 2.0125 3.5 2.33333C3.5 2.65417 3.61424 2.92882 3.84271 3.15729C4.07118 3.38576 4.34583 3.5 4.66667 3.5Z"
                            fill="#1A1C1E"
                          />
                        </svg>
                      </div>
                      <p className="text-[#1A1C1E] font-iBMPlexSans text-sm leading-5 w-fit">
                        Budi Setiawan
                      </p>
                    </div>
                    <div className="flex pt-5 pr-4 pb-[21px] pl-4 flex-col items-start w-[115px] absolute left-[683px] top-0">
                      <p className="text-[#43474F] font-iBMPlexSans text-sm leading-5 w-fit">
                        12 Jan 2024
                      </p>
                    </div>
                    <div className="flex pt-5 pr-4 pb-[21px] pl-4 flex-col items-start w-36 absolute left-[798px] top-0">
                      <p className="text-[#43474F] font-iBMPlexSans text-sm leading-5 w-fit">
                        24 Mei 2024
                      </p>
                    </div>
                  </div>
                  <div className="border-t border-t-[rgba(195,198,209,0.30)] bg-[#F8FAFC] w-full h-[61px] relative">
                    <svg
                      width="48"
                      height="61"
                      viewBox="0 0 48 61"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="flex pt-6 pr-4 pb-[21px] pl-4 flex-col items-start w-12 absolute left-0 top-0 "
                    >
                      <rect
                        x="16.5"
                        y="24.39"
                        width="15"
                        height="15"
                        rx="1.5"
                        fill="white"
                        stroke="#C3C6D1"
                      />
                    </svg>
                    <div className="flex py-[21px] px-4 flex-col items-start w-[235px] absolute left-12 top-0">
                      <p className="text-[#001E40] font-iBMPlexSans text-sm font-bold leading-5 w-fit">
                        Software Development &#40;SIAD&#41;
                      </p>
                    </div>
                    <div className="flex pt-5 pr-4 pb-[19px] pl-4 flex-col items-start w-[130px] absolute left-[283px] top-0">
                      <div className="flex py-px px-2 items-start rounded-sm bg-[#DCFCE7] w-fit">
                        <p className="text-[#166534] font-iBMPlexSans text-[11px] font-bold leading-5 w-fit">
                          ACTIVE
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start w-[81px] absolute left-[428px] top-[17px]">
                      <button className="cursor-pointer text-nowrap flex pt-0.5 pr-0 pb-[3px] pl-0 justify-center items-center shrink-0 rounded-xl border-2 border-[#FFF] bg-[#FFDAD6] w-7 h-7">
                        <p className="text-[#93000A] font-iBMPlexSans text-[10px] font-bold leading-5 w-fit">
                          RK
                        </p>
                      </button>
                      <div className="flex flex-col justify-center items-center w-5 h-7">
                        <button className="cursor-pointer text-nowrap flex pt-0.5 pr-0 pb-[3px] pl-0 justify-center items-center shrink-0 rounded-xl border-2 border-[#FFF] bg-[#E2E2E5] w-7 h-7">
                          <p className="text-[#1A1C1E] font-iBMPlexSans text-[10px] font-bold leading-5 w-fit">
                            +12
                          </p>
                        </button>
                      </div>
                    </div>
                    <div className="flex p-4 items-center gap-2 w-[157px] absolute left-[526px] top-px">
                      <div className="flex justify-center items-center shrink-0 rounded-xl bg-[#EEEEF0] w-6 h-6">
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 10 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="flex flex-col items-start w-fit "
                        >
                          <path
                            d="M4.66667 4.66667C4.025 4.66667 3.47569 4.43819 3.01875 3.98125C2.56181 3.52431 2.33333 2.975 2.33333 2.33333C2.33333 1.69167 2.56181 1.14236 3.01875 0.685417C3.47569 0.228472 4.025 0 4.66667 0C5.30833 0 5.85764 0.228472 6.31458 0.685417C6.77153 1.14236 7 1.69167 7 2.33333C7 2.975 6.77153 3.52431 6.31458 3.98125C5.85764 4.43819 5.30833 4.66667 4.66667 4.66667ZM0 9.33333V7.7C0 7.36944 0.0850694 7.06563 0.255208 6.78854C0.425347 6.51146 0.651389 6.3 0.933333 6.15417C1.53611 5.85278 2.14861 5.62674 2.77083 5.47604C3.39306 5.32535 4.025 5.25 4.66667 5.25C5.30833 5.25 5.94028 5.32535 6.5625 5.47604C7.18472 5.62674 7.79722 5.85278 8.4 6.15417C8.68194 6.3 8.90799 6.51146 9.07812 6.78854C9.24826 7.06563 9.33333 7.36944 9.33333 7.7V9.33333H0ZM1.16667 8.16667H8.16667V7.7C8.16667 7.59306 8.13993 7.49583 8.08646 7.40833C8.03299 7.32083 7.9625 7.25278 7.875 7.20417C7.35 6.94167 6.82014 6.74479 6.28542 6.61354C5.75069 6.48229 5.21111 6.41667 4.66667 6.41667C4.12222 6.41667 3.58264 6.48229 3.04792 6.61354C2.51319 6.74479 1.98333 6.94167 1.45833 7.20417C1.37083 7.25278 1.30035 7.32083 1.24688 7.40833C1.1934 7.49583 1.16667 7.59306 1.16667 7.7V8.16667ZM4.66667 3.5C4.9875 3.5 5.26215 3.38576 5.49062 3.15729C5.7191 2.92882 5.83333 2.65417 5.83333 2.33333C5.83333 2.0125 5.7191 1.73785 5.49062 1.50937C5.26215 1.2809 4.9875 1.16667 4.66667 1.16667C4.34583 1.16667 4.07118 1.2809 3.84271 1.50937C3.61424 1.73785 3.5 2.0125 3.5 2.33333C3.5 2.65417 3.61424 2.92882 3.84271 3.15729C4.07118 3.38576 4.34583 3.5 4.66667 3.5Z"
                            fill="#1A1C1E"
                          />
                        </svg>
                      </div>
                      <p className="text-[#1A1C1E] font-iBMPlexSans text-sm leading-5 w-fit">
                        Ratna Kusuma
                      </p>
                    </div>
                    <div className="flex py-[21px] px-4 flex-col items-start w-[115px] absolute left-[683px] top-0">
                      <p className="text-[#43474F] font-iBMPlexSans text-sm leading-5 w-fit">
                        05 Feb 2024
                      </p>
                    </div>
                    <div className="flex py-[21px] px-4 flex-col items-start w-36 absolute left-[798px] top-0">
                      <p className="text-[#43474F] font-iBMPlexSans text-sm leading-5 w-fit">
                        18 Mei 2024
                      </p>
                    </div>
                  </div>
                  <div className="border-t border-t-[rgba(195,198,209,0.30)] w-full h-[61px] relative">
                    <svg
                      width="48"
                      height="61"
                      viewBox="0 0 48 61"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="flex pt-6 pr-4 pb-[21px] pl-4 flex-col items-start w-12 absolute left-0 top-0 "
                    >
                      <rect
                        x="16.5"
                        y="24.39"
                        width="15"
                        height="15"
                        rx="1.5"
                        fill="white"
                        stroke="#C3C6D1"
                      />
                    </svg>
                    <div className="flex pt-[21px] pr-4 pb-5 pl-4 flex-col items-start w-[235px] absolute left-12 top-0">
                      <p className="text-[#001E40] font-iBMPlexSans text-sm font-bold leading-5 w-fit">
                        Multimedia &amp; Content Support
                      </p>
                    </div>
                    <div className="flex pt-5 pr-4 pb-[19px] pl-4 flex-col items-start w-[130px] absolute left-[283px] top-0">
                      <div className="flex py-px px-2 items-start rounded-sm bg-[#FEF9C3] w-fit">
                        <p className="text-[#854D0E] font-iBMPlexSans text-[11px] font-bold leading-5 w-fit">
                          MAINTENANCE
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start w-[81px] absolute left-[428px] top-[17px]">
                      <button className="cursor-pointer text-nowrap flex pt-0.5 pr-0 pb-[3px] pl-0 justify-center items-center shrink-0 rounded-xl border-2 border-[#FFF] bg-[#036] w-7 h-7">
                        <p className="text-[#FFF] font-iBMPlexSans text-[10px] font-bold leading-5 w-fit">
                          AN
                        </p>
                      </button>
                      <div className="flex flex-col justify-center items-center w-5 h-7">
                        <button className="cursor-pointer text-nowrap flex pt-0.5 pr-0 pb-[3px] pl-0 justify-center items-center shrink-0 rounded-xl border-2 border-[#FFF] bg-[#E2E2E5] w-7 h-7">
                          <p className="text-[#1A1C1E] font-iBMPlexSans text-[10px] font-bold leading-5 w-fit">
                            +3
                          </p>
                        </button>
                      </div>
                    </div>
                    <div className="flex p-4 items-center gap-2 w-[157px] absolute left-[526px] top-px">
                      <div className="flex justify-center items-center shrink-0 rounded-xl bg-[#EEEEF0] w-6 h-6">
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 10 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="flex flex-col items-start w-fit "
                        >
                          <path
                            d="M4.66667 4.66667C4.025 4.66667 3.47569 4.43819 3.01875 3.98125C2.56181 3.52431 2.33333 2.975 2.33333 2.33333C2.33333 1.69167 2.56181 1.14236 3.01875 0.685417C3.47569 0.228472 4.025 0 4.66667 0C5.30833 0 5.85764 0.228472 6.31458 0.685417C6.77153 1.14236 7 1.69167 7 2.33333C7 2.975 6.77153 3.52431 6.31458 3.98125C5.85764 4.43819 5.30833 4.66667 4.66667 4.66667ZM0 9.33333V7.7C0 7.36944 0.0850694 7.06563 0.255208 6.78854C0.425347 6.51146 0.651389 6.3 0.933333 6.15417C1.53611 5.85278 2.14861 5.62674 2.77083 5.47604C3.39306 5.32535 4.025 5.25 4.66667 5.25C5.30833 5.25 5.94028 5.32535 6.5625 5.47604C7.18472 5.62674 7.79722 5.85278 8.4 6.15417C8.68194 6.3 8.90799 6.51146 9.07812 6.78854C9.24826 7.06563 9.33333 7.36944 9.33333 7.7V9.33333H0ZM1.16667 8.16667H8.16667V7.7C8.16667 7.59306 8.13993 7.49583 8.08646 7.40833C8.03299 7.32083 7.9625 7.25278 7.875 7.20417C7.35 6.94167 6.82014 6.74479 6.28542 6.61354C5.75069 6.48229 5.21111 6.41667 4.66667 6.41667C4.12222 6.41667 3.58264 6.48229 3.04792 6.61354C2.51319 6.74479 1.98333 6.94167 1.45833 7.20417C1.37083 7.25278 1.30035 7.32083 1.24688 7.40833C1.1934 7.49583 1.16667 7.59306 1.16667 7.7V8.16667ZM4.66667 3.5C4.9875 3.5 5.26215 3.38576 5.49062 3.15729C5.7191 2.92882 5.83333 2.65417 5.83333 2.33333C5.83333 2.0125 5.7191 1.73785 5.49062 1.50937C5.26215 1.2809 4.9875 1.16667 4.66667 1.16667C4.34583 1.16667 4.07118 1.2809 3.84271 1.50937C3.61424 1.73785 3.5 2.0125 3.5 2.33333C3.5 2.65417 3.61424 2.92882 3.84271 3.15729C4.07118 3.38576 4.34583 3.5 4.66667 3.5Z"
                            fill="#1A1C1E"
                          />
                        </svg>
                      </div>
                      <p className="text-[#1A1C1E] font-iBMPlexSans text-sm leading-5 w-fit">
                        Agus Nurhadi
                      </p>
                    </div>
                    <div className="flex pt-[21px] pr-4 pb-5 pl-4 flex-col items-start w-[115px] absolute left-[683px] top-0">
                      <p className="text-[#43474F] font-iBMPlexSans text-sm leading-5 w-fit">
                        20 Mar 2024
                      </p>
                    </div>
                    <div className="flex pt-[21px] pr-4 pb-5 pl-4 flex-col items-start w-36 absolute left-[798px] top-0">
                      <p className="text-[#43474F] font-iBMPlexSans text-sm leading-5 w-fit">
                        20 Mar 2024
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex p-4 items-center gap-4 border-t border-t-[#C3C6D1] bg-[#F3F3F6] w-full">
                <div className="flex flex-col items-start w-fit">
                  <p className="text-[#43474F] font-iBMPlexSans text-[11px] font-bold leading-[18px] w-fit">
                    SELECT:
                  </p>
                </div>
                <button className="cursor-pointer text-nowrap flex flex-col justify-center items-center w-fit">
                  <p className="text-[#0059BB] font-iBMPlexSans text-[13px] font-medium leading-[18px] w-fit">
                    All
                  </p>
                </button>
                <button className="cursor-pointer text-nowrap flex flex-col justify-center items-center w-fit">
                  <p className="text-[#0059BB] font-iBMPlexSans text-[13px] font-medium leading-[18px] w-fit">
                    None
                  </p>
                </button>
                <button className="cursor-pointer text-nowrap flex flex-col justify-center items-center w-fit">
                  <p className="text-[#0059BB] font-iBMPlexSans text-[13px] font-medium leading-[18px] w-fit">
                    Toggle
                  </p>
                </button>
                <div className="flex min-w-[161.91px] pl-[555px] flex-col items-end w-full">
                  <div className="flex flex-col items-start w-fit">
                    <p className="text-[#43474F] font-iBMPlexSans text-[13px] font-medium leading-[18px] w-fit">
                      Menampilkan 3 dari 12 Tim
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex p-6 justify-center items-start gap-6 w-[992px]">
            <div className="flex p-4 items-center gap-4 rounded-lg border border-[#C3C6D1] bg-[#FFF] shadow-[01px2px0rgba(0,0,0,0.05)] w-[299px]">
              <div className="flex justify-center items-center shrink-0 rounded bg-[rgba(0,51,102,0.10)] w-12 h-12">
                <svg
                  width="30"
                  height="15"
                  viewBox="0 0 30 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex flex-col items-start w-fit "
                >
                  <path
                    d="M0 15V13.0312C0 12.1354 0.458333 11.4062 1.375 10.8438C2.29167 10.2812 3.5 10 5 10C5.27083 10 5.53125 10.0052 5.78125 10.0156C6.03125 10.026 6.27083 10.0521 6.5 10.0938C6.20833 10.5312 5.98958 10.9896 5.84375 11.4688C5.69792 11.9479 5.625 12.4479 5.625 12.9688V15H0ZM7.5 15V12.9688C7.5 12.3021 7.68229 11.6927 8.04688 11.1406C8.41146 10.5885 8.92708 10.1042 9.59375 9.6875C10.2604 9.27083 11.0573 8.95833 11.9844 8.75C12.9115 8.54167 13.9167 8.4375 15 8.4375C16.1042 8.4375 17.1198 8.54167 18.0469 8.75C18.974 8.95833 19.7708 9.27083 20.4375 9.6875C21.1042 10.1042 21.6146 10.5885 21.9688 11.1406C22.3229 11.6927 22.5 12.3021 22.5 12.9688V15H7.5ZM24.375 15V12.9688C24.375 12.4271 24.3073 11.9167 24.1719 11.4375C24.0365 10.9583 23.8333 10.5104 23.5625 10.0938C23.7917 10.0521 24.026 10.026 24.2656 10.0156C24.5052 10.0052 24.75 10 25 10C26.5 10 27.7083 10.276 28.625 10.8281C29.5417 11.3802 30 12.1146 30 13.0312V15H24.375ZM10.1562 12.5H19.875C19.6667 12.0833 19.0885 11.7188 18.1406 11.4062C17.1927 11.0938 16.1458 10.9375 15 10.9375C13.8542 10.9375 12.8073 11.0938 11.8594 11.4062C10.9115 11.7188 10.3438 12.0833 10.1562 12.5ZM5 8.75C4.3125 8.75 3.72396 8.50521 3.23438 8.01562C2.74479 7.52604 2.5 6.9375 2.5 6.25C2.5 5.54167 2.74479 4.94792 3.23438 4.46875C3.72396 3.98958 4.3125 3.75 5 3.75C5.70833 3.75 6.30208 3.98958 6.78125 4.46875C7.26042 4.94792 7.5 5.54167 7.5 6.25C7.5 6.9375 7.26042 7.52604 6.78125 8.01562C6.30208 8.50521 5.70833 8.75 5 8.75ZM25 8.75C24.3125 8.75 23.724 8.50521 23.2344 8.01562C22.7448 7.52604 22.5 6.9375 22.5 6.25C22.5 5.54167 22.7448 4.94792 23.2344 4.46875C23.724 3.98958 24.3125 3.75 25 3.75C25.7083 3.75 26.3021 3.98958 26.7812 4.46875C27.2604 4.94792 27.5 5.54167 27.5 6.25C27.5 6.9375 27.2604 7.52604 26.7812 8.01562C26.3021 8.50521 25.7083 8.75 25 8.75ZM15 7.5C13.9583 7.5 13.0729 7.13542 12.3438 6.40625C11.6146 5.67708 11.25 4.79167 11.25 3.75C11.25 2.6875 11.6146 1.79688 12.3438 1.07812C13.0729 0.359375 13.9583 0 15 0C16.0625 0 16.9531 0.359375 17.6719 1.07812C18.3906 1.79688 18.75 2.6875 18.75 3.75C18.75 4.79167 18.3906 5.67708 17.6719 6.40625C16.9531 7.13542 16.0625 7.5 15 7.5ZM15 5C15.3542 5 15.651 4.88021 15.8906 4.64062C16.1302 4.40104 16.25 4.10417 16.25 3.75C16.25 3.39583 16.1302 3.09896 15.8906 2.85938C15.651 2.61979 15.3542 2.5 15 2.5C14.6458 2.5 14.349 2.61979 14.1094 2.85938C13.8698 3.09896 13.75 3.39583 13.75 3.75C13.75 4.10417 13.8698 4.40104 14.1094 4.64062C14.349 4.88021 14.6458 5 15 5Z"
                    fill="#001E40"
                  />
                </svg>
              </div>
              <div className="flex flex-col items-start w-fit">
                <div className="flex flex-col items-start w-full">
                  <p className="text-[#43474F] font-iBMPlexSans text-xs font-semibold leading-4 w-fit tracking-[0.05em]">
                    TOTAL TEAMS
                  </p>
                </div>
                <div className="flex flex-col items-start w-full">
                  <p className="text-[#1A1C1E] font-iBMPlexSans text-2xl font-bold leading-8 w-fit tracking-[-0.01em]">
                    12 Teams
                  </p>
                </div>
              </div>
            </div>
            <div className="flex p-4 items-center gap-4 rounded-lg border border-[#C3C6D1] bg-[#FFF] shadow-[01px2px0rgba(0,0,0,0.05)] w-[299px]">
              <div className="flex justify-center items-center shrink-0 rounded bg-[rgba(0,112,234,0.10)] w-12 h-12">
                <svg
                  width="28"
                  height="23"
                  viewBox="0 0 28 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex flex-col items-start w-fit "
                >
                  <path
                    d="M0 22.5V19C0 18.3125 0.177083 17.6667 0.53125 17.0625C0.885417 16.4583 1.375 16 2 15.6875C3.0625 15.1458 4.26042 14.6875 5.59375 14.3125C6.92708 13.9375 8.39583 13.75 10 13.75C11.6042 13.75 13.0729 13.9375 14.4062 14.3125C15.7396 14.6875 16.9375 15.1458 18 15.6875C18.625 16 19.1146 16.4583 19.4688 17.0625C19.8229 17.6667 20 18.3125 20 19V22.5H0ZM2.5 20H17.5V19C17.5 18.7708 17.4427 18.5625 17.3281 18.375C17.2135 18.1875 17.0625 18.0417 16.875 17.9375C16.125 17.5625 15.1615 17.1875 13.9844 16.8125C12.8073 16.4375 11.4792 16.25 10 16.25C8.52083 16.25 7.19271 16.4375 6.01562 16.8125C4.83854 17.1875 3.875 17.5625 3.125 17.9375C2.9375 18.0417 2.78646 18.1875 2.67188 18.375C2.55729 18.5625 2.5 18.7708 2.5 19V20ZM10 12.5C8.625 12.5 7.44792 12.0104 6.46875 11.0312C5.48958 10.0521 5 8.875 5 7.5H4.6875C4.5 7.5 4.34896 7.44271 4.23438 7.32812C4.11979 7.21354 4.0625 7.0625 4.0625 6.875C4.0625 6.6875 4.11979 6.53646 4.23438 6.42188C4.34896 6.30729 4.5 6.25 4.6875 6.25H5C5 5.3125 5.22917 4.46875 5.6875 3.71875C6.14583 2.96875 6.75 2.375 7.5 1.9375V3.125C7.5 3.3125 7.55729 3.46354 7.67188 3.57812C7.78646 3.69271 7.9375 3.75 8.125 3.75C8.3125 3.75 8.46354 3.69271 8.57812 3.57812C8.69271 3.46354 8.75 3.3125 8.75 3.125V1.4375C8.9375 1.375 9.13542 1.32812 9.34375 1.29688C9.55208 1.26562 9.77083 1.25 10 1.25C10.2292 1.25 10.4479 1.26562 10.6562 1.29688C10.8646 1.32812 11.0625 1.375 11.25 1.4375V3.125C11.25 3.3125 11.3073 3.46354 11.4219 3.57812C11.5365 3.69271 11.6875 3.75 11.875 3.75C12.0625 3.75 12.2135 3.69271 12.3281 3.57812C12.4427 3.46354 12.5 3.3125 12.5 3.125V1.9375C13.25 2.375 13.8542 2.96875 14.3125 3.71875C14.7708 4.46875 15 5.3125 15 6.25H15.3125C15.5 6.25 15.651 6.30729 15.7656 6.42188C15.8802 6.53646 15.9375 6.6875 15.9375 6.875C15.9375 7.0625 15.8802 7.21354 15.7656 7.32812C15.651 7.44271 15.5 7.5 15.3125 7.5H15C15 8.875 14.5104 10.0521 13.5312 11.0312C12.5521 12.0104 11.375 12.5 10 12.5ZM10 10C10.6875 10 11.276 9.75521 11.7656 9.26562C12.2552 8.77604 12.5 8.1875 12.5 7.5H7.5C7.5 8.1875 7.74479 8.77604 8.23438 9.26562C8.72396 9.75521 9.3125 10 10 10ZM19.375 15L19.1875 14.0625C19.0625 14.0208 18.9427 13.974 18.8281 13.9219C18.7135 13.8698 18.6042 13.7917 18.5 13.6875L17.625 14L17 12.875L17.6875 12.25C17.6875 12.1875 17.6875 12.125 17.6875 12.0625C17.6875 12 17.6875 11.9375 17.6875 11.875C17.6875 11.8125 17.6875 11.75 17.6875 11.6875C17.6875 11.625 17.6875 11.5625 17.6875 11.5L17 10.875L17.625 9.75L18.5 10.0625C18.5833 9.97917 18.6875 9.90625 18.8125 9.84375C18.9375 9.78125 19.0625 9.72917 19.1875 9.6875L19.375 8.75H20.625L20.8125 9.6875C20.9375 9.72917 21.0625 9.78125 21.1875 9.84375C21.3125 9.90625 21.4167 9.97917 21.5 10.0625L22.375 9.75L23 10.875L22.3125 11.5C22.3125 11.5625 22.3125 11.625 22.3125 11.6875C22.3125 11.75 22.3125 11.8125 22.3125 11.875C22.3125 11.9375 22.3125 12 22.3125 12.0625C22.3125 12.125 22.3125 12.1875 22.3125 12.25L23 12.875L22.375 14L21.5 13.6875C21.3958 13.7917 21.2865 13.8698 21.1719 13.9219C21.0573 13.974 20.9375 14.0208 20.8125 14.0625L20.625 15H19.375ZM20 12.8125C20.25 12.8125 20.4688 12.7188 20.6562 12.5312C20.8438 12.3438 20.9375 12.125 20.9375 11.875C20.9375 11.625 20.8438 11.4062 20.6562 11.2188C20.4688 11.0312 20.25 10.9375 20 10.9375C19.75 10.9375 19.5312 11.0312 19.3438 11.2188C19.1562 11.4062 19.0625 11.625 19.0625 11.875C19.0625 12.125 19.1562 12.3438 19.3438 12.5312C19.5312 12.7188 19.75 12.8125 20 12.8125ZM22.25 8.75L22 7.4375C21.8125 7.375 21.6406 7.29688 21.4844 7.20312C21.3281 7.10938 21.1875 7 21.0625 6.875L19.75 7.3125L18.875 5.8125L19.9375 4.875C19.8958 4.77083 19.875 4.6875 19.875 4.625C19.875 4.5625 19.875 4.47917 19.875 4.375C19.875 4.27083 19.875 4.1875 19.875 4.125C19.875 4.0625 19.8958 3.97917 19.9375 3.875L18.875 2.9375L19.75 1.4375L21.0625 1.875C21.1875 1.75 21.3281 1.64062 21.4844 1.54688C21.6406 1.45312 21.8125 1.375 22 1.3125L22.25 0H24L24.25 1.3125C24.4375 1.375 24.6094 1.45312 24.7656 1.54688C24.9219 1.64062 25.0625 1.75 25.1875 1.875L26.5 1.4375L27.375 2.9375L26.3125 3.875C26.3542 3.97917 26.375 4.0625 26.375 4.125C26.375 4.1875 26.375 4.27083 26.375 4.375C26.375 4.47917 26.375 4.5625 26.375 4.625C26.375 4.6875 26.3542 4.77083 26.3125 4.875L27.375 5.8125L26.5 7.3125L25.1875 6.875C25.0625 7 24.9219 7.10938 24.7656 7.20312C24.6094 7.29688 24.4375 7.375 24.25 7.4375L24 8.75H22.25ZM23.125 5.9375C23.5625 5.9375 23.9323 5.78646 24.2344 5.48438C24.5365 5.18229 24.6875 4.8125 24.6875 4.375C24.6875 3.9375 24.5365 3.56771 24.2344 3.26562C23.9323 2.96354 23.5625 2.8125 23.125 2.8125C22.6875 2.8125 22.3177 2.96354 22.0156 3.26562C21.7135 3.56771 21.5625 3.9375 21.5625 4.375C21.5625 4.8125 21.7135 5.18229 22.0156 5.48438C22.3177 5.78646 22.6875 5.9375 23.125 5.9375Z"
                    fill="#0059BB"
                  />
                </svg>
              </div>
              <div className="flex flex-col items-start w-fit">
                <div className="flex flex-col items-start w-full">
                  <p className="text-[#43474F] font-iBMPlexSans text-xs font-semibold leading-4 w-fit tracking-[0.05em]">
                    TOTAL STAFF
                  </p>
                </div>
                <div className="flex flex-col items-start w-full">
                  <p className="text-[#1A1C1E] font-iBMPlexSans text-2xl font-bold leading-8 w-fit tracking-[-0.01em]">
                    48 Agents
                  </p>
                </div>
              </div>
            </div>
            <div className="flex p-4 items-center gap-4 rounded-lg border border-[#C3C6D1] bg-[#FFF] shadow-[01px2px0rgba(0,0,0,0.05)] w-[299px]">
              <div className="flex justify-center items-center shrink-0 rounded bg-[#DCFCE7] w-12 h-12">
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex flex-col items-start w-fit "
                >
                  <path
                    d="M12.5 25C10.7708 25 9.14583 24.6719 7.625 24.0156C6.10417 23.3594 4.78125 22.4688 3.65625 21.3438C2.53125 20.2188 1.64062 18.8958 0.984375 17.375C0.328125 15.8542 0 14.2292 0 12.5C0 10.7708 0.328125 9.14583 0.984375 7.625C1.64062 6.10417 2.53125 4.78125 3.65625 3.65625C4.78125 2.53125 6.10417 1.64062 7.625 0.984375C9.14583 0.328125 10.7708 0 12.5 0C13.8542 0 15.1354 0.197917 16.3438 0.59375C17.5521 0.989583 18.6667 1.54167 19.6875 2.25L17.875 4.09375C17.0833 3.59375 16.2396 3.20312 15.3438 2.92188C14.4479 2.64062 13.5 2.5 12.5 2.5C9.72917 2.5 7.36979 3.47396 5.42188 5.42188C3.47396 7.36979 2.5 9.72917 2.5 12.5C2.5 15.2708 3.47396 17.6302 5.42188 19.5781C7.36979 21.526 9.72917 22.5 12.5 22.5C15.2708 22.5 17.6302 21.526 19.5781 19.5781C21.526 17.6302 22.5 15.2708 22.5 12.5C22.5 12.125 22.4792 11.75 22.4375 11.375C22.3958 11 22.3333 10.6354 22.25 10.2812L24.2812 8.25C24.5104 8.91667 24.6875 9.60417 24.8125 10.3125C24.9375 11.0208 25 11.75 25 12.5C25 14.2292 24.6719 15.8542 24.0156 17.375C23.3594 18.8958 22.4688 20.2188 21.3438 21.3438C20.2188 22.4688 18.8958 23.3594 17.375 24.0156C15.8542 24.6719 14.2292 25 12.5 25ZM10.75 18.25L5.4375 12.9375L7.1875 11.1875L10.75 14.75L23.25 2.21875L25 3.96875L10.75 18.25Z"
                    fill="#166534"
                  />
                </svg>
              </div>
              <div className="flex flex-col items-start w-fit">
                <div className="flex flex-col items-start w-full">
                  <p className="text-[#43474F] font-iBMPlexSans text-xs font-semibold leading-4 w-fit tracking-[0.05em]">
                    ACTIVE LEADS
                  </p>
                </div>
                <div className="flex flex-col items-start w-full">
                  <p className="text-[#1A1C1E] font-iBMPlexSans text-2xl font-bold leading-8 w-fit tracking-[-0.01em]">
                    12 Leads
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex py-0 px-8 justify-between items-center border-b border-b-[#C3C6D1] bg-[#FFF] w-[992px] h-16">
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
            <div className="flex flex-col justify-center items-start gap-px w-[134px] h-[33px]">
              <div className="flex flex-col items-start w-[134px]">
                <p className="text-[#FFF] font-iBMPlexSans text-sm font-bold leading-[17.5px] w-fit tracking-[-0.025em]">
                  IT HELPDESK
                </p>
              </div>
              <div className="flex flex-col items-start opacity-80 w-[134px]">
                <p className="text-[#FFF] font-iBMPlexSans text-[10px] font-semibold leading-[15px] w-fit">
                  UNIVERSITAS DIPONEGORO
                </p>
              </div>
            </div>
            <div className="flex flex-col items-start w-fit"></div>
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
          <div className="flex pt-[459px] pr-6 pb-6 pl-6 flex-col items-start border-t border-t-[rgba(255,255,255,0.10)] w-full h-[514px]">
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