"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Golongan, SKTarif } from "./type";
import { User } from "@/core/types/user";
import Actions from "./actions";
import { Chip } from "@heroui/react";
import { formatRupiah } from "@/core/lib/utils";
import { format } from "date-fns";

export const columns: ColumnDef<Golongan>[] = [
  // {
  //   accessorKey: "id",
  //   header: "No",
  //   cell: ({ row }) => <span>{row.index + 1}</span>,
  // },
  {
    accessorKey: "kode_golongan",
    header: "Kode Gol",
  },
  {
    accessorKey: "nama",
    header: "Nama",
  },
  {
    accessorKey: "pelayanan",
    header: "Pelayanan",
  },
  {
    accessorKey: "administrasi",
    header: "Administrasi",
  },
  {
    accessorKey: "pemeliharaan",
    header: "Pemeliharaan",
  },
  {
    accessorKey: "retribusi",
    header: "Retribusi",
  },
];
