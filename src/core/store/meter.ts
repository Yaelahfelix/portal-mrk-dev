import { MerekMeter } from "@/types/merekMeters";
import { create } from "zustand";

type MerekStore = {
  meter: MerekMeter[];
  setMeter: (data: MerekMeter[]) => void;
};

export const useMerekStore = create<MerekStore>((set) => ({
  meter: [],

  setMeter: (data) => set({ meter: data }),
}));
