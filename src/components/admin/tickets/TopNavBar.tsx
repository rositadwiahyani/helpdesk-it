export default function HeaderTopnavbarShell() {
  return (
    <div className="flex pt-0 pr-8 pb-0 pl-8 justify-between items-center border-b border-b-[#C3C6D1] bg-[#FFF] min-w-screen min-h-screen absolute left-0 top-0">
      <div className="flex max-w-[672px] pr-56 justify-center items-center w-full">
        <div className="flex max-w-[448px] flex-col items-start w-full relative">
          <div className="flex pt-[9px] pr-12 pb-[9px] pl-10 flex-col items-start rounded border border-[#C3C6D1] bg-[#F3F3F6] w-full overflow-hidden">
            <div className="flex flex-col items-start w-full overflow-hidden">
              <p className="text-[#6B7280] font-iBMPlexSans text-sm w-full">
                Search tickets, users, or assets...
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
          <div className="flex pt-[9px] pr-3 pb-2.5 pl-0 items-center absolute right-0 w-fit h-[38px]">
            <p className="text-[#737780] font-liberationSerif text-[13px] leading-5 w-fit">
              Cmd+K
            </p>
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
  );
}