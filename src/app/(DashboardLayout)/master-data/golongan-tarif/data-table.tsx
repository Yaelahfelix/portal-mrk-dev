"use client";

import { DataTable } from "@/components/data-table";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { canTableDetail, tableDetail } from "./detailTableRow";
import { SKTarif } from "./type";

type Props = {
  columns: ColumnDef<SKTarif>[];
  data: any;
  params: any;
};

const DataTableClient = ({ columns, data, params }: Props) => {
  return (
    <DataTable
      columns={columns}
      data={data.data}
      pagination={data.pagination}
      limitPage={(params.limit as string) || "10"}
      canExpand={canTableDetail}
      renderRowAccordionContent={tableDetail}
    />
  );
};

export default DataTableClient;
