import { useContext, useMemo, useState } from "react";
import Row from "./Row";
import SubRow from "./SubRow";
import { TreeContext } from "./Workspace";

export default function Tree() {
  const ctx = useContext(TreeContext);
  const treeData = ctx?.treeData || [];
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (targetIndex: number) => {
    if (draggedIndex === null || draggedIndex === targetIndex) return;
    
    const updatedData = [...treeData];
    const [movedItem] = updatedData.splice(draggedIndex, 1);
    updatedData.splice(targetIndex, 0, movedItem);
    
    if (ctx?.handleReorder) {
      ctx.handleReorder(updatedData);
    }
    setDraggedIndex(null);
  };

  const filteredData = useMemo(() => {
    if (!ctx?.searchQuery) return treeData;
    const lowerQuery = ctx.searchQuery.toLowerCase();
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filterNodes = (nodes: any[]) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return nodes.reduce((acc: any[], node: any) => {
        const isMatch = node.title.toLowerCase().includes(lowerQuery);
        let filteredChildren = [];
        if (node.children) {
          filteredChildren = filterNodes(node.children);
        }

        if (isMatch) {
          acc.push({ ...node, children: node.children });
        } else if (filteredChildren.length > 0) {
          acc.push({ ...node, children: filteredChildren });
        }
        return acc;
      }, []);
    };

    return filterNodes(treeData);
  }, [ctx?.searchQuery, treeData]);

  // Recursive component for rendering N-levels
  const renderNode = (node: any, index: number, isRoot: boolean = false) => {
    if (isRoot) {
      return (
        <div
          key={node.id}
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragOver={handleDragOver}
          onDrop={() => handleDrop(index)}
          className={`w-full transition-colors cursor-grab active:cursor-grabbing ${
            draggedIndex === index ? "opacity-40 bg-blue-50" : "hover:bg-[#FAFAFB]"
          }`}
        >
          <Row
            nodeId={node.id}
            outerWrapperClassName={`flex flex-col items-end w-full ${index > 0 ? "border-t border-gray-200" : ""}`}
            iconBgClassName={node.iconBgClassName}
            icon={node.icon}
            title={node.title}
            count={node.count}
            status={node.status}
            childrenWrapperClassName={node.childrenWrapperClassName}
          >
            {node.children?.map((child: any, cIndex: number) => renderNode(child, cIndex, false))}
          </Row>
        </div>
      );
    }

    if (node.type === "branch") {
      return (
        <SubRow
          key={node.id}
          variant="branch"
          nodeId={node.id}
          headerClassName={`w-full relative ${index > 0 ? "border-t border-gray-200" : ""}`}
          title={node.title}
          count={node.count}
          status={node.status}
          childrenWrapperClassName={node.childrenWrapperClassName}
          onMoveUp={index > 0 ? () => {
            const updatedData = [...treeData];
            const temp = updatedData[index];
            updatedData[index] = updatedData[index - 1];
            updatedData[index - 1] = temp;
            ctx?.handleReorder?.(updatedData);
          } : undefined}
          onMoveDown={index < treeData.length - 1 ? () => {
            const updatedData = [...treeData];
            const temp = updatedData[index];
            updatedData[index] = updatedData[index + 1];
            updatedData[index + 1] = temp;
            ctx?.handleReorder?.(updatedData);
          } : undefined}
        >
          {node.children?.map((subChild: any, scIndex: number) => renderNode(subChild, scIndex, false))}
        </SubRow>
      );
    }

    return (
      <SubRow
        key={node.id}
        variant={node.type as any}
        title={node.title}
        nodeId={node.id}
        hasDivider={node.type === "leaf-bordered" ? true : undefined}
        onMoveUp={index > 0 ? () => {
          const updatedData = [...treeData];
          const parentIndex = updatedData.findIndex(p => p.children?.some((c: any) => c.id === node.id));
          if (parentIndex !== -1) {
            const parent = { ...updatedData[parentIndex] };
            const children = [...parent.children];
            const temp = children[index];
            children[index] = children[index - 1];
            children[index - 1] = temp;
            parent.children = children;
            updatedData[parentIndex] = parent;
            ctx?.handleReorder?.(updatedData);
          }
        } : undefined}
        onMoveDown={index < (treeData.find((p: any) => p.children?.some((c: any) => c.id === node.id))?.children?.length || 0) - 1 ? () => {
          const updatedData = [...treeData];
          const parentIndex = updatedData.findIndex(p => p.children?.some((c: any) => c.id === node.id));
          if (parentIndex !== -1) {
            const parent = { ...updatedData[parentIndex] };
            const children = [...parent.children];
            const temp = children[index];
            children[index] = children[index + 1];
            children[index + 1] = temp;
            parent.children = children;
            updatedData[parentIndex] = parent;
            ctx?.handleReorder?.(updatedData);
          }
        } : undefined}
      />
    );
  };

  return (
    <div className="w-full flex flex-col bg-white border border-gray-200 rounded-md shadow-sm">
      
      {/* DAFTAR KATEGORI DENGAN FITUR DRAG AND DROP */}
      <div className="w-full flex flex-col rounded-md overflow-hidden">
        {filteredData.map((row, index) => renderNode(row, index, true))}

        {filteredData.length === 0 && (
          <div className="p-8 w-full flex justify-center text-center text-[#6B7280] text-sm">
            Tidak ada kategori yang sesuai dengan pencarian &quot;{ctx?.searchQuery}&quot;.
          </div>
        )}
      </div>
    </div>
  );
}