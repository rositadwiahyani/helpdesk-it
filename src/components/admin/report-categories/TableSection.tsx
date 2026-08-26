import Tree from "./Tree";

export default function TableSection() {
  return (
    <div className="flex flex-col w-full bg-transparent overflow-x-auto">
      <div className="flex flex-col w-full">
        <Tree />
      </div>
    </div>
  );
}