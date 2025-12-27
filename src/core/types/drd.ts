export interface TotalDRD {
  angsuran: string;
  admin_ppob: string;
  denda: string;
  rekair: string;
  keseluruhan: string;
}

export interface DRD {
  no: number;
  no_pelanggan: string;
  nama: string;
  golongan: string;
  kodegol: string;
  angsuran: number;
  angsuranke: number;
  denda: string;
  admin_ppob: number;
  totalrekening: number;
  periodestr: string;
  rekair: string;
  total: string;
  tglbayar: string;
  loket: string;
  kasir: string;
}

export interface DRDResponPembayaranAir {
  id: number;
  periode_rek: string;
  no_pelanggan: string;
  nama: string;
  alamat: string;
  rayon: string;
  kodegol: string;
  harga_air: number;
  pemeliharaan: number;
  administrasi: number;
  stanskrg: number;
  stanlalu: number;
  pakaiskrg: number;
  meterai: number;
  angsuran: number;
  angsuranke: number;
  denda1: number;
  denda2: number;
  denda3: number;
  totalrekening: number;
  tglbayar: null;
  nama_user: null;
  nama_loket: null;
}
