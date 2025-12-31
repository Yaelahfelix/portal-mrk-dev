"use client";

import React from "react";
import {
  DataGridPro,
  GridColDef,
  GridRenderCellParams,
  GridRowParams,
} from "@mui/x-data-grid-pro";
import { ColumnDef } from "@tanstack/react-table";
import { PaginationResultType } from "@/types/pagination";
import { Box, Paper, Typography } from "@mui/material";
import { formatRupiah, sumDecimal } from "@/core/lib/utils";

// Adapter untuk mengubah ColumnDef Tanstack ke GridColDef MUI
const adaptColumns = <TData, TValue>(
  columns: ColumnDef<TData, TValue>[]
): GridColDef[] => {
  return columns.map((col: any, index) => {
    // Handling accessorKey or id
    const field = col.accessorKey || col.id || `col_${index}`;
    // Handling header title
    const headerName = typeof col.header === "string" ? col.header : "";

    return {
      field,
      headerName,
      flex: 1, // Auto width
      minWidth: 150,
      renderCell: (params: GridRenderCellParams) => {
        // Jika ada custom renderer (cell property di tanstack)
        if (col.cell && typeof col.cell === "function") {
          const mockRow = {
            original: params.row,
            getValue: (key: string) => params.row[key],
          };

          try {
            const cellContent = col.cell({
              row: mockRow,
              getValue: () => params.value,
            });
            // Wrap in centered container for vertical alignment
            return (
              <Box sx={{ display: 'flex', alignItems: 'center', height: '100%', width: '100%' }}>
                {cellContent}
              </Box>
            );
          } catch (e) {
            return params.value;
          }
        }
        return params.value;
      },
    };
  });
};

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pagination?: PaginationResultType;
  limitPage: string;
  renderRowAccordionContent?: (row: TData) => React.ReactNode;
  canExpand?: (row: TData) => boolean;
  disabledPagination?: boolean;
  className?: string;
  showFooter?: boolean;
  footerConfig?: {
    [key: string]: {
      type: "sum" | "count" | "avg" | "custom" | "sumDec";
      customFunction?: (data: TData[]) => string | number;
      label?: string;
    };
  };
  showTotalRecord?: boolean;
  isDynamicPagination?: boolean;
  loading?: boolean;
}

export function DataTable<TData extends { id?: string | number }, TValue>({
  columns,
  data,
  pagination,
  limitPage,
  renderRowAccordionContent,
  canExpand,
  disabledPagination = false,
  className,
  showFooter,
  footerConfig,
  showTotalRecord = false,
  isDynamicPagination = true,
  loading = false,
}: DataTableProps<TData, TValue>) {
  // --- COLUMNS ADAPTER ---
  const muiColumns = React.useMemo(() => adaptColumns(columns), [columns]);

  // --- PREPARE ROWS ---
  const rows = React.useMemo(() => {
    return data.map((item: any, index) => ({
      id: item.id ?? index,
      ...item,
    }));
  }, [data]);

  // --- MASTER DETAIL ---
  const getDetailPanelContent = React.useCallback(
    (params: GridRowParams) => {
      if (canExpand && canExpand(params.row) && renderRowAccordionContent) {
        return (
          <Box sx={{ p: 2, bgcolor: "background.paper" }}>
            {renderRowAccordionContent(params.row)}
          </Box>
        );
      }
      return null;
    },
    [canExpand, renderRowAccordionContent]
  );

  // --- FOOTER SUMMARY (untuk showFooter) ---
  const FooterSummary = React.useMemo(() => {
    if (!showFooter || !footerConfig) return null;

    return (
      <Box sx={{ display: "flex", width: "100%", gap: 4, overflow: "auto", p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
        {Object.entries(footerConfig).map(([key, config]) => {
          let value = "";
          const fieldData = data;

          switch (config.type) {
            case "sumDec":
              value = sumDecimal(fieldData, key).toLocaleString("id-ID", {
                minimumFractionDigits: 2,
              });
              break;
            case "sum":
              value = formatRupiah(
                fieldData.reduce(
                  (sum: number, item: any) =>
                    sum + (Number(item[key]) || 0),
                  0
                )
              );
              break;
            case "count":
              value = fieldData.length.toLocaleString();
              break;
            case "avg":
              const valid = fieldData
                .map((d: any) => Number(d[key]))
                .filter((n) => !isNaN(n));
              value = valid.length
                ? (valid.reduce((a, b) => a + b, 0) / valid.length).toFixed(2)
                : "0";
              break;
            case "custom":
              value = config.customFunction
                ? String(config.customFunction(fieldData))
                : "";
              break;
          }

          return (
            <Box key={key} sx={{ display: "flex", flexDirection: "column" }}>
              {config.label && (
                <Typography variant="caption" color="textSecondary">
                  {config.label}
                </Typography>
              )}
              <Typography variant="body2" fontWeight="bold">
                {value}
              </Typography>
            </Box>
          );
        })}
      </Box>
    );
  }, [showFooter, footerConfig, data]);

  return (
    <Paper
      elevation={3}
      sx={{
        width: "100%",
        overflow: "hidden",
        bgcolor: "background.paper",
        borderRadius: "12px",
      }}
      className={className}
    >
      {showTotalRecord && (
        <Box sx={{ p: 2, display: "flex", justifyContent: "flex-end" }}>
          <Typography variant="body2" color="textSecondary">
            Total Data: {data.length}
          </Typography>
        </Box>
      )}

      <DataGridPro
        rows={rows}
        columns={muiColumns}
        loading={loading}
        // TODO: Pagination akan diimplementasi setelah backend siap
        // Untuk sementara pagination dinonaktifkan karena backend belum support
        // pagination={!disabledPagination}
        // pageSizeOptions={[10, 25, 50, 100]}
        // initialState={{
        //   pagination: { paginationModel: { pageSize: parseInt(limitPage) || 10 } },
        // }}
        hideFooterPagination
        // Master Detail
        getDetailPanelContent={canExpand ? getDetailPanelContent : undefined}
        getDetailPanelHeight={() => "auto"}
        // Styling & Behavior
        disableRowSelectionOnClick
        autoHeight={true}
        sx={{
          border: "none",
          "& .MuiDataGrid-columnHeaders": {
            bgcolor: "grey.50",
            color: "text.secondary",
            fontWeight: 600,
            textTransform: "uppercase",
            fontSize: "0.75rem",
            borderBottom: "2px solid",
            borderColor: "grey.300",
          },
          "& .MuiDataGrid-row": {
            borderBottom: "1px solid",
            borderColor: "grey.400",
          },
          "& .MuiDataGrid-row:hover": {
            bgcolor: "grey.50"
          },
          "& .MuiDataGrid-cell": {
            display: "flex",
            alignItems: "center",
            borderRight: "1px solid",
            borderColor: "grey.200",
          },
          "& .MuiDataGrid-cell:last-child": {
            borderRight: "none",
          },
          "& .MuiDataGrid-columnHeader": {
            borderRight: "1px solid",
            borderColor: "grey.300",
          },
          "& .MuiDataGrid-columnHeader:last-child": {
            borderRight: "none",
          },
        }}
      />

      {/* Footer Summary */}
      {FooterSummary}
    </Paper>
  );
}

