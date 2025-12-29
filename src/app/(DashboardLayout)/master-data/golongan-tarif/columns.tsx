"use client";

import { ColumnDef } from "@tanstack/react-table";
import { SKTarif } from "./type";
import { User } from "@/types/user";
import Actions from "./actions";
import { Chip } from "@heroui/react";
import { format } from "date-fns";

export const columns: ColumnDef<SKTarif>[] = [
  // {
  //   accessorKey: "id",
  //   header: "No",
  //   cell: ({ row }) => <span>{row.index + 1}</span>,
  // },
  {
    accessorKey: "nomor_sk",
    header: "Nomor SK",
  },
  {
    accessorKey: "mulaitgl",
    header: "Mulai Tanggal",
    cell: ({ row }) => {
      const date = row.original.mulaitgl
        ? new Date(row.original.mulaitgl)
        : null;
      return <span>{date ? format(date, "dd MMM yyyy") : "-"}</span>;
    },
  },
  {
    accessorKey: "aktif",
    header: "Status",
    cell: ({ row }) =>
      !!row.original.aktif ? (
        <Chip color="success">Aktif</Chip>
      ) : (
        <Chip color="danger">Tidak Aktif</Chip>
      ),
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => <Actions user={row.original as any} />,
  },
];
