import React from 'react';

export default function Loading() {
    return (
        <div className="flex flex-col gap-6 p-6 md:p-10 animate-pulse">
            <div className="flex flex-col gap-2 mb-2">
                <div className="h-8 w-64 bg-slate-200 rounded-md"></div>
                <div className="h-4 w-96 bg-slate-100 rounded-md"></div>
            </div>

            {/* Statistik Hari Ini Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between h-[140px]">
                        <div>
                            <div className="h-3 w-40 bg-slate-200 rounded mb-4 uppercase"></div>
                            <div className="h-10 w-16 bg-slate-200 rounded"></div>
                        </div>
                        <div className="h-3 w-40 bg-slate-100 rounded mt-4"></div>
                    </div>
                ))}
            </div>

            {/* Operator Statistics Skeleton wrapper */}
            <div className="flex flex-col gap-6">
                {/* Date Filter Skeleton */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-wrap items-end gap-3 h-[96px]">
                    <div className="flex flex-col gap-2">
                        <div className="h-3 w-20 bg-slate-200 rounded uppercase"></div>
                        <div className="h-[34px] w-36 bg-slate-100 rounded-lg"></div>
                    </div>
                    <div className="h-5 w-4 bg-slate-100 rounded mb-1"></div>
                    <div className="flex flex-col gap-2">
                        <div className="h-3 w-24 bg-slate-200 rounded uppercase"></div>
                        <div className="h-[34px] w-36 bg-slate-100 rounded-lg"></div>
                    </div>
                    <div className="h-[34px] w-20 bg-slate-200 rounded ml-2"></div>
                </div>

                {/* Charts Skeleton */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Line Chart Skeleton */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 h-[400px] lg:col-span-2 flex flex-col">
                        <div className="h-5 w-48 bg-slate-200 rounded mb-6"></div>
                        <div className="flex-1 flex items-end gap-2 w-full px-4 border-b border-l border-slate-100">
                            {[...Array(12)].map((_, i) => (
                                <div key={i} className="flex-1 bg-slate-100 rounded-t-sm" style={{ height: `${Math.max(20, Math.random() * 80)}%` }}></div>
                            ))}
                        </div>
                    </div>
                    {/* Donut Chart Skeleton */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 h-[400px] flex flex-col items-center">
                        <div className="h-5 w-48 bg-slate-200 rounded mb-2 self-start"></div>
                        <div className="h-3 w-32 bg-slate-100 rounded mb-12 self-start"></div>
                        <div className="h-[200px] w-[200px] rounded-full border-[24px] border-slate-100 mt-2"></div>
                    </div>
                </div>

                {/* Table Skeleton */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 h-[400px] flex flex-col gap-6">
                    <div className="flex justify-between items-center">
                        <div className="h-6 w-48 bg-slate-200 rounded"></div>
                        <div className="h-4 w-32 bg-slate-100 rounded"></div>
                    </div>
                    <div className="border border-slate-100 rounded-xl overflow-hidden">
                        <div className="h-[48px] bg-slate-50 border-b border-slate-100"></div>
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="h-[52px] border-b border-slate-50 flex items-center px-5">
                                <div className="h-4 w-1/4 bg-slate-200 rounded"></div>
                                <div className="h-4 w-16 bg-slate-200 rounded mx-auto"></div>
                                <div className="h-4 w-24 bg-slate-200 rounded mx-auto"></div>
                                <div className="h-[24px] w-20 bg-slate-200 rounded ml-auto"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
