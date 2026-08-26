export default function SLAToolbar() {
  return (
    <div className="flex p-6 flex-col items-start gap-1 border-b border-b-[#C3C6D1] bg-[#F9F9FC] w-full">
      <div className="flex flex-col items-start w-full">
        <p className="text-[#001E40] font-iBMPlexSans text-xl font-medium leading-7 w-full">
          Service Level Agreement &#40;SLA&#41; Config
        </p>
      </div>
      <div className="flex flex-col items-start w-full">
        <p className="text-[#43474F] font-iBMPlexSans text-sm leading-5 w-full">
          Durasi waktu maksimal &#40;dalam hitungan menit&#41;.
        </p>
      </div>
    </div>
  );
}