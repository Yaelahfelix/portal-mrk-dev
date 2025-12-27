export type Rayon = {
  id: number;
  kode_rayon: string;
  nama: string;
  aktif: number;
};

export type Wilayah = {
  id: number;
  nama: string;
  nama_kepala: string;
  jabatan: string;
  created_at: string;
  updated_at: string;
  rayon: Rayon[];
};
