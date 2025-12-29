"use client";

import { ColumnDef } from "@tanstack/react-table";
import { User } from "@/types/user";
import Actions from "./actions";
import { Chip } from "@heroui/react";
import { formatRupiah } from "@/core/lib/utils";
import { Diameter } from "@/types/diameter";
import { Wilayah } from "./type";

export const columns: ColumnDef<Wilayah>[] = [
  {
    accessorKey: "nama",
    header: "Nama",
  },
  {
    accessorKey: "nama_kepala",
    header: "Nama Kepala",
  },
  {
    accessorKey: "jabatan",
    header: "Jabatan",
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => <Actions wilayah={row.original} />,
  },
];
