import { Kecamatan, Kelurahan, Wilayah } from "@/types/pelanggan";
import { create } from "zustand";

type KelurahanStore = {
  kelurahan: Kelurahan[];
  setKelurahan: (newKelurahan: Kelurahan[]) => void;
};

export const useKelurahanStore = create<KelurahanStore>((set) => ({
  kelurahan: [],

  setKelurahan: (newKelurahan) => set({ kelurahan: newKelurahan }),
}));
