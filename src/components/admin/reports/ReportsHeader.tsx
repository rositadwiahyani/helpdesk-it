export default function ReportsHeader() {
  return (
    <div className="flex flex-col items-start gap-2 w-full">
      <div className="flex flex-col items-start w-full">
        <p className="text-[#001E40] font-iBMPlexSans text-[32px] font-semibold leading-10 w-full tracking-[-0.02em]">
          Laporan &amp; Ekspor Data
        </p>
      </div>
      <div className="flex flex-col items-start w-full">
        <p className="text-[#43474F] font-iBMPlexSans text-base leading-6 w-full">
          Unduh data operasional Helpdesk untuk keperluan laporan
          &#40;Format CSV&#x2F;Excel&#41;.
        </p>
      </div>
    </div>
  );
}