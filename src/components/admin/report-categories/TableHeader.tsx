import { useLanguage } from "@/context/LanguageContext";

export default function TableHeader() {
  const { t } = useLanguage();
  return (
    <div className="flex py-3 px-4 border-b border-b-[#C3C6D1] bg-[#F3F3F6] w-full items-center">
      <div className="flex-1 flex flex-col items-start min-w-0 pr-4">
        <p className="text-[#43474F] font-iBMPlexSans text-xs font-semibold leading-4 tracking-[0.05em]">
          {t('categories.name')}
        </p>
      </div>
      <div className="w-[140px] flex flex-col items-center shrink-0">
        <p className="text-[#43474F] font-iBMPlexSans text-xs font-semibold leading-4 tracking-[0.05em]">
          {t('categories.subcategories')}
        </p>
      </div>
      <div className="w-[140px] flex flex-col items-center shrink-0">
        <p className="text-[#43474F] font-iBMPlexSans text-xs font-semibold leading-4 tracking-[0.05em]">
          {t('common.status')}
        </p>
      </div>
      <div className="w-[80px] flex flex-col items-end shrink-0">
        <p className="text-[#43474F] font-iBMPlexSans text-xs font-semibold leading-4 tracking-[0.05em]">
          {t('categories.action')}
        </p>
      </div>
    </div>
  );
}