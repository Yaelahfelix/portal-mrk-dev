"use client";

import { Golongan } from "./type";
import { columns } from "./columnTarif";
import { DataTable } from "@/components/data-table";

export const tableDetailTarif = (golongan: Golongan) => {
  return (
    <>
      <DataTable
        limitPage="10"
        columns={columns}
        data={golongan.tarif_values || []}
        disabledPagination
      />
    </>
  );
};

export const canTableDetailTarif = (golongan: Golongan) => {
  return Boolean(golongan.tarif_values);
};
