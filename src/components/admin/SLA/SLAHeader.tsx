export default function SLAHeader() {
  return (
    <div className="flex flex-col items-start gap-1 w-full">
      <div className="flex flex-col items-start w-full">
        <p className="text-[#001E40] font-iBMPlexSans text-[32px] font-semibold leading-10 w-full tracking-[-0.02em]">
          Manajemen SLA
        </p>
      </div>
      <div className="flex flex-col items-start w-full">
        <p className="text-[#43474F] font-iBMPlexSans text-base leading-6 w-full">
          Atur target waktu respons dan resolusi untuk setiap tingkat prioritas tiket.
        </p>
      </div>
    </div>
  );
}