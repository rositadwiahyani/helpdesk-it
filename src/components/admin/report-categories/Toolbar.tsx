export default function Toolbar() {
  return (
    <div className="flex p-4 justify-between items-center rounded-lg border border-[#C3C6D1] bg-[#FFF] w-full">
      <div className="flex flex-col items-start w-fit relative">
        <div className="flex pt-[9px] pr-4 pb-[9px] pl-10 justify-center items-start rounded border border-[#C3C6D1] bg-[#FFF] w-64 overflow-hidden">
          <div className="flex flex-col items-start w-full overflow-hidden">
            <p className="text-[#6B7280] font-iBMPlexSans text-sm w-full">
              Cari kategori...
            </p>
          </div>
        </div>
        <svg
          width="14"
          height="18"
          viewBox="0 0 14 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="flex flex-col items-start absolute left-3 top-2.5 w-fit h-[18px] "
        >
          <path
            d="M5.25 9V7.5H8.25V9H5.25ZM2.25 5.25V3.75H11.25V5.25H2.25ZM0 1.5V0H13.5V1.5H0Z"
            fill="#43474F"
          />
        </svg>
      </div>
      <div className="flex items-center gap-2 w-fit">
        <div className="flex py-2 px-3 items-center gap-2 rounded border border-[#C3C6D1] w-fit">
          <svg
            width="7"
            height="14"
            viewBox="0 0 7 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="flex flex-col items-center w-fit "
          >
            <path
              d="M3.375 13.425L0 10.05L1.0875 8.9625L3.375 11.25L5.6625 8.9625L6.75 10.05L3.375 13.425ZM1.0875 4.4625L0 3.375L3.375 0L6.75 3.375L5.6625 4.4625L3.375 2.175L1.0875 4.4625Z"
              fill="#43474F"
            />
          </svg>
          <p className="text-[#43474F] font-iBMPlexSans text-xs font-semibold leading-4 w-fit tracking-[0.05em]">
            Expand All
          </p>
        </div>
        <div className="flex py-2 px-3 items-center gap-2 rounded border border-[#C3C6D1] w-fit">
          <svg
            width="7"
            height="12"
            viewBox="0 0 7 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="flex flex-col items-center w-fit "
          >
            <path
              d="M1.05 12L0 10.95L3.375 7.575L6.75 10.95L5.7 12L3.375 9.675L1.05 12ZM3.375 4.425L0 1.05L1.05 0L3.375 2.325L5.7 0L6.75 1.05L3.375 4.425Z"
              fill="#43474F"
            />
          </svg>
          <p className="text-[#43474F] font-iBMPlexSans text-xs font-semibold leading-4 w-fit tracking-[0.05em]">
            Collapse All
          </p>
        </div>
      </div>
    </div>
  );
}