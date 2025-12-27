import { Golongan, Kecamatan, Kelurahan, Rayon, Wilayah } from "@/types/pelanggan";
import { create } from "zustand";

type GolonganStore = {
  golongan: Golongan[];
  setGolongan: (newGolongan: Golongan[]) => void;
};

export const useGolonganStore = create<GolonganStore>((set) => ({
  golongan: [],

  setGolongan: (newGolongan) => set({ golongan: newGolongan }),
}));
