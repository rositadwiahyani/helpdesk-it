'use client';
import React, { useState } from 'react';
import { TicketMessage } from '@/lib/mock/tickets';

interface ConversationCardProps {
  messages: TicketMessage[];
  onSendMessage: (content: string, type: 'reply' | 'internal_note') => void;
}

export default function ConversationCard({ messages, onSendMessage }: ConversationCardProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'reply' | 'internal_note'>('all');
  const [inputValue, setInputValue] = useState('');
  const [sendType, setSendType] = useState<'reply' | 'internal_note'>('reply');

  const filteredMessages = messages.filter(msg => {
    if (activeTab === 'all') return true;
    return msg.type === activeTab;
  });

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    onSendMessage(inputValue, sendType);
    setInputValue('');
  };

  return (
    <div className="bg-white rounded-2xl border border-[var(--line)] shadow-sm overflow-hidden flex flex-col gap-4">
      
      {/* 1. TABS */}
      <div className="flex items-center justify-between border-b border-[var(--line-dark)] px-6 pt-4 bg-[var(--paper-2)]/30">
        <div className="flex items-center gap-1">
          <button 
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-lg border-b-2 transition-colors ${
              activeTab === 'all' 
                ? 'border-[var(--gold-soft)] text-[var(--ink)]' 
                : 'border-transparent text-[var(--text-dim)] hover:text-[var(--ink)]'
            }`}
          >
            All Activity ({messages.length})
          </button>
          <button 
            onClick={() => setActiveTab('reply')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-lg border-b-2 transition-colors ${
              activeTab === 'reply' 
                ? 'border-[var(--gold-soft)] text-[var(--ink)]' 
                : 'border-transparent text-[var(--text-dim)] hover:text-[var(--ink)]'
            }`}
          >
            Replies ({messages.filter(m => m.type === 'reply').length})
          </button>
          <button 
            onClick={() => setActiveTab('internal_note')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-lg border-b-2 transition-colors ${
              activeTab === 'internal_note' 
                ? 'border-[var(--gold-soft)] text-[var(--ink)]' 
                : 'border-transparent text-[var(--text-dim)] hover:text-[var(--ink)]'
            }`}
          >
            Internal Notes ({messages.filter(m => m.type === 'internal_note').length})
          </button>
        </div>
      </div>

      {/* 2. CHAT BUBBLES */}
      <div className="p-6 flex flex-col gap-6 max-h-[500px] overflow-y-auto bg-[var(--paper)]/20">
        {filteredMessages.length === 0 ? (
          <div className="text-center py-10 text-[var(--text-dim)] text-xs font-bold">
            Belum ada pesan di kategori ini.
          </div>
        ) : (
          filteredMessages.map((msg) => {
            const isUser = msg.role === 'user';
            const isNote = msg.type === 'internal_note';

            // Determine styling based on type and role
            let bubbleStyle = 'bg-white border border-[var(--line)] text-[var(--ink)]';
            let headerText = msg.sender;
            let badgeText = '';

            if (isNote) {
              bubbleStyle = 'bg-amber-50/70 border border-amber-200 text-[var(--ink)]';
              badgeText = 'INTERNAL NOTE';
            } else if (!isUser) {
              bubbleStyle = 'bg-slate-50 border border-slate-200 text-[var(--ink)]';
              badgeText = 'ADMIN';
            }

            return (
              <div 
                key={msg.id} 
                className={`flex gap-3 max-w-[85%] ${isUser ? 'self-start' : 'self-end flex-row-reverse'}`}
              >
                {/* Avatar */}
                <div className="w-9 h-9 rounded-full bg-[var(--gold)] flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-sm uppercase">
                  {msg.sender.substring(0, 2)}
                </div>

                <div className="flex flex-col gap-1">
                  {/* Sender Info */}
                  <div className={`flex items-center gap-2 text-xs text-[var(--text-dim)] ${isUser ? 'justify-start' : 'justify-end'}`}>
                    <span className="font-bold text-[var(--ink)]">{headerText}</span>
                    {badgeText && (
                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                        isNote ? 'bg-amber-100 text-amber-800' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {badgeText}
                      </span>
                    )}
                    <span>•</span>
                    <span>{msg.timestamp}</span>
                  </div>

                  {/* Content Bubble */}
                  <div className={`p-4 rounded-2xl text-[13.5px] leading-relaxed shadow-sm ${bubbleStyle}`}>
                    <p className="whitespace-pre-line">{msg.content}</p>
                    {msg.attachments && msg.attachments.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-[var(--line-dark)] flex flex-col gap-1.5">
                        <span className="text-[10px] font-bold text-[var(--text-dim)] uppercase">Attachments:</span>
                        <div className="flex flex-wrap gap-2">
                          {msg.attachments.map((file, fIdx) => (
                            <div key={fIdx} className="flex items-center gap-1.5 bg-white border border-[var(--line)] px-2.5 py-1 rounded-lg text-xs font-medium shadow-sm hover:underline cursor-pointer">
                              <svg className="w-3.5 h-3.5 opacity-60" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
                              {file}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* 3. INPUT FORM (Replies & Notes) */}
      <form onSubmit={handleSend} className="border-t border-[var(--line)] p-4 lg:p-5 flex flex-col gap-4 bg-[var(--paper-2)]/10">
        
        {/* Toggle Reply / Note Mode */}
        <div className="flex items-center gap-2">
          <button 
            type="button"
            onClick={() => { setSendType('reply'); setSendType('reply'); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              sendType === 'reply' 
                ? 'bg-[var(--ink)] text-white' 
                : 'bg-white border border-[var(--line)] text-[var(--text-dim)] hover:text-[var(--ink)]'
            }`}
          >
            Reply to Requester
          </button>
          <button 
            type="button"
            onClick={() => { setSendType('internal_note'); setSendType('internal_note'); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              sendType === 'internal_note'
                ? 'bg-amber-500 text-white shadow-sm'
                : 'bg-white border border-[var(--line)] text-[var(--text-dim)] hover:text-[var(--ink)]'
            }`}
          >
            Post Internal Note
          </button>
        </div>

        {/* Text Area */}
        <div className="flex flex-col gap-2">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            rows={3}
            placeholder={
              sendType === 'reply' 
                ? 'Tulis balasan resmi ke pelapor...' 
                : 'Tulis catatan rahasia internal admin (tidak terlihat oleh pelapor)...'
            }
            className={`w-full bg-white border rounded-xl p-3 text-[13.5px] focus:outline-none focus:ring-1 transition-all ${
              sendType === 'internal_note' 
                ? 'border-amber-200 focus:border-amber-400 focus:ring-amber-400' 
                : 'border-[var(--line-dark)] focus:border-[var(--gold-soft)] focus:ring-[var(--gold-soft)]'
            }`}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          {/* Mock Attachment Button */}
          <button 
            type="button"
            onClick={() => alert('Mock upload file...')}
            className="flex items-center gap-1.5 text-xs font-bold text-[var(--text-dim)] hover:text-[var(--ink)] transition-colors bg-white border border-[var(--line)] px-3 py-2 rounded-xl"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
            Attach File
          </button>
          
          <button 
            type="submit"
            className={`px-5 py-2.5 rounded-xl text-xs font-bold shadow-sm transition-all ${
              sendType === 'internal_note'
                ? 'bg-amber-600 hover:bg-amber-700 text-white'
                : 'bg-[var(--ink)] hover:bg-[var(--text)] text-white'
            }`}
          >
            {sendType === 'internal_note' ? 'Save Note' : 'Send Reply'}
          </button>
        </div>

      </form>
    </div>
  );
}
