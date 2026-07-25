import TableHeader from "./TableHeader";
import Tree from "./Tree";

export default function TableSection() {
  return (
    <div className="flex flex-col w-full bg-[#FFF] overflow-x-auto">
      {/* Ubah min-w-[800px] menjadi w-full agar ukurannya tidak terkunci mati */}
      <div className="flex flex-col w-full">
        <TableHeader />
        <Tree />
      </div>
    </div>
  );
}