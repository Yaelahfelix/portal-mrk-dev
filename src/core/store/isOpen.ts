import { create } from "zustand";

type UseIsOpenStore = {
  isOpen: boolean;
  setIsOpen: (bool: boolean) => void;
};

export const useIsOpenStore = create<UseIsOpenStore>((set) => ({
  isOpen: false,

  setIsOpen: (bool) => set({ isOpen: bool }),
}));
