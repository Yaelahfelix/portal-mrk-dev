import { create } from "zustand";

type KasirStore = {
  kasir: string;
  setKasir: (newKasir: string) => void;
};

export const useKasirStore = create<KasirStore>((set) => ({
  kasir: "",
  setKasir: (newKasir) => set({ kasir: newKasir }),
}));
