export interface Kolektif {
    id: number;
    no_kolektif: string;
    nama: string;
    telp: string;
    pelanggan_array?: Pelanggan[];
}

export interface Pelanggan {
    id: number;
    kolektif_id: number;
    no_pelanggan: string;
    nama_pelanggan: string;
}
