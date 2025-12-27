export interface MasterPetugas {
  id: number;
  nama: string;
  role: string;
  no_telp: string;
  divisi_id: number;
  username: string;
  is_active: boolean;
  namaDivisi: string;
}

export interface Divisi {
  id: number;
  nama: string;
}