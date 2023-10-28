import { create } from "zustand";

const useStore = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 25 })),
  removeAllBears: () => set({ bears: 0 }),
}));

function BearCounter() {
  const bears = useStore((state) => state.bears);
  const increasePopulation = useStore((state) => state.increasePopulation);
  const removeAllBears = useStore((state) => state.removeAllBears);

  return (
    <div>
      <h1>{bears} around here...</h1>
      <button onClick={increasePopulation}>one up</button>
      <button onClick={removeAllBears}>Remove Bears</button>
    </div>
  );
}

export default BearCounter;
