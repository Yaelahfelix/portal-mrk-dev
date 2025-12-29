"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";
import { cn, formatRupiah } from "@/core/lib/utils";

type FooterType = "sum" | "count" | "custom";

type FooterConfig<T> = {
  [K in keyof T]?: {
    type: FooterType;
    label?: string;
  };
};

type Props<T> = {
  data: T[];
  columns: ColumnDef<T>[];
  showFooter?: boolean;
  footerConfig?: FooterConfig<T>;
  height?: number;
};

export function SimpleDataTable<T extends Record<string, any>>({
  data,
  columns,
  showFooter = false,
  footerConfig = {},
  height = 600,
}: Props<T>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const footerValues = useMemo(() => {
    const result: Record<string, string | number> = {};

    Object.entries(footerConfig).forEach(([key, config]) => {
      if (!config) return;

      if (config.type === "sum") {
        const sum = data.reduce(
          (total, row) => total + (Number(row[key as keyof T]) || 0),
          0,
        );
        result[key] = formatRupiah(sum);
      } else if (config.type === "count") {
        result[key] = data.length;
      } else if (config.type === "custom") {
        result[key] = config.label || "";
      }
    });

    return result;
  }, [data, footerConfig]);

  const visibleColumns = table.getVisibleLeafColumns();
  const totalSize = table.getTotalSize();

  return (
    <div className="w-full overflow-hidden rounded-lg border bg-card shadow-sm">
      <div
        className="w-full overflow-auto"
        style={{ maxHeight: height, minHeight: Math.min(320, height) }}
      >
        <Table style={{ width: totalSize ? totalSize : "100%" }}>
          <TableHeader className="sticky top-0 z-10 bg-card">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    style={{
                      width: header.getSize(),
                      minWidth: header.getSize(),
                    }}
                    className="whitespace-nowrap text-sm font-semibold uppercase tracking-wide"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row, rowIndex) => (
                <TableRow
                  key={row.id}
                  className={cn(
                    rowIndex % 2 === 0 ? "bg-background" : "bg-muted/40",
                    "transition-colors hover:bg-muted/60",
                  )}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      style={{
                        width: cell.column.getSize(),
                        minWidth: cell.column.getSize(),
                      }}
                      className="align-top text-sm"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-32 text-center"
                >
                  Data tidak tersedia
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          {showFooter && (
            <TableFooter>
              <TableRow className="bg-muted/40 font-semibold">
                {visibleColumns.map((column) => {
                  // @ts-ignore
                  const key = (column.columnDef.accessorKey ||
                    column.id) as string;
                  return (
                    <TableCell
                      key={column.id}
                      style={{
                        width: column.getSize(),
                        minWidth: column.getSize(),
                      }}
                    >
                      {footerValues[key] ?? ""}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableFooter>
          )}
        </Table>
      </div>
    </div>
  );
}
