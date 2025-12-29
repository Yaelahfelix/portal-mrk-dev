import { create } from "zustand";

type SelectedWilStore = {
  wilayah: string;
  setWilayah: (wilayah_id: string) => void;
};

export const useSelectedWilStore = create<SelectedWilStore>((set) => ({
  wilayah: "",

  setWilayah: (wilayah_id) => set({ wilayah: wilayah_id }),
}));
