export default function UsersHeader() {
  return (
    <>
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