export interface Divisi {
    id: number;
    nama: string;
    kode?: string;
}

export interface Petugas {
    id: number;
    nama: string;
    nip?: string;
    divisi_id?: number;
    divisi?: Divisi;
    aktif?: number;
}
