export interface PenugasanPelayananLain {
  id: number;
  nomor_penugasan: string;
  divisi_id: number;
  created_at: string;
  updated_at: string;
  divisi: string;
  flagproses: number;
  detail_penugasan: {
    kepala_wilayah: string;
    wilayah: string;
    data: DetailpenugasanPelayananLain[];
    jabatan: string;
  }[];
}

export interface DetailpenugasanPelayananLain {
  id: number;
  nama: string;
  biaya: number;
  jenis: string;
  alamat: string;
  tanggal: string;
  no_regis: string;
  flaglunas: number;
  flagproses: number;
  no_pelanggan: string;
  flagrealisasi: number;
  no_hp: string;
}
