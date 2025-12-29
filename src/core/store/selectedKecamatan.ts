import { create } from "zustand";

type SelectedKecStore = {
  kecamatan: string;
  setKecamatan: (kec_id: string) => void;
};

export const useSelectedKecStore = create<SelectedKecStore>((set) => ({
  kecamatan: "",

  setKecamatan: (kec_id) => set({ kecamatan: kec_id }),
}));
