'use client';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

interface ActionItem {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  href?: string;
  danger?: boolean;
}

interface ActionDropdownProps {
  items: ActionItem[];
}

export default function ActionDropdown({ items }: ActionDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-1.5 text-[var(--text-dim)] hover:bg-[var(--paper-2)] hover:text-[var(--ink)] rounded-md transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-40 bg-white border border-[var(--line-dark)] rounded-xl shadow-lg z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
          <div className="py-1">
            {items.map((item, index) => {
              const content = (
                <div className="flex items-center gap-2 px-4 py-2 text-sm font-semibold hover:bg-[var(--paper-2)] transition-colors">
                  {item.icon && <span className="opacity-70">{item.icon}</span>}
                  <span>{item.label}</span>
                </div>
              );

              const className = item.danger ? 'text-red-600 hover:text-red-700' : 'text-[var(--ink)]';

              if (item.href) {
                return (
                  <Link href={item.href} key={index} className={`block ${className}`} onClick={() => setIsOpen(false)}>
                    {content}
                  </Link>
                );
              }

              return (
                <button 
                  key={index}
                  className={`w-full text-left ${className}`}
                  onClick={() => {
                    if (item.onClick) item.onClick();
                    setIsOpen(false);
                  }}
                >
                  {content}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
