export default function Stats() {
  return (
    <div className="flex py-8 px-0 justify-center items-start gap-6 w-full">
      <div className="flex p-4 items-center gap-4 rounded-lg border border-[#C3C6D1] bg-[#FFF] w-[293px]">
        <div className="flex justify-center items-center shrink-0 rounded bg-[#D5E3FF] w-12 h-12">
          <svg
            width="19"
            height="20"
            viewBox="0 0 19 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="flex flex-col items-start w-fit "
          >
            <path
              d="M3.5 9L9 0L14.5 9H3.5ZM14.5 20C13.25 20 12.1875 19.5625 11.3125 18.6875C10.4375 17.8125 10 16.75 10 15.5C10 14.25 10.4375 13.1875 11.3125 12.3125C12.1875 11.4375 13.25 11 14.5 11C15.75 11 16.8125 11.4375 17.6875 12.3125C18.5625 13.1875 19 14.25 19 15.5C19 16.75 18.5625 17.8125 17.6875 18.6875C16.8125 19.5625 15.75 20 14.5 20ZM0 19.5V11.5H8V19.5H0ZM14.5 18C15.2 18 15.7917 17.7583 16.275 17.275C16.7583 16.7917 17 16.2 17 15.5C17 14.8 16.7583 14.2083 16.275 13.725C15.7917 13.2417 15.2 13 14.5 13C13.8 13 13.2083 13.2417 12.725 13.725C12.2417 14.2083 12 14.8 12 15.5C12 16.2 12.2417 16.7917 12.725 17.275C13.2083 17.7583 13.8 18 14.5 18ZM2 17.5H6V13.5H2V17.5ZM7.05 7H10.95L9 3.85L7.05 7Z"
              fill="#001E40"
            />
          </svg>
        </div>
        <div className="flex flex-col items-start w-fit">
          <div className="flex flex-col items-start w-full">
            <p className="text-[#43474F] font-iBMPlexSans text-xs font-semibold leading-4 w-fit tracking-[0.05em]">
              TOTAL KATEGORI
            </p>
          </div>
          <div className="flex flex-col items-start w-full">
            <p className="text-[#001E40] font-iBMPlexSans text-xl font-medium leading-7 w-fit">
              24
            </p>
          </div>
        </div>
      </div>
      <div className="flex p-4 items-center gap-4 rounded-lg border border-[#C3C6D1] bg-[#FFF] w-[293px]">
        <div className="flex justify-center items-center shrink-0 rounded bg-[#D8E2FF] w-12 h-12">
          <svg
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="flex flex-col items-start w-fit "
          >
            <path
              d="M13 18V15H9V5H7V8H0V0H7V3H13V0H20V8H13V5H11V13H13V10H20V18H13ZM2 2V6V2ZM15 12V16V12ZM15 2V6V2ZM15 6H18V2H15V6ZM15 16H18V12H15V16ZM2 6H5V2H2V6Z"
              fill="#0059BB"
            />
          </svg>
        </div>
        <div className="flex flex-col items-start w-fit">
          <div className="flex flex-col items-start w-full">
            <p className="text-[#43474F] font-iBMPlexSans text-xs font-semibold leading-4 w-fit tracking-[0.05em]">
              SUB-KATEGORI
            </p>
          </div>
          <div className="flex flex-col items-start w-full">
            <p className="text-[#001E40] font-iBMPlexSans text-xl font-medium leading-7 w-fit">
              18
            </p>
          </div>
        </div>
      </div>
      <div className="flex p-4 items-center gap-4 rounded-lg border border-[#C3C6D1] bg-[#FFF] w-[293px]">
        <div className="flex justify-center items-center shrink-0 rounded bg-[#E0E3E6] w-12 h-12">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="flex flex-col items-start w-fit "
          >
            <path
              d="M8.6 14.6L15.65 7.55L14.25 6.15L8.6 11.8L5.75 8.95L4.35 10.35L8.6 14.6ZM10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20ZM10 18C12.2333 18 14.125 17.225 15.675 15.675C17.225 14.125 18 12.2333 18 10C18 7.76667 17.225 5.875 15.675 4.325C14.125 2.775 12.2333 2 10 2C7.76667 2 5.875 2.775 4.325 4.325C2.775 5.875 2 7.76667 2 10C2 12.2333 2.775 14.125 4.325 15.675C5.875 17.225 7.76667 18 10 18Z"
              fill="#1B1F21"
            />
          </svg>
        </div>
        <div className="flex flex-col items-start w-fit">
          <div className="flex flex-col items-start w-full">
            <p className="text-[#43474F] font-iBMPlexSans text-xs font-semibold leading-4 w-fit tracking-[0.05em]">
              STATUS AKTIF
            </p>
          </div>
          <div className="flex flex-col items-start w-full">
            <p className="text-[#001E40] font-iBMPlexSans text-xl font-medium leading-7 w-fit">
              22
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}