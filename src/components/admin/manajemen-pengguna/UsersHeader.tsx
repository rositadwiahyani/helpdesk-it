export default function UsersHeader() {
  return (
    <>
      <div className="flex pb-2 flex-col items-start w-full">
        <div className="flex items-center gap-2 w-full">
          <div className="flex flex-col items-start w-fit">
            <p className="text-[#43474F] font-iBMPlexSans text-xs font-semibold leading-4 w-fit tracking-[0.05em]">
              Dashboard
            </p>
          </div>
          <svg
            width="5"
            height="8"
            viewBox="0 0 5 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="flex flex-col items-start w-fit "
          >
            <path
              d="M3.06667 4L0 0.933333L0.933333 0L4.93333 4L0.933333 8L0 7.06667L3.06667 4Z"
              fill="#43474F"
            />
          </svg>
          <div className="flex flex-col items-start w-fit">
            <p className="text-[#1A1C1E] font-iBMPlexSans text-xs font-semibold leading-4 w-fit tracking-[0.05em]">
              Manajemen Pengguna
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start gap-1 w-full">
        <div className="flex flex-col items-start w-full">
          <p className="text-[#001E40] font-iBMPlexSans text-[32px] font-semibold leading-10 w-full tracking-[-0.02em]">
            Daftar Pelapor
          </p>
        </div>
        <div className="flex flex-col items-start w-full">
          <p className="text-[#43474F] font-iBMPlexSans text-sm leading-5 w-full">
            Kelola data pengguna &#40;pelapor&#41; yang pernah membuat tiket
            di Helpdesk.
          </p>
        </div>
      </div>
    </>
  );
}