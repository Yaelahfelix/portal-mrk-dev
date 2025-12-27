"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Golongan, SKTarif, Tarifvalue } from "./type";
import { Chip } from "@heroui/react";

export const columns: ColumnDef<Tarifvalue>[] = [
  // {
  //   accessorKey: "id",
  //   header: "No",
  //   cell: ({ row }) => <span>{row.index + 1}</span>,
  // },
  {
    accessorKey: "min",
    header: "Min",
  },
  {
    accessorKey: "max",
    header: "Max",
  },
  {
    accessorKey: "harga",
    header: "Harga",
  },
  {
    accessorKey: "is_tetap",
    header: "Status",
    cell: ({ row }) =>
      !!row.original.is_tetap ? (
        <Chip color="success">Tetap</Chip>
      ) : (
        <Chip color="danger">Tidak Tetap</Chip>
      ),
  },
];
