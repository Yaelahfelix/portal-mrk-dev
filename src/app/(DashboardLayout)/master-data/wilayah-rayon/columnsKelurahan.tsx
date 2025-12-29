"use client";

import { ColumnDef } from "@tanstack/react-table";
import { User } from "@/types/user";
import { Chip } from "@heroui/react";
import { formatRupiah } from "@/core/lib/utils";
import { Diameter } from "@/types/diameter";
import Actions from "./actionsKelurahan";
import { Rayon } from "./type";

export const columns: ColumnDef<Rayon>[] = [
  {
    accessorKey: "nama",
    header: "Nama Rayon",
  },
  {
    accessorKey: "kode_rayon",
    header: "Kode Rayon",
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => <Actions rayon={row.original} />,
  },
];
