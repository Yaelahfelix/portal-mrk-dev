export interface PenugasanPasangBaru {
  id: number;
  nomor_penugasan: string;
  divisi_id: number;
  created_at: string;
  updated_at: string;
  divisi: string;
  flagproses: number;
  jmlproses: string;
  detail_penugasan: {
    kepala_wilayah: string;
    jabatan: string;
    data: Detailpenugasan[];
    wilayah: string;
  }[];
  no_penugasan: string;
}

export interface Detailpenugasan {
  id: number;
  nama: string;
  alamat: string;
  no_rab: string;
  golongan: string;
  tglbayar: string;
  flaglunas: number;
  tglpasang: string;
  flagproses: number;
  nama_petugas: string;
  no_pelanggan: string;
  no_hp: string;
}
