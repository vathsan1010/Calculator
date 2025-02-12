import { useDrop } from "react-dnd";

export default function DropZone({ onDrop, children }) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "BUTTON",
    drop: (item) => onDrop(item.index, item.hoverIndex),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`min-h-20 p-4 border-2 border-dashed rounded ${
        isOver ? 'border-green-500 bg-green-100' : 'border-gray-400'
      }`}
    >
      {children}
    </div>
  );
}