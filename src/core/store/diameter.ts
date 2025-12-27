import { Diameter, Golongan, Kecamatan, Kelurahan, Rayon, Wilayah } from "@/types/pelanggan";
import { create } from "zustand";

type DiameterStore = {
  diameter: Diameter[];
  setDiameter: (newDiameter: Diameter[]) => void;
};

export const useDiameterStore = create<DiameterStore>((set) => ({
  diameter: [],

  setDiameter: (newDiameter) => set({ diameter: newDiameter }),
}));
