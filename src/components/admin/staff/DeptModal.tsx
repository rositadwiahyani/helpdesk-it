import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface DeptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  dept?: any; // If null, Add Mode. Else Edit Mode
  showToast?: (message: string, type: 'success' | 'error') => void;
}

export default function DeptModal({ isOpen, onClose, onSuccess, dept, showToast }: DeptModalProps) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (dept) {
      setName(dept.name || "");
    } else {
      setName("");
    }
  }, [dept, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      name,
    };

    if (dept) {
      // Edit
      try {
        const { fetchClient } = await import('@/lib/apiClient');
        await fetchClient(`/admin/departments/${dept.id}`, {
          method: 'PUT',
          body: JSON.stringify(payload)
        });
        if (showToast) showToast("Departemen berhasil diperbarui", "success");
        onSuccess();
      } catch (err: any) {
        if (showToast) showToast("Gagal mengupdate departemen: " + err.message, "error");
      }
    } else {
      // Add
      try {
        const { fetchClient } = await import('@/lib/apiClient');
        await fetchClient('/admin/departments', {
          method: 'POST',
          body: JSON.stringify(payload)
        });
        if (showToast) showToast("Departemen berhasil ditambahkan", "success");
        onSuccess();
      } catch (err: any) {
        if (showToast) showToast("Gagal menambah departemen: " + err.message, "error");
      }
    }
    setLoading(false);
  };

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none p-4">
        <div className="bg-white rounded-lg shadow-xl p-6 w-[400px] pointer-events-auto border border-[#C3C6D1]">
          <h2 className="text-lg font-bold mb-4">{dept ? "Edit Departemen" : "Tambah Departemen Baru"}</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Nama Departemen / Layanan</label>
            <input required type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full border border-gray-300 rounded p-2 text-sm" />
          </div>
          
          <div className="flex justify-end gap-3 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-100">Batal</button>
            <button type="submit" disabled={loading} className="px-4 py-2 text-sm text-white bg-[#001E40] rounded hover:bg-[#00142d] disabled:opacity-50">
              {loading ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}
