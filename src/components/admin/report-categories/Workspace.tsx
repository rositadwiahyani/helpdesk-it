"use client";

import React, { useState, createContext } from "react";
import PageHeader from "./PageHeader";
import Stats from "./Stats";
import Toolbar from "./Toolbar";
import TableSection from "./TableSection";
import ActivityLog from "./ActivityLog";
import TipsCard from "./Tipscard";
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
              childrenWrapperClassName: "flex flex-col items-end border-l-2 border-l-[rgba(0,89,187,0.20)] w-[calc(100%-56px)]",
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
    
    // Everything is in 'categories' now
    const { error } = await supabase.from('categories').delete().eq('id', parseInt(id));
    if (error) {
      alert('Gagal menghapus data');
    } else {
      fetchData();
    }
  };

  const handleReorder = async (newTreeData: any[]) => {
    setTreeData(newTreeData); // Optimistic UI update

    const updates: { id: number; sort_order: number }[] = [];
    
    newTreeData.forEach((parent, pIndex) => {
      if (parent.realId) {
        updates.push({ id: parent.realId, sort_order: pIndex + 1 });
      }
      if (parent.children && parent.children.length > 0) {
        parent.children.forEach((child: any, cIndex: number) => {
          if (child.realId) {
            updates.push({ id: child.realId, sort_order: cIndex + 1 });
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
        alert('Gagal menyimpan urutan ke server.');
        fetchData(); // revert UI if failed
      }
    } catch (err: any) {
      console.error("Error updating sort_order", err);
      alert('Terjadi kesalahan saat menyimpan urutan.');
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
      }}
    >
      <div className="flex flex-col w-full min-h-screen pt-8 px-8 pb-16 gap-8 bg-[#F8F9FA]">
        <PageHeader />
        <Stats />
        
        {/* Toolbar (Search & Expand/Collapse) */}
        <Toolbar />
        
        {/* Tabel Kategori (Tree) */}
        <TableSection />
        
        <div className="flex flex-row items-stretch gap-6 w-full">
          <div className="flex-[3] min-w-0">
            <ActivityLog />
          </div>
          <div className="flex-[2] min-w-0">
            <TipsCard />
          </div>
        </div>
      </div>
      
      <AddCategoryModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onSuccess={fetchData} />
      <AddSubcategoryModal isOpen={isSubAddModalOpen} onClose={() => setIsSubAddModalOpen(false)} onSuccess={fetchData} categoryId={subParentId} />
      <EditItemModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} onSuccess={fetchData} target={editTarget} />
    </TreeContext.Provider>
  );
}