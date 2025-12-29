import { Jalan, Kecamatan, Kelurahan, Wilayah } from "@/types/pelanggan";
import { create } from "zustand";

type JalanStore = {
  jalan: Jalan[];
  setJalan: (newJalan: Jalan[]) => void;
};

export const useJalanStore = create<JalanStore>((set) => ({
  jalan: [],

  setJalan: (newJalan) => set({ jalan: newJalan }),
}));
