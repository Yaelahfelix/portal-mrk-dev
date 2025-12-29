export interface Kecamatan {
  id: number;
  nama: string;
  kelurahan: Kelurahan[];
}

export interface Kelurahan {
  id: number;
  nama: string;
}
