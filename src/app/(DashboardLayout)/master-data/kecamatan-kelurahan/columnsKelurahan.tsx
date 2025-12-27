"use client";

import { ColumnDef } from "@tanstack/react-table";
import { User } from "@/core/types/user";
import { Chip } from "@heroui/react";
import { formatRupiah } from "@/core/lib/utils";
import { Diameter } from "@/core/types/diameter";
import { Kelurahan } from "./type";
import Actions from "./actionsKelurahan";

export const columns: ColumnDef<Kelurahan>[] = [
  {
    accessorKey: "nama",
    header: "Nama Kelurahan",
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => <Actions kelurahan={row.original} />,
  },
];
