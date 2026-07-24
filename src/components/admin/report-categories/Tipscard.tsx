export default function TipsCard() {
  return (
    <div className="flex p-6 flex-col justify-between items-start rounded-lg bg-[#001E40] w-full overflow-hidden relative">
      <div className="flex flex-col items-start gap-2 w-full">
        <svg
          width="25"
          height="34"
          viewBox="0 0 25 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[25px] h-[33px] "
        >
          <path
            d="M12.5 33.3333C11.5833 33.3333 10.7986 33.0069 10.1458 32.3542C9.49306 31.7014 9.16667 30.9167 9.16667 30H15.8333C15.8333 30.9167 15.5069 31.7014 14.8542 32.3542C14.2014 33.0069 13.4167 33.3333 12.5 33.3333ZM5.83333 28.3333V25H19.1667V28.3333H5.83333ZM6.25 23.3333C4.33333 22.1944 2.8125 20.6667 1.6875 18.75C0.5625 16.8333 0 14.75 0 12.5C0 9.02778 1.21528 6.07639 3.64583 3.64583C6.07639 1.21528 9.02778 0 12.5 0C15.9722 0 18.9236 1.21528 21.3542 3.64583C23.7847 6.07639 25 9.02778 25 12.5C25 14.75 24.4375 16.8333 23.3125 18.75C22.1875 20.6667 20.6667 22.1944 18.75 23.3333H6.25ZM7.25 20H17.75C19 19.1111 19.9653 18.0139 20.6458 16.7083C21.3264 15.4028 21.6667 14 21.6667 12.5C21.6667 9.94444 20.7778 7.77778 19 6C17.2222 4.22222 15.0556 3.33333 12.5 3.33333C9.94444 3.33333 7.77778 4.22222 6 6C4.22222 7.77778 3.33333 9.94444 3.33333 12.5C3.33333 14 3.67361 15.4028 4.35417 16.7083C5.03472 18.0139 6 19.1111 7.25 20Z"
            fill="white"
          />
        </svg>
        <div className="flex pt-2 flex-col items-start w-full">
          <p className="text-[#FFF] font-iBMPlexSans text-xl font-medium leading-7 w-full">
            Tips Hierarki
          </p>
        </div>
        <div className="flex flex-col items-start w-full">
          <p className="text-[rgba(255,255,255,0.80)] font-iBMPlexSans text-sm leading-5 w-full">
            Struktur kategori yang baik membantu teknisi menemukan tiket
            lebih cepat. Gunakan maksimal 3 level kedalaman untuk
            menghindari kebingungan navigasi.
          </p>
        </div>
      </div>
      <div className="flex pt-6 flex-col items-start w-fit">
        <div className="flex pr-[222px] items-center gap-2 w-fit">
          <p className="text-[#D8E2FF] font-iBMPlexSans text-xs font-semibold leading-4 w-fit tracking-[0.05em]">
            Lihat Panduan Taksonomi
          </p>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="flex flex-col items-center w-fit "
          >
            <path
              d="M9.13125 6.75H0V5.25H9.13125L4.93125 1.05L6 0L12 6L6 12L4.93125 10.95L9.13125 6.75Z"
              fill="#D8E2FF"
            />
          </svg>
        </div>
      </div>
      <div className="absolute -right-16 -top-16 rounded-xl opacity-20 bg-[#0059BB] w-32 h-32"></div>
    </div>
  );
}