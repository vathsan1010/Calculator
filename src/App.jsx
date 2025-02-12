import "./index.css";
import useCalculatorStore from "./store/calculatorStore";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DraggableButton from "./DraggableButton";
import DropZone from "./DropZone";

function App() {
  const { display, addToDisplay, clearDisplay, calculateResult, swapItems, buttons, addButton, removeButton } = useCalculatorStore();

  const handleInput = (label) => {
    if (label === "=") {
      calculateResult();
    } else {
      addToDisplay(label.toString());
    }
  };

  const handleDrop = (dragIndex, hoverIndex) => {
    swapItems(dragIndex, hoverIndex);
  };

  const handleAddButton = (label) => {
    addButton(label);
  };

  const handleRemoveButton = (index) => {
    removeButton(index);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <h1 className="text-5xl text-center text-bold">CALCULATOR APP</h1>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white shadow-md rounded p-4 w-30">
          <div className="bg-gray-200 p-2 text-right font-bold text-xl mb-4">
            <DropZone onDrop={handleDrop}>
              <div className="flex gap-1 justify-end">
                {display.split("").map((btn, index) => (
                  <DraggableButton
                    key={index}
                    label={btn}
                    index={index}
                    onClick={() => handleInput(btn)}
                    onRemove={() => handleRemoveButton(index)}
                  />
                ))}
              </div>
            </DropZone>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {buttons.map((btn, index) => (
              <DraggableButton
                key={index}
                label={btn}
                onClick={() => handleInput(btn)}
                onRemove={() => handleRemoveButton(index)}
              />
            ))}
            <button
              onClick={clearDisplay}
              className="col-span-4 bg-red-500 text-white py-2 rounded hover:bg-red-700 p-2 w-full"
            >
              Clear
            </button>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-bold mb-2">Add Buttons</h3>
            <div className="flex flex-wrap gap-2">
              {[7, 8, 9, '+', 4, 5, 6, '-', 1, 2, 3, '*', 0, '.', '=', '/'].map((btn) => (
                <button
                  key={btn}
                  onClick={() => handleAddButton(btn)}
                  className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
                >
                  Add {btn}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  );
}

export default App;