"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Kolektif } from "./type";
import Actions from "./actions";

export const columns: ColumnDef<Kolektif>[] = [
    {
        accessorKey: "no_kolektif",
        header: "Nomor Kolektif",
    },
    {
        accessorKey: "nama",
        header: "Nama Kolektif",
    },
    {
        accessorKey: "telp",
        header: "Telp",
    },
    {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ row }) => <Actions kolektif={row.original} />,
    },
];
