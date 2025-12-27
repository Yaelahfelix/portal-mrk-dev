import { DekstopSettings } from "@/types/settings";
import { create } from "zustand";

type SettingsDekstopStore = {
  settings?: DekstopSettings;
  setSettings: (newJalan: DekstopSettings) => void;
};

export const useSettingsDekstopStore = create<SettingsDekstopStore>((set) => ({
  settings: undefined,

  setSettings: (newJalan) => set({ settings: newJalan }),
}));
