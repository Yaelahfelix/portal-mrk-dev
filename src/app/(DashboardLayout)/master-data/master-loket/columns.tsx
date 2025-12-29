"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Chip } from "@heroui/react";
import Actions from "./actions";
import { Loket } from "./type";

export const columns: ColumnDef<Loket>[] = [
    {
        accessorKey: "kodeloket",
        header: "Kode Loket",
    },
    {
        accessorKey: "loket",
        header: "Nama Loket",
    },
    {
        accessorKey: "aktif",
        header: "Status",
        cell: ({ row }) => (
            <Chip
                color={row.original.aktif === 1 ? "success" : "danger"}
                variant="flat"
                size="sm"
            >
                {row.original.aktif === 1 ? "Aktif" : "Tidak Aktif"}
            </Chip>
        ),
    },
    {
        accessorKey: "indek",
        header: "Indeks",
    },
    {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ row }) => <Actions loket={row.original} />,
    },
];
