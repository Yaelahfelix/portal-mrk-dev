import api from "@/core/lib/api";
import type { RoleItem, RoleListResponse, RolePayload } from "./RolesEntity";

export default class RolesRepository {
    private readonly baseUrl = "/api/portal/manajemen-role/roles";

    async getAll(): Promise<RoleItem[]> {
        const { data } = await api.get<RoleListResponse>(this.baseUrl);
        return data.data;
    }

    async create(payload: RolePayload): Promise<void> {
        await api.post(this.baseUrl, payload);
    }

    async update(id: number, payload: RolePayload): Promise<void> {
        await api.put(`${this.baseUrl}/${id}`, payload);
    }

    async delete(id: number): Promise<void> {
        await api.delete(`${this.baseUrl}/${id}`);
    }
}
