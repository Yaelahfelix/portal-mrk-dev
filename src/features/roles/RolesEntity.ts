export interface RoleItem {
    id: number;
    nama: string;
    aplikasi_ids: (number | null)[];
}

export interface RoleListResponse {
    success: boolean;
    data: RoleItem[];
}

export interface RolePayload {
    nama: string;
    aplikasi_ids: number[];
}
