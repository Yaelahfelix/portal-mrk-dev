export interface TagihanBlmLunasInfoPel {
  id: number;
  no_pelanggan: string;
  periode_rek: string;
  bln: number;
  nama: string;
  alamat: string;
  rayon: string;
  stanangkat: number;
  kodegol: string;
  golongan: string;
  stanlalu: number;
  stanskrg: number;
  periode: string;
  pakaiskrg: number;
  harga_air: number;
  airlimbah: number;
  administrasi: number;
  pemeliharaan: number;
  retribusi: number;
  pelayanan: number;
  angsuran: number;
  flaglunasmkp: number;
  angsuranke: number;
  rekair: number;
  tglmulaidenda: string;
  tglmulaidenda2: string;
  urut: number;
  denda1: string;
  denda2: number;
  denda3: number;
  totalrek: string;
}

export interface DataKolektif {
  no_kolektif: string;
  nama: string;
}
export interface TagihanSdhLunasInfoPel {
  id: number;
  no_pelanggan: string;
  periode_rek: string;
  bln: number;
  nama: string;
  alamat: string;
  flaglunasmkp: number;
  rayon: string;
  stanangkat: number;
  kodegol: string;
  golongan: string;
  stanlalu: number;
  stanskrg: number;
  pakaiskrg: number;
  harga_air: number;
  airlimbah: number;
  administrasi: number;
  angsuranke: number;
  pemeliharaan: number;
  retribusi: number;
  pelayanan: number;
  angsuran: number;
  rekair: number;
  denda: number;
  total: number;
  kasir: string;
  loket: string;
  tglbayar: string;
  periode: string;
}

export interface TotalTagihan {
  blmLunas: string;
  sdhLunas: string;
  keseluruhan: string;
}
