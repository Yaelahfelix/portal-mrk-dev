import {
  DataKolektif,
  TagihanBlmLunasInfoPel,
  TagihanSdhLunasInfoPel,
  TotalTagihan,
} from "@/types/info-pelanggan";
import { create } from "zustand";

interface InfoPel {
  tagihanBlmLunas?: TagihanBlmLunasInfoPel[];
  tagihanSdhLunas?: TagihanSdhLunasInfoPel[];
  totalBlmLunas?: string;
  dataKolektif?: DataKolektif;
  kolektifBlmLunas?: {
    tagihanBlmLunas: TagihanBlmLunasInfoPel[];
    total: string;
  }[];
  detail?: {
    no_pelanggan: string;
    nama: string;
    alamat: string;
    kodegol: string;
    golongan: string;
    kode_rayon: string;
    status: number;
    rayon: string;
  };
  total?: TotalTagihan;
  hispelanggan?: {
    id: number;
    no_pelanggan: string;
    jenis: string;
    tanggal: string;
    user_id: number;
    nama_user: string;
    keterangan: string;
  }[];
}
type Store = {
  data?: InfoPel;
  setData: (newData?: InfoPel) => void;
};

export const useInfoPelStore = create<Store>((set) => ({
  data: undefined,

  setData: (newData) => set({ data: newData }),
}));
