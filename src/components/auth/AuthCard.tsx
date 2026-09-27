import { ReactNode } from 'react';

interface AuthCardProps {
  title: ReactNode;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
}

export default function AuthCard({ title, description, children, footer }: AuthCardProps) {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#ebf1f8_40%,#d8e5f2_100%)] flex flex-col items-center relative overflow-hidden font-sans">
      
      {/* ─── Background Decorations ─── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        {/* Pola Titik (Dot Grid) yang sangat halus */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(0,45,114,0.04)_1.5px,transparent_1.5px)] bg-[length:32px_32px]" />
        
        {/* Cahaya Orb Biru Muda Kiri Atas */}
        <div className="absolute top-[-15%] left-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-[radial-gradient(circle,rgba(186,230,253,0.5)_0%,transparent_70%)] rounded-full" />

        {/* Cahaya Orb Biru/Ungu Kanan Tengah */}
        <div className="absolute top-[10%] right-[-15%] w-[45vw] h-[45vw] max-w-[550px] max-h-[550px] bg-[radial-gradient(circle,rgba(219,234,254,0.7)_0%,transparent_70%)] rounded-full" />
        
        {/* Elemen Geometris Kecil (Floating Dots & Rings) */}
        <div className="absolute top-[18%] left-[15%] w-2.5 h-2.5 rounded-full bg-blue-300 opacity-50" />
        <div className="absolute top-[28%] right-[20%] w-4 h-4 rounded-full border-[2.5px] border-blue-300 opacity-40" />
        <div className="absolute top-[48%] left-[10%] w-[7px] h-[7px] rounded-full bg-blue-400 opacity-30" />
      </div>

      {/* ─── Form Area ─── */}
      <div className="flex-1 flex flex-col items-center justify-center w-full pb-[220px] pt-[80px] z-20 relative">
        <div className="bg-white/60 backdrop-blur-[20px] rounded-[28px] p-12 w-full max-w-[440px] flex flex-col items-center shadow-[0_20px_40px_rgba(0,45,114,0.05),0_1px_3px_rgba(0,0,0,0.05)] border border-white/80">
          
          {/* Logo */}
          <div className="w-[68px] h-[68px] rounded-[18px] bg-[linear-gradient(145deg,#1a56db,#002D72)] flex items-center justify-center mb-5 shadow-[0_8px_32px_rgba(0,45,114,0.35)]">
            {/* Logo Helpdesk (Modern Chat Bubbles) */}
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z"/>
              <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"/>
            </svg>
          </div>

          {/* Title */}
          <h2 className={`text-[22px] font-semibold text-slate-800 tracking-[0.01em] ${description ? 'mb-2' : 'mb-9'}`}>
            {title}
          </h2>

          {/* Description */}
          {description && (
            <p className="text-[15px] text-slate-500 text-center" style={{ marginBottom: '48px' }}>
              {description}
            </p>
          )}

          {/* Form */}
          <div className="w-full max-w-[380px] px-6">
            {children}
          </div>

          {/* Footer */}
          {footer && (
            <div className="mt-5 text-[12.5px] text-slate-400 text-center">
              {footer}
            </div>
          )}
        </div>
      </div>

      {/* ─── Wave Stack (4 lapisan, ukuran besar, warna jelas) ─── */}
      <div className="absolute bottom-0 left-0 right-0 h-[42vh] z-10 pointer-events-none">
        {/* LAYER 4 — BELAKANG, paling tinggi, biru muda sekali (#bae6fd) */}
        <svg
          viewBox="0 0 1440 320"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="absolute bottom-0 left-0 w-full h-full"
        >
          <path
            d="M0,200 
               C120,140 240,260 360,200 
               C480,140 600,260 720,200 
               C840,140 960,240 1080,190 
               C1200,140 1320,230 1440,190 
               L1440,320 L0,320 Z"
            fill="#bae6fd"
          />
        </svg>

        {/* LAYER 3 — biru langit sedang (#60c2f0) */}
        <svg
          viewBox="0 0 1440 320"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="absolute bottom-0 left-0 w-full h-[92%]"
        >
          <path
            d="M0,210 
               C100,155 220,280 380,215 
               C520,158 660,275 820,210 
               C960,152 1100,258 1260,205 
               C1350,172 1410,230 1440,210 
               L1440,320 L0,320 Z"
            fill="#38bdf8"
          />
        </svg>

        {/* LAYER 2 — biru medium (#0284c7) */}
        <svg
          viewBox="0 0 1440 320"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="absolute bottom-0 left-0 w-full h-[78%]"
        >
          <path
            d="M0,220 
               C150,165 300,285 480,220 
               C640,162 780,270 960,215 
               C1100,165 1270,255 1440,210 
               L1440,320 L0,320 Z"
            fill="#0369a1"
          />
        </svg>

        {/* LAYER 1 — DEPAN, paling rendah, navy UNDIP (#002D72) */}
        <svg
          viewBox="0 0 1440 320"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="absolute bottom-0 left-0 w-full h-[62%]"
        >
          <path
            d="M0,230 
               C180,175 360,295 540,230 
               C700,172 860,280 1040,225 
               C1200,170 1330,260 1440,225 
               L1440,320 L0,320 Z"
            fill="#002D72"
          />
        </svg>
      </div>
    </div>
  );
}