"use client";

import { Kolektif } from "./type";
import { DataTable } from "@/components/data-table";
import { columnsPelanggan } from "./columnPelanggan";
import { Divider } from "@heroui/react";

export const tableDetail = (kolektif: Kolektif) => {
    return (
        <>
            <div className="p-4">
                <h4 className="font-semibold">Detail Pelanggan</h4>
                <Divider className="my-3" />
                <DataTable
                    columns={columnsPelanggan}
                    data={kolektif.pelanggan_array || []}
                    limitPage="10"
                    disabledPagination
                />
            </div>
        </>
    );
};

export const canTableDetail = (kolektif: Kolektif) => {
    return Boolean(kolektif.pelanggan_array && kolektif.pelanggan_array.length > 0);
};
