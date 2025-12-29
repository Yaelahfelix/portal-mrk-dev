// FORMS

export type LoginFormType = {
  username: string;
  password: string;
};

export interface UserFormType {
  id?: number | null;
  username: string;
  password: string;
  nama: string;
  jabatan: string;
  role_id?: number;
  no_hp: string;
  is_user_ppob: boolean;
  is_active: boolean;
  is_user_timtagih: boolean;
}

export interface MeterMereksFormType {
  id?: number | null;
  nama: string;
}

export interface PetugasFormType {
  username: string;
  password: string;
  nama: string;
  role: string;
  divisi_id?: number;
  no_telp: string;
  is_active: boolean;
}

export interface JenisNonAirFormType {
  jenis: string;
  namajenis: string;
  by_pelayanan: string;
  flagpajak: boolean;
  flagpel: boolean;
  flagproses: boolean;
  flagrealisasi: boolean;
}

export interface DivisiFormType {
  nama: string;
}

export interface PelangganFormType {
  no_pelanggan: string;
  nama: string;
  alamat: string;
  no_ktp: string;
  no_kk: string;
  no_telp: string;
  no_hp: string;
  kec_id: number;
  kel_id: number;
}

export interface PelangganRayonFormType {
  no_pelanggan: string;
  nama: string;
  rayon_id: number;
  periode: number;
}

export interface PelangganGolonganFormType {
  no_pelanggan: string;
  nama: string;
  golongan_id: number;
  diameter_id: number;
  periode: number;
}

export interface PendaftaranPasangBaruFormType {
  no_regis: string;
  tanggal: Date;
  nama: string;
  alamat: string;
  tmp_lahir: string;
  tgl_lahir: string;
  email: string;
  no_ktp: string;
  no_kk: string;
  no_telp: string;
  no_hp: string;
  pekerjaan: string;
  jumlah_penghuni: number;
  jenis_bangunan: string;
  kepemilikan: string;
  kec_id: number;
  kel_id: number;
  rayon_id: number;
  jalan_id: number;
  // is_mbr: boolean;
  group_id?: number;
  biaya: number;
  flexiblebiaya: boolean;
}

export interface PendaftaranPelayananLainFormType {
  no_regis: string;
  tanggal: Date;
  pelanggan_id: number;
  nama: string;
  alamat: string;
  jenis_nonair_id: number;
  flexiblebiaya: boolean;
  flagpajak: boolean;
  jenis: string;
  biaya: number;
  user_input: number;
  keterangan: string;
  tgl_aktif: string;
}

export interface PasangBaruFormType {
  no_rab: string;
  tglrab: Date;
  reg_id: number;
  biaya_peralatan: number;
  biaya_ongkos: number;
  biaya_lainnya: number;
  biaya_jl: number;
  biaya_survey: number;
  diskon: number;
  ppn: number;
  total: number;
  user_input: number;
  golongan_id?: number;
  diameter_id?: number;
  nama_diameter: string;
  nama: string;
  alamat: string;
  no_regis: string;
}

export interface EditPSBFormType {
  tglrab: Date;
  golongan_id?: number;
  diameter_id?: number;
  no_pelanggan?: string;
  nama_diameter: string;
  nama: string;
  alamat: string;
  wilayah_id: string;
  rayon_id: string;
  kec_id: string;
  kel_id: string;
}
export interface ProsesPersetujuanPasangBaruType {
  no_pelanggan: string;
  no_rab: string;
  tglsetuju: Date;
  reg_id: number;
  bunga: number;
  user_input: number;
  golongan_id: number;
  diameter_id: number;
  nama_diameter: string;
  nama: string;
  alamat: string;
  flagangsur: number | undefined;
  total: number;
  uangmuka: number;
  tenor: number;
  angsuranperbulan: number;
}

export interface PenugasanPasangBaruType {
  no_penugasan: string;
  divisi_id: number;
  divisi: string;
  penugasan_ids: [];
}

export interface ProsesPemasanganPasangBaruType {
  no_pelanggan: string;
  no_rab: string;
  nama: string;
  alamat: string;
  golongan: string;
  petugas_id: number;
  tglpasang: Date;
  merek_id: number;
  nama_merek: string;
  nometer: number;
  nama_petugas_pasang: string;
}

export interface ProsesRealisasiPasangBaruType {
  no_pelanggan: string;
  no_rab: string;
  tglrealisasi: Date;
  reg_id: number;
  user_input: number;
  golongan_id: number;
  diameter_id: number;
  nama_diameter: string;
  group_id: number;
  nama: string;
  alamat: string;
  flagangsur: number | undefined;
  total: number;
  uangmuka: number;
  tenor: number;
  angsuranperbulan: number;
  periode: string;
  stan: number;
  golongan: string;
  tmp_lahir: string;
  tgl_lahir: string;
  no_ktp: string;
  no_kk: string;
  no_telp: string;
  no_hp: string;
  email: string;
  pekerjaan: string;
  jumlah_penghuni: number;
  jenis_bangunan: string;
  kepemilikan: string;
  nama_pemilik: string;
  merek_id: number;
  no_meter: string;
  wilayah_id: number;
  kec_id: number;
  kel_id: number;
  rayon_id: number;
  jalan_id: number;
  is_mbr: number;
  kecamatan: string;
  kelurahan: string;
  kode_rayon: string;
  rayon: string;
  jalan: string;
  wilayah: string;
  kode_golongan: string;
  nama_golongan: string;
  nama_merek: string;
}

export interface PenugasanPelayananLainType {
  no_penugasan: string;
  divisi_id: number;
  divisi: string;
  penugasan_ids: number[];
}

export interface ProsesPemasanganPelayananLainType {
  no_pelanggan: string;
  no_regis: string;
  tglproses: Date;
  nama: string;
  alamat: string;
  petugas_id: number;
}

export interface ProsesRealisasiPelayananLainType {
  namaMeter: string;
  no_pelanggan: string;
  no_regis: string;
  tglrealisasi: Date;
  nama: string;
  alamat: string;
  periode: string;
  jenis: string;
  idMeter: string;
  isPergantianMeter: boolean;
  jenis_nonair_id: number;
  pakaim3: number;
  kec_id: number;
  kel_id: number;
  rayon_id: number;
  jalan_id: number;
  wilayah_id: number;
  kecamatan: string;
  kelurahan: string;
  kode_rayon: string;
  rayon: string;
  jalan: string;
  wilayah: string;
  golongan: string;
  golongan_id: number;
  kode_golongan: string;
  diameter_id: number;
  diameter: string;
  namabaru: string;
  alamatbaru: string;
  nikbaru: string;
  nokkbaru: string;
  nohpbaru: string;
}

export interface TTDFormType {
  header1?: string;
  header2?: string;
  header3?: string;
  header4?: string;
  id1?: number;
  id2?: number;
  id3?: number;
  id4?: number;
  is_id_1?: boolean;
  is_id_2?: boolean;
  is_id_3?: boolean;
  is_id_4?: boolean;
  nama1?: string;
  nama2?: string;
  nama3?: string;
  nama4?: string;
}
