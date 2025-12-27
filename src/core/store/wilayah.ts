import { Wilayah } from "@/types/pelanggan";
import { create } from "zustand";

type WilayahStore = {
  wilayah: Wilayah[];
  setWilayah: (newWilayah: Wilayah[]) => void;
};

export const useWilayahStore = create<WilayahStore>((set) => ({
  wilayah: [],

  setWilayah: (newWilayah) => set({ wilayah: newWilayah }),
}));
