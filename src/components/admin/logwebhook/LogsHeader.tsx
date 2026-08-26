export default function LogsHeader() {
  return (
     <div className="flex flex-col items-start gap-2 w-full">
      <div className="flex flex-col items-start w-full">
        <p className="text-[#001E40] font-iBMPlexSans text-[32px] font-semibold leading-10 w-full tracking-[-0.02em]">
          Webhook Communication Logs
        </p>
      </div>
      <div className="flex flex-col items-start w-full">
        <p className="text-[#43474F] font-iBMPlexSans text-base leading-6 w-fit">
          Pantau aktivitas API secara real-time antara sistem helpdesk dan
          layanan eksternal.
        </p>
      </div>
    </div>
  );
}