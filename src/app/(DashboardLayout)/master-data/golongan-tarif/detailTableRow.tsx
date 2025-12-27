"use client";

import { User } from "@/core/types/user";
import { Accordion, AccordionItem, Alert, Divider } from "@heroui/react";
import { SKTarif } from "./type";
import { DataTable } from "@/components/data-table";
import { columns } from "./columnGolongan";
import {
  canTableDetailTarif,
  tableDetailTarif,
} from "./detailTableRowGolongan";

export const tableDetail = (skTarif: SKTarif) => {
  return (
    <>
      <div className="p-4">
        <h4 className="font-semibold">Detail Pelanggan</h4>
        <Divider className="my-3" />
        <DataTable
          columns={columns}
          data={skTarif.golongan || []}
          limitPage="10"
          disabledPagination
          canExpand={canTableDetailTarif}
          renderRowAccordionContent={tableDetailTarif}
        />
      </div>
    </>
  );
};

export const canTableDetail = (skTarif: SKTarif) => {
  return Boolean(skTarif.golongan);
};
