import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface AgentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  agent?: any; // If null, it's Add Mode. If object, it's Edit Mode.
  departments: any[];
}

export default function AgentModal({ isOpen, onClose, onSuccess, agent, departments }: AgentModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("teknisi");
  const [deptId, setDeptId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (agent) {
      setName(agent.name || "");
      setEmail(agent.email || "");
      setPhone(agent.phone || "");
      setRole(agent.role || "teknisi");
      setDeptId(agent.dept_id ? String(agent.dept_id) : "");
    } else {
      setName("");
      setEmail("");
      setPhone("");
      setRole("teknisi");
      setDeptId("");
    }
  }, [agent, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      name,
      email,
      phone,
      role,
      dept_id: deptId ? parseInt(deptId) : null,
    };

    if (agent) {
      // Edit
      const { error } = await supabase.from("staff_profiles").update(payload).eq("id", agent.id);
      if (error) alert("Gagal mengupdate agen: " + error.message);
      else onSuccess();
    } else {
      // Add (Assuming auth is handled separately or we just insert profile for now)
      const { error } = await supabase.from("staff_profiles").insert([payload]);
      if (error) alert("Gagal menambah agen: " + error.message);
      else onSuccess();
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-[500px]">
        <h2 className="text-lg font-bold mb-4">{agent ? "Edit Agen" : "Tambah Agen Baru"}</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Nama Lengkap</label>
            <input required type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full border border-gray-300 rounded p-2 text-sm" />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border border-gray-300 rounded p-2 text-sm" />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Nomor WA</label>
            <input required type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full border border-gray-300 rounded p-2 text-sm" />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Peran (Role)</label>
            <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full border border-gray-300 rounded p-2 text-sm">
              <option value="admin">Administrator</option>
              <option value="agent">Agent (Operator)</option>
              <option value="teknisi">Teknisi</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Departemen / Layanan</label>
            <select value={deptId} onChange={(e) => setDeptId(e.target.value)} className="w-full border border-gray-300 rounded p-2 text-sm">
              <option value="">Pilih Departemen...</option>
              {departments.map((d) => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
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
  );
}
