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
                            <div className="h-3 w-32 bg-slate-200 rounded mb-4"></div>
                            <div className="h-10 w-16 bg-slate-200 rounded"></div>
                        </div>
                        <div className="h-3 w-40 bg-slate-100 rounded mt-4"></div>
                    </div>
                ))}
            </div>

            {/* Grid 2 Column for Content Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col gap-6">
                        <div className="flex flex-col gap-4">
                            <div>
                                <div className="h-6 w-48 bg-slate-200 rounded mb-2"></div>
                                <div className="h-4 w-72 bg-slate-100 rounded"></div>
                            </div>
                            <div className="flex gap-3">
                                <div className="h-10 w-32 bg-slate-200 rounded"></div>
                                <div className="h-10 w-32 bg-slate-200 rounded"></div>
                                <div className="h-10 w-24 bg-slate-200 rounded"></div>
                            </div>
                        </div>
                        <div className="border border-slate-100 rounded-xl overflow-hidden">
                            <div className="h-[48px] bg-slate-50 border-b border-slate-100"></div>
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="h-[48px] border-b border-slate-50 flex items-center px-5">
                                    <div className="h-4 w-1/3 bg-slate-200 rounded"></div>
                                    <div className="h-4 w-16 bg-slate-200 rounded mx-auto"></div>
                                    <div className="h-4 w-16 bg-slate-200 rounded mx-auto"></div>
                                    <div className="h-4 w-24 bg-slate-200 rounded ml-auto"></div>
                                </div>
                            ))}
                            <div className="h-[44px] bg-slate-50"></div>
                        </div>
                    </div>
                </div>
                
                <div className="lg:col-span-1 flex flex-col gap-6">
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm h-[320px]">
                        <div className="flex justify-between items-center mb-6">
                            <div className="h-6 w-32 bg-slate-200 rounded"></div>
                            <div className="h-4 w-16 bg-slate-100 rounded"></div>
                        </div>
                        <div className="flex flex-col gap-3">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="h-[76px] border border-slate-100 rounded-xl p-3">
                                    <div className="flex justify-between mb-2">
                                        <div className="h-4 w-16 bg-slate-200 rounded"></div>
                                        <div className="h-3 w-16 bg-slate-100 rounded"></div>
                                    </div>
                                    <div className="h-4 w-full bg-slate-200 rounded mb-2"></div>
                                    <div className="h-3 w-20 bg-slate-100 rounded"></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm h-[200px]">
                        <div className="h-6 w-32 bg-slate-200 rounded mb-6"></div>
                        <div className="flex flex-col gap-4">
                            {[...Array(2)].map((_, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="w-4 h-4 rounded-full bg-slate-200 shrink-0"></div>
                                    <div className="flex flex-col gap-2 w-full">
                                        <div className="h-4 w-48 bg-slate-200 rounded"></div>
                                        <div className="h-3 w-32 bg-slate-100 rounded"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
