export default function SettingsHeader() {
  return (
    <div className="flex flex-col items-start gap-2 w-full">
      <div className="flex flex-col items-start w-full">
        <p className="text-[#001E40] font-iBMPlexSans text-[32px] font-semibold leading-10 w-full tracking-[-0.02em]">
          Konfigurasi Sistem
        </p>
      </div>
      <div className="flex flex-col items-start w-full">
        <p className="text-[#43474F] font-iBMPlexSans text-base leading-6 w-full">
          Atur teks otomatis dan parameter sistem lainnya untuk optimasi
          layanan.
        </p>
      </div>
    </div>
  );
}