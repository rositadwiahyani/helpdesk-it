export default function LogsHeader() {
  return (
    <div className="flex flex-col items-start w-fit">
      <div className="flex flex-col items-start w-full">
        <p className="text-[#000] font-nimbusSans text-base leading-6 w-fit">
          Webhook Communication Logs
        </p>
      </div>
      <div className="flex flex-col items-start w-full">
        <p className="text-[#000] font-nimbusSans text-base leading-6 w-fit">
          Monitor real-time API activity between the helpdesk system and
          external services.
        </p>
      </div>
    </div>
  );
}