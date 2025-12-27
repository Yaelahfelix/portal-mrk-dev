export interface Pelanggan {
  id: number;
  status: number;
  no_pelanggan: string;
  nama: string;
  alamat: string;
  tmp_lahir: string;
  tgl_lahir: string;
  no_ktp: string;
  no_kk: string;
  no_telp: string;
  flagdomestik: number;
  no_hp: string;
  email: string;
  pekerjaan: string;
  jumlah_penghuni: number;
  jenis_bangunan: string;
  kepemilikan: string;
  nama_pemilik: string;
  merek_id: number;
  no_meter: string;
  golongan_id: number;
  kode_golongan: string;
  wilayah_id: number;
  rayon_id: number;
  jalan_id: number;
  diameter_id: number;
  kec_id: number;
  kel_id: number;
  kolektif_id: number;
  latitude: string;
  longitude: string;
  tgl_pasif: string;
  tgl_pasang: string;
  tgl_aktif: string;
  mbr: number;
  urutanbaca: number;
  namaGolongan: string;
  namaRayon: string;
  history_pelanggan: any[];
  no_regis: string;
  pendaftaranpel_id: number;
}

export interface Wilayah {
  id: number;
  nama: string;
}

export interface Rayon {
  id: number;
  nama: string;
  kode_rayon: string;
}

export interface Jalan {
  id: number;
  nama: string;
}

export interface Golongan {
  id: number;
  nama: string;
  kode_golongan: string;
}

export interface Kecamatan {
  id: number;
  nama: string;
}

export interface Kelurahan {
  id: number;
  nama: string;
}

export interface Diameter {
  id: number;
  nama: string;
}
