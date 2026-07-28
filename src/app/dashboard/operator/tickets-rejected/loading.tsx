import React from 'react';

export default function Loading() {
    return (
        <div className="w-full h-full text-slate-800 font-sans p-6 md:p-10 animate-pulse">
            <div className="mb-8 flex items-center justify-between">
                <div className="flex flex-col gap-2">
                    <div className="h-9 w-48 bg-slate-200 rounded-md"></div>
                    <div className="h-5 w-72 bg-slate-100 rounded-md"></div>
                </div>
            </div>

            {/* Table Toolbar Skeleton */}
            <div className="flex flex-col gap-4 w-full">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 w-full">
                    <div className="flex gap-2">
                        <div className="h-[34px] w-64 bg-slate-200 rounded"></div>
                        <div className="h-[34px] w-32 bg-slate-200 rounded"></div>
                    </div>
                    <div className="flex gap-2">
                        <div className="h-[34px] w-24 bg-slate-200 rounded"></div>
                        <div className="h-[34px] w-24 bg-slate-200 rounded"></div>
                        <div className="h-[34px] w-24 bg-slate-200 rounded"></div>
                    </div>
                </div>

                {/* Table Container Skeleton */}
                <div className="flex flex-col rounded-lg border border-slate-200 bg-white shadow-sm w-full overflow-hidden mt-2">
                    <div className="h-[52px] border-b border-slate-200 bg-[#F3F3F6]"></div>
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="flex gap-4 px-4 py-4 border-b border-slate-100 items-center overflow-hidden">
                            <div className="h-4 w-4 bg-slate-200 rounded shrink-0"></div>
                            <div className="h-4 w-20 bg-slate-200 rounded shrink-0"></div>
                            <div className="h-4 w-24 bg-slate-200 rounded shrink-0"></div>
                            <div className="h-4 w-full max-w-[200px] bg-slate-200 rounded"></div>
                            <div className="h-4 w-24 bg-slate-200 rounded shrink-0"></div>
                            <div className="h-[28px] w-32 bg-slate-200 rounded shrink-0"></div>
                            <div className="h-[28px] w-28 bg-slate-200 rounded shrink-0"></div>
                            <div className="h-[28px] w-32 bg-slate-200 rounded shrink-0"></div>
                            <div className="flex gap-2 ml-auto shrink-0">
                                <div className="h-[28px] w-24 bg-slate-200 rounded"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
