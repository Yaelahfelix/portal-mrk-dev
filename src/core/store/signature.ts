import { TTD } from "@/types/ttd";
import { create } from "zustand";

type TTDStore = {
  signature: TTD;
  setSignature: (newTTD: TTD) => void;
};

export const useTTDStore = create<TTDStore>((set) => ({
  signature: {} as TTD,

  setSignature: (newTTD) => set({ signature: newTTD }),
}));
