import { Kecamatan, Wilayah } from "@/types/pelanggan";
import { create } from "zustand";

type KecamatanStore = {
  kecamatan: Kecamatan[];
  setKecamatan: (newKecamatan: Kecamatan[]) => void;
};

export const useKecamatanStore = create<KecamatanStore>((set) => ({
  kecamatan: [],

  setKecamatan: (newKecamatan) => set({ kecamatan: newKecamatan }),
}));
