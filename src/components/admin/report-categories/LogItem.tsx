import { ReactNode } from "react";

type LogItemProps = {
  title: ReactNode;
  timestamp: ReactNode;
} & (
  | {
      /** Item dengan garis penghubung ke item berikutnya + dot berwarna */
      variant: "line";
      /** className warna dot, mis. "bg-[#0059BB]" atau "bg-[#737780]" */
      dotColor: string;
    }
  | {
      /** Item terakhir pada daftar, memakai ikon lingkaran merah, tanpa garis penghubung */
      variant: "end";
    }
);

export default function LogItem(props: LogItemProps) {
  if (props.variant === "line") {
    return (
      <div className="flex items-start gap-4 w-full">
        <div className="flex flex-col items-center w-fit h-full">
          <div className={`rounded-xl ${props.dotColor} w-3 h-2.5`}></div>
          <div className="bg-[#C3C6D1] w-px h-full"></div>
        </div>
        <div className="flex pb-4 flex-col items-start gap-1 w-fit h-full">
          <div className="flex flex-col items-start w-full">
            <p className="text-[#1A1C1E] font-iBMPlexSans text-sm font-medium leading-5 w-fit">
              {props.title}
            </p>
          </div>
          <div className="flex flex-col items-start w-full">
            <p className="text-[#43474F] font-iBMPlexSans text-xs font-semibold leading-4 w-fit tracking-[0.05em]">
              {props.timestamp}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-4 w-full">
      <svg
        width="12"
        height="40"
        viewBox="0 0 12 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex flex-col items-center w-fit h-full "
      >
        <rect width="12" height="12" rx="6" fill="#BA1A1A" />
      </svg>
      <div className="flex flex-col items-start gap-1 w-fit h-full">
        <div className="flex flex-col items-start w-full">
          <p className="text-[#1A1C1E] font-iBMPlexSans text-sm font-medium leading-5 w-fit">
            {props.title}
          </p>
        </div>
        <div className="flex flex-col items-start w-full">
          <p className="text-[#43474F] font-iBMPlexSans text-xs font-semibold leading-4 w-fit tracking-[0.05em]">
            {props.timestamp}
          </p>
        </div>
      </div>
    </div>
  );
}