'use client';
import { useEffect } from 'react';
import { logoutUser } from '@/lib/AuthService';

export default function LogoutPage() {
    useEffect(() => {
        logoutUser();
        // Redirect ke login page setelah membersihkan local storage & cookie
        setTimeout(() => {
            window.location.href = '/login';
        }, 800);
    }, []);

    return (
        <div className="flex h-screen items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900 mx-auto mb-4"></div>
                <p className="text-slate-600">Sedang keluar dari sistem...</p>
            </div>
        </div>
    );
}
