export default function PageHeader() {
  return (
    <div className="flex pr-[0] justify-between items-end w-full">
      <div className="flex flex-col items-start gap-1 w-fit">
        <div className="flex flex-col items-start w-full">
          <p className="text-[#001E40] font-iBMPlexSans text-[32px] font-semibold leading-10 w-fit tracking-[-0.025em]">
            Manajemen Kategori
          </p>
        </div>
        <div className="flex flex-col items-start w-full">
          <p className="text-[#43474F] font-iBMPlexSans text-sm leading-5 w-fit">
            Kelola hierarki kategori layanan &#40;Drag &amp; Drop untuk
            mengatur posisi&#41;.
          </p>
        </div>
      </div>
      <div className="flex items-center w-fit">
        <div className="flex py-2.5 px-4 items-center gap-2 rounded bg-[#0059BB] shadow-[01px2px0rgba(0,0,0,0.05)] w-fit">
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
          <p className="text-[#FFF] font-iBMPlexSans text-xs font-semibold leading-4 w-fit tracking-[0.05em]">
            Kategori Root
          </p>
        </div>
      </div>
    </div>
  );
}