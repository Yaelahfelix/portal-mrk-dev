"use client";

import { DataTable } from "@/components/data-table";
import { Diameter } from "@/core/types/diameter";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { canTableDetail } from "./detailTableRow";
import TableDetail from "./detailTable";
import { Wilayah } from "./type";

type Props = {
  columns: ColumnDef<Wilayah>[];
  data: any;
  params: any;
};

const DataTableClient = ({ columns, data, params }: Props) => {
  const renderRowAccordionContent = (wilayah: Wilayah) => {
    return <TableDetail wilayah={wilayah} />;
  };
  return (
    <DataTable
      columns={columns}
      data={data.data}
      pagination={data.pagination}
      limitPage={(params.limit as string) || "10"}
      canExpand={canTableDetail}
      renderRowAccordionContent={renderRowAccordionContent}
    />
  );
};

export default DataTableClient;
