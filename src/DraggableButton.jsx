import { useDrag } from "react-dnd";
import React from 'react';

export default function DraggableButton({ label, index, onClick, onRemove }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'BUTTON',
    item: { label, index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div className="relative">
      <button
        ref={drag}
        onClick={onClick}
        className={`bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 ${
          isDragging ? 'opacity-50' : ''
        }`}
      >
        {label}
      </button>
      <button
        onClick={onRemove}
        className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs"
      >
        ×
      </button>
    </div>
  );
}