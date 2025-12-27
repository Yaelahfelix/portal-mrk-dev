"use client";

import { DataTable } from "@/components/data-table";
import { Diameter } from "@/types/diameter";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { Kecamatan } from "./type";
import { CanTableDetail } from "./detailTableRow";
import TableDetail from "./detailTable";

type Props = {
  columns: ColumnDef<Kecamatan>[];
  data: any;
  params: any;
};

const DataTableClient = ({ columns, data, params }: Props) => {
  const renderRowAccordionContent = (kecamatan: Kecamatan) => {
    return <TableDetail kecamatan={kecamatan} />;
  };
  return (
    <DataTable
      columns={columns}
      data={data.data}
      pagination={data.pagination}
      limitPage={(params.limit as string) || "10"}
      canExpand={CanTableDetail}
      renderRowAccordionContent={renderRowAccordionContent}
    />
  );
};

export default DataTableClient;
