export interface DataKolektif {
    id?: number;
    no_kolektif?: string;
    nama?: string;
    alamat?: string;
}

export interface TagihanBlmLunasInfoPel {
    id: number;
    periode: string;
    stan_lalu: number;
    stan_skrg: number;
    pakai: number;
    total_tagihan: number;
    denda?: number;
}

export interface TagihanSdhLunasInfoPel {
    id: number;
    periode: string;
    stan_lalu: number;
    stan_skrg: number;
    pakai: number;
    total_bayar: number;
    tgl_bayar: string;
}

export interface TotalTagihan {
    total_tagihan: number;
    total_denda: number;
    total_bayar: number;
}
