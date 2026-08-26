"use client";

import React, { useState, createContext } from "react";
import PageHeader from "./PageHeader";
import Stats from "./Stats";
import Toolbar from "./Toolbar";
import TableSection from "./TableSection";
import { AddCategoryModal, AddSubcategoryModal, EditItemModal } from "./CategoryModals";

export type TreeContextType = {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  expandedNodes: string[];
  toggleNode: (id: string) => void;
  expandAll: () => void;
  collapseAll: () => void;
  treeData: any[];
  fetchData: () => Promise<void>;
  onAddCategory?: () => void;
  onAddSubcategory?: (categoryId: string) => void;
  onEditItem?: (item: any, type: 'category' | 'subcategory') => void;
  onDeleteItem?: (id: string, type: 'category' | 'subcategory') => void;
  handleReorder?: (newTreeData: any[]) => Promise<void>;
  showToast?: (message: string, type?: 'success' | 'error') => void;
};

import { supabase } from "@/lib/supabase";

export const TreeContext = createContext<TreeContextType | null>(null);

export default function Workspace() {
  const [searchQuery, setSearchQuery] = useState("");
  const [treeData, setTreeData] = useState<any[]>([]);
  const [expandedNodes, setExpandedNodes] = useState<string[]>([]);
  
  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSubAddModalOpen, setIsSubAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [subParentId, setSubParentId] = useState<string | null>(null);
  const [editTarget, setEditTarget] = useState<any>(null);

  // Toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  React.useEffect(() => {
      if (toastMessage) {
          const timer = setTimeout(() => setToastMessage(null), 3000);
          return () => clearTimeout(timer);
      }
  }, [toastMessage]);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
      setToastMessage(message);
      setToastType(type);
  };

  
  const fetchData = async () => {
    const { data: cats } = await supabase.from('categories').select('*').order('sort_order', { ascending: true }).order('name', { ascending: true });
    
    if (cats) {
      const buildTree = (parentId: number | null): any[] => {
        return cats
          .filter(c => c.parent_id === parentId)
          .map(c => {
            const children = buildTree(c.id);
            const isBranch = children.length > 0 || parentId === null; // Top-level are always branches, others are branch if they have children
            
            return {
              id: c.id.toString(),
              realId: c.id,
              title: c.name,
              count: `${children.length} Items`,
              status: c.is_active ? "AKTIF" : "NONAKTIF",
              type: isBranch ? "branch" : "leaf-bordered",
              childrenWrapperClassName: "flex flex-col border-l border-gray-200 ml-10 w-[calc(100%-40px)]",
              children: children.length > 0 ? children : undefined
            };
          });
      };

      const formatted = buildTree(null);
      setTreeData(formatted);
      
      const getAllIds = (nodes: any[]): string[] => {
        let ids: string[] = [];
        nodes.forEach(n => {
          ids.push(n.id);
          if (n.children) {
            ids = [...ids, ...getAllIds(n.children)];
          }
        });
        return ids;
      };
      
      setExpandedNodes(getAllIds(formatted));
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const toggleNode = (id: string) => {
    setExpandedNodes((prev) =>
      prev.includes(id) ? prev.filter((n) => n !== id) : [...prev, id]
    );
  };

  const expandAll = () => setExpandedNodes(treeData.map(f => f.id));
  const collapseAll = () => setExpandedNodes([]);

  const handleAddCategory = () => setIsAddModalOpen(true);
  const handleAddSubcategory = (categoryId: string) => {
    setSubParentId(categoryId);
    setIsSubAddModalOpen(true);
  };
  const handleEditItem = (item: any, type: 'category' | 'subcategory') => {
    setEditTarget({ ...item, type });
    setIsEditModalOpen(true);
  };
  const handleDeleteItem = async (id: string, type: 'category' | 'subcategory') => {
    if (!window.confirm(`Apakah Anda yakin ingin menghapus data ini?`)) return;
    
    const { fetchClient } = await import('@/lib/apiClient');
    try {
      await fetchClient(`/admin/categories/${id}`, { method: 'DELETE' });
      fetchData();
      showToast('Data berhasil dihapus', 'success');
    } catch (err) {
      console.error(err);
      showToast('Gagal menghapus data', 'error');
    }
  };

  const handleReorder = async (newTreeData: any[]) => {
    setTreeData(newTreeData); // Optimistic UI update

    const updates: { id: number; sort_order: number; parent_id?: number | null }[] = [];
    
    newTreeData.forEach((parent, pIndex) => {
      if (parent.realId) {
        updates.push({ id: parent.realId, sort_order: pIndex + 1, parent_id: null });
      }
      if (parent.children && parent.children.length > 0) {
        parent.children.forEach((child: any, cIndex: number) => {
          if (child.realId) {
            updates.push({ id: child.realId, sort_order: cIndex + 1, parent_id: parent.realId });
          }
        });
      }
    });

    const { fetchClient } = await import('@/lib/apiClient');
    try {
      const res = await fetchClient('/admin/categories/reorder', {
        method: 'PUT',
        body: JSON.stringify({ updates }),
      });
      if (!res.success) {
        console.error("Failed to update sort_order", res.message);
        showToast('Gagal menyimpan urutan ke server.', 'error');
        fetchData(); // revert UI if failed
      } else {
        showToast('Urutan berhasil disimpan', 'success');
      }
    } catch (err: any) {
      console.error("Error updating sort_order", err);
      showToast('Terjadi kesalahan saat menyimpan urutan.', 'error');
      fetchData(); // revert UI if failed
    }
  };

  return (
    <TreeContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        expandedNodes,
        toggleNode,
        expandAll,
        collapseAll,
        treeData,
        fetchData,
        onAddCategory: handleAddCategory,
        onAddSubcategory: handleAddSubcategory,
        onEditItem: handleEditItem,
        onDeleteItem: handleDeleteItem,
        handleReorder: handleReorder,
        showToast,
      }}
    >
      <div className="flex flex-col gap-6 w-full relative">
        <PageHeader />
        <Stats />
        
        {/* Toolbar (Search & Expand/Collapse) */}
        <Toolbar />
        
        {/* Tabel Kategori (Tree) */}
        <TableSection />
      </div>
      
      <AddCategoryModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onSuccess={fetchData} />
      <AddSubcategoryModal isOpen={isSubAddModalOpen} onClose={() => setIsSubAddModalOpen(false)} onSuccess={fetchData} categoryId={subParentId} />
      <EditItemModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} onSuccess={fetchData} target={editTarget} />

      {/* Toast Notification */}
      {toastMessage && (
        <div className={`fixed bottom-4 right-4 px-4 py-3 rounded shadow-lg flex items-center gap-3 z-[60] animate-in slide-in-from-bottom-5 ${
            toastType === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
            {toastType === 'success' ? (
                <svg className="w-5 h-5 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            ) : (
                <svg className="w-5 h-5 text-red-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            )}
            <span className="text-sm font-medium">{toastMessage}</span>
            <button onClick={() => setToastMessage(null)} className="ml-2 hover:opacity-75">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
        </div>
      )}
    </TreeContext.Provider>
  );
}