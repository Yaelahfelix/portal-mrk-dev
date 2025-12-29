export interface SKTarif {
  id: number;
  tahun: number;
  nomor_sk: string;
  aktif: number;
  mulaitgl: null | string;
  golongan?: Golongan[];
}

export interface Golongan {
  id: number;
  nama: string;
  pelayanan: number;
  retribusi: number;
  administrasi: number;
  pemeliharaan: number;
  tarif_values?: Tarifvalue[] | null;
  kode_golongan: string;
}

export interface Tarifvalue {
  id: number;
  max: number;
  min: number;
  harga: number;
  is_tetap: number;
  golongan_id: number;
}
