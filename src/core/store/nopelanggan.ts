import { create } from "zustand";

type NopelStore = {
  noPelanggan: string;
  setNoPelanggan: (no_pelanggan: string) => void;
};

export const useNopelStore = create<NopelStore>((set) => ({
  noPelanggan: "",

  setNoPelanggan: (no_pelanggan) => set({ noPelanggan: no_pelanggan }),
}));
