"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Pelanggan } from "./type";

export const columnsPelanggan: ColumnDef<Pelanggan>[] = [
    {
        accessorKey: "no_pelanggan",
        header: "No Pelanggan",
    },
    {
        accessorKey: "nama_pelanggan",
        header: "Nama Pelanggan",
    },
];
