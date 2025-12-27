import { Role } from "@/types/role";
import { Selection } from "@heroui/react";
import { create } from "zustand";

type SelectedTable = {
  selected: Selection;
  setSelected: (newData: Selection) => void;
};

export const useSelectedTableStore = create<SelectedTable>((set) => ({
  selected: new Set(),

  setSelected: (newData) => set({ selected: newData }),
}));
