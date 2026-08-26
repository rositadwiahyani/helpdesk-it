'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface AdminEditTicketModalProps {
  onClose: () => void;
  onSaved: () => void;
  ticketId: string;
}

export default function AdminEditTicketModal({ onClose, onSaved, ticketId }: AdminEditTicketModalProps) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [ticketData, setTicketData] = useState<any>(null);

  useEffect(() => {
    const fetchTicket = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('tickets')
        .select('*')
        .eq('id', ticketId)
        .single();
      
      if (data) {
        setTicketData({
          subject: data.subject || '',
          description: data.description || '',
          priority: data.priority || 'MEDIUM',
          status: data.status || 'NEW',
        });
      }
      setLoading(false);
    };
    if (ticketId) {
      fetchTicket();
    }
  }, [ticketId]);

  const handleSave = async () => {
    if (!ticketData.subject) {
      alert("Subject cannot be empty");
      return;
    }
    
    setSaving(true);
    try {
      const { error } = await supabase
        .from('tickets')
        .update({
          subject: ticketData.subject,
          description: ticketData.description,
          priority: ticketData.priority,
          status: ticketData.status,
          updated_at: new Date().toISOString()
        })
        .eq('id', ticketId);
        
      if (error) throw error;
      
      onSaved();
    } catch (err) {
      console.error("Failed to update ticket", err);
      alert("Failed to update ticket.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-xl flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0059BB]"></div>
        </div>
      </div>
    );
  }

  if (!ticketData) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-xl animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Edit Ticket</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Subject</label>
            <input 
              type="text" 
              value={ticketData.subject} 
              onChange={(e) => setTicketData({...ticketData, subject: e.target.value})}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
            <textarea 
              rows={4}
              value={ticketData.description} 
              onChange={(e) => setTicketData({...ticketData, description: e.target.value})}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Priority</label>
              <select 
                value={ticketData.priority} 
                onChange={(e) => setTicketData({...ticketData, priority: e.target.value})}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
              >
                <option value="CRITICAL">CRITICAL</option>
                <option value="HIGH">HIGH</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="LOW">LOW</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Status</label>
              <select 
                value={ticketData.status} 
                onChange={(e) => setTicketData({...ticketData, status: e.target.value})}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
              >
                <option value="NEW">OPEN</option>
                <option value="IN PROGRESS">IN PROGRESS</option>
                <option value="WAITING VERIFICATION">WAITING VERIFICATION</option>
                <option value="RESOLVED">RESOLVED</option>
                <option value="CLOSED">CLOSED</option>
                <option value="DITOLAK">REJECTED</option>
                <option value="DELETED">DELETED</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-gray-200">
          <button 
            onClick={onClose}
            disabled={saving}
            className="px-4 py-2 text-sm font-semibold text-gray-600 border border-gray-300 hover:bg-gray-50 rounded transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded transition-colors shadow-sm disabled:opacity-50 inline-flex items-center gap-2"
          >
            {saving ? (
              <><div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div> Saving...</>
            ) : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
