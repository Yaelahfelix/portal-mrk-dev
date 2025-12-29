import { Kecamatan, Kelurahan, Rayon, Wilayah } from "@/types/pelanggan";
import { create } from "zustand";

type RayonStore = {
  rayon: Rayon[];
  setRayon: (newRayon: Rayon[]) => void;
};

export const useRayonStore = create<RayonStore>((set) => ({
  rayon: [],

  setRayon: (newRayon) => set({ rayon: newRayon }),
}));
