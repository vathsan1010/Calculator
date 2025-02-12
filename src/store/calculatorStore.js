import { create } from "zustand";

const useCalculatorStore = create((set) => ({
  display: "",
  buttons: [7, 8, 9, '+', 4, 5, 6, '-', 1, 2, 3, '*', 0, '.', '=', '/'],
  addToDisplay: (value) => set((state) => ({ display: state.display + value })),
  clearDisplay: () => set({ display: "" }),
  calculateResult: () =>
    set((state) => {
      try {
        const result = eval(state.display);
        return { display: result.toString() };
      } catch (error) {
        return { display: "error" };
      }
    }),
  swapItems: (dragIndex, hoverIndex) =>
    set((state) => {
      const buttons = [...state.buttons];
      const temp = buttons[dragIndex];
      buttons[dragIndex] = buttons[hoverIndex];
      buttons[hoverIndex] = temp;
      return { buttons };
    }),
  addButton: (label) =>
    set((state) => ({ buttons: [...state.buttons, label] })),
  removeButton: (index) =>
    set((state) => ({
      buttons: state.buttons.filter((_, i) => i !== index),
    })),
}));

export default useCalculatorStore;