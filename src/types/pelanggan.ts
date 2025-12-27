export interface Diameter {
    id: number;
    nama: string;
    ukuran?: number;
}

export interface Jalan {
    id: number;
    nama: string;
    kelurahan_id?: number;
}

export interface Golongan {
    id: number;
    kode_golongan: string;
    nama: string;
    administrasi?: number;
    pemeliharaan?: number;
    retribusi?: number;
    pelayanan?: number;
}

export interface Kecamatan {
    id: number;
    nama: string;
    kelurahan?: Kelurahan[];
}

export interface Kelurahan {
    id: number;
    nama: string;
    kec_id?: number;
}

export interface Rayon {
    id: number;
    kode_rayon: string;
    nama: string;
    wilayah_id?: number;
    aktif?: number;
}

export interface Wilayah {
    id: number;
    nama: string;
    nama_kepala?: string;
    jabatan?: string;
    rayon?: Rayon[];
}

export interface Pelanggan {
    id: number;
    no_pelanggan: string;
    nama: string;
    alamat: string;
    diameter_id?: number;
    golongan_id?: number;
    kecamatan_id?: number;
    kelurahan_id?: number;
    rayon_id?: number;
    wilayah_id?: number;
    diameter?: Diameter;
    golongan?: Golongan;
    kecamatan?: Kecamatan;
    kelurahan?: Kelurahan;
    rayon?: Rayon;
    wilayah?: Wilayah;
}
