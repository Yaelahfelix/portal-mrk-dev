import { Divisi } from "@/types/masterPetugas";
import { create } from "zustand";

type DivisiStore = {
  divisi: Divisi[];
  setDivisi: (newDivisi: Divisi[]) => void;
};

export const useDivisiStore = create<DivisiStore>((set) => ({
  divisi: [],

  setDivisi: (newDivisi) => set({ divisi: newDivisi }),
}));
