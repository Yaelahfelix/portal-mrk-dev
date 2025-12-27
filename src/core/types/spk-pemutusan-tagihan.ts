export interface DataUtamaDRDPemutusanTagihan {
  status: number;
  data: DataDRDPemutusanTagihan[];
  total: Total;
  filter: string;
}

interface Total {
  sisarek: number;
  sisatagihan: number;
  jrek: number;
  ttltagihan: number;
  ttltagihanlunas: number;
  lbrlunas: number;
}

export interface DataDRDPemutusanTagihan {
  drd_id: number;
  user_id: number;
  denda: string;
  rekair: string;
  angsuran: string;
  minper: string;
  maxper: string;
  no_pelanggan: string;
  nama: string;
  jmlrek: number;
  lbrlunas: string;
  dendalunas: string;
  rekairlunas: string;
  angsuranlunas: string;
  meterailunas: string;
  meteraitagih: string;
  userlunas: string;
  timtagih: string;
  tglbayar: string;
  alamat: string;
  no_hp: null | string;
  latitude: string;
  longitude: string;
  kode_golongan: string;
  periodetag: string;
  rayon: string;
  rayon_id: number;
  wilayah_id: string;
  ttltagihan: string;
  ttltagihanlunas: string;
  sisarek: string;
  sisatagihan: string;
  status: number;
  jrek: number;
}
