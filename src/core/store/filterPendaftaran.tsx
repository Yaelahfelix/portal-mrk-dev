import { create } from "zustand";

type FilterPendaftaran = {
  kecamatanId: string;
  wilayahId: string;
  setKecamatan: (val: string) => void;
  setWilayah: (val: string) => void;
};

export const useFilterPendaftaran = create<FilterPendaftaran>((set) => ({
  kecamatanId: "",
  wilayahId: "",
  setKecamatan: (val: string) => set({ kecamatanId: val }),
  setWilayah: (val: string) => set({ wilayahId: val }),
}));
