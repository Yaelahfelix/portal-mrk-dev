"use client";

import { ColumnDef } from "@tanstack/react-table";
import { User } from "@/core/types/user";
import Actions from "./actions";
import { Chip } from "@heroui/react";
import { formatRupiah } from "@/core/lib/utils";
import { Diameter } from "@/core/types/diameter";
import { Kecamatan } from "./type";

export const columns: ColumnDef<Kecamatan>[] = [
  {
    accessorKey: "nama",
    header: "Nama",
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => <Actions kecamatan={row.original} />,
  },
];
