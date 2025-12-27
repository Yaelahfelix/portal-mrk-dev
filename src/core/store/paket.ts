import { DekstopSettings } from "@/types/settings";
import { create } from "zustand";

type Paket = {
  id: number;
  kode_paket: string;
  nama_paket: string;
  biaya_peralatan: number;
  biaya_ongkos: number;
  biaya_lainnya: number;
  biaya_jl: number;
  biaya_survey: number;
}[];

type PaketStore = {
  paket: Paket;
  setPaket: (newPaket: Paket) => void;
};

export const usePaketStore = create<PaketStore>((set) => ({
  paket: [],
  setPaket: (newPaket) => set({ paket: newPaket }),
}));
