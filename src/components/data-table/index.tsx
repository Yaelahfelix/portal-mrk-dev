"use client";

import React, { useEffect, useState } from "react";
import {
  DataGridPro,
  GridColDef,
  GridPaginationModel,
  GridRenderCellParams,
  GridFooterContainer,
  GridFooter,
  GridRowParams,
} from "@mui/x-data-grid-pro";
import { ColumnDef } from "@tanstack/react-table";
import { PaginationResultType } from "@/types/pagination";
import { useRouter } from "next/navigation";
import useUpdateQuery from "@/components/hooks/useUpdateQuery";
import { Box, Paper, Typography } from "@mui/material";
import { formatRupiah, sumDecimal } from "@/core/lib/utils";
import { Pagination, Select, SelectItem } from "@heroui/react";

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
}: DataTableProps<TData, TValue>) {
  const router = useRouter();
  const updateQuery = useUpdateQuery();
  const [hasMounted, setHasMounted] = useState(false);

  // Get current page and limit from pagination props (from URL)
  const currentPage = pagination?.currentPage || 1;
  const currentLimit = parseInt(limitPage) || 10;

  // --- PAGINATION STATE (for MUI DataGrid display) ---
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: currentPage - 1, // MUI is 0-indexed
    pageSize: currentLimit,
  });

  // --- COLUMNS ADAPTER ---
  const muiColumns = React.useMemo(() => adaptColumns(columns), [columns]);

  // --- EFFECT: MOUNT ---
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // --- EFFECT: SYNC PROPS TO STATE (one-way: props -> state) ---
  useEffect(() => {
    setPaginationModel({
      page: currentPage - 1,
      pageSize: currentLimit,
    });
  }, [currentPage, currentLimit]);

  // Handle limit change - directly update URL
  const handleLimitChange = (val: any) => {
    const newLimit = parseInt(val.target.value);
    if (isDynamicPagination && !disabledPagination) {
      updateQuery({ limit: newLimit, page: 1 }); // Reset to page 1
    } else {
      setPaginationModel(prev => ({ ...prev, pageSize: newLimit, page: 0 }));
    }
  };

  // Handle page change - directly update URL
  const handlePageChange = (newPage: number) => {
    if (isDynamicPagination && !disabledPagination) {
      updateQuery({ page: newPage }); // newPage is already 1-indexed from HeroUI Pagination
    } else {
      setPaginationModel(prev => ({ ...prev, page: newPage - 1 }));
    }
  };

  // --- PREPARE ROWS ---
  const rows = React.useMemo(() => {
    return data.map((item: any, index) => ({
      id: item.id ?? index,
      ...item,
    }));
  }, [data]);

  // --- TOTAL CALCULATIONS ---
  const rowCount =
    isDynamicPagination && pagination?.totalRecords
      ? pagination.totalRecords
      : data.length;

  const totalPages = isDynamicPagination ? (pagination?.totalPages || 0) : Math.ceil(data.length / paginationModel.pageSize);


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

  // --- CUSTOM FOOTER ---
  const CustomFooter = () => {
    // Use MUI GridFooterContainer to keep standardized styling
    // Insert the custom pagination layout inside
    return (
      <GridFooterContainer sx={{ borderTop: 'none', justifyContent: 'space-between', p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {/* Summary Row */}
        {(showFooter && footerConfig) && (
          <Box sx={{ display: "flex", width: "100%", gap: 4, overflow: "auto", borderBottom: '1px solid var(--color-border)', pb: 2 }}>
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
        )}

        {/* Pagination Row */}
        {!disabledPagination && (
          <div className="flex w-full gap-4 justify-end items-center">

            {/* Label for limit */}
            <span className="text-small text-default-400 whitespace-nowrap">
              Limit per page
            </span>

            {/* Select for limit - increased width to prevent overlap */}
            <Select
              className="w-24 min-w-[80px]"
              size="sm"
              variant="bordered"
              selectedKeys={[String(currentLimit)]}
              onChange={handleLimitChange}
              disallowEmptySelection
              aria-label="Limit per page"
              classNames={{
                trigger: "min-h-8",
                value: "text-small",
              }}
            >
              <SelectItem key="10">10</SelectItem>
              <SelectItem key="25">25</SelectItem>
              <SelectItem key="50">50</SelectItem>
              <SelectItem key="100">100</SelectItem>
            </Select>

            <Pagination
              showControls
              total={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              size="sm"
              className="gap-1"
              classNames={{
                wrapper: "gap-1",
                item: "min-w-8 h-8",
                cursor: "min-w-8 h-8",
                prev: "min-w-8 h-8",
                next: "min-w-8 h-8",
              }}
            />
          </div>
        )}
      </GridFooterContainer>
    );
  };

  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        overflow: "hidden",
        bgcolor: "background.paper", // Force white background
        border: "1px solid var(--color-border)",
        borderRadius: "12px", // Match DashboardCard typically
      }}
      className={className}
    >
      {showTotalRecord && (
        <Box sx={{ p: 2, display: "flex", justifyContent: "flex-end" }}>
          <Typography variant="body2" color="textSecondary">
            Total Data: {rowCount}
          </Typography>
        </Box>
      )}

      <DataGridPro
        rows={rows}
        columns={muiColumns}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[10, 25, 50, 100]}
        paginationMode={isDynamicPagination ? "server" : "client"}
        rowCount={rowCount}
        // Slots
        slots={{
          footer: CustomFooter,
        }}
        // Master Detail
        getDetailPanelContent={canExpand ? getDetailPanelContent : undefined}
        getDetailPanelHeight={() => "auto"}
        // Styling & Behavior
        disableRowSelectionOnClick
        autoHeight={true}
        hideFooterPagination // Hide default MUI pagination to show custom one via Footer slot
        sx={{
          border: "none",
          "& .MuiDataGrid-columnHeaders": {
            bgcolor: "grey.50",
            color: "text.secondary",
            fontWeight: 600,
            textTransform: "uppercase",
            fontSize: "0.75rem",
          },
          "& .MuiDataGrid-row:hover": {
            bgcolor: "grey.50"
          },
          "& .MuiDataGrid-cell": {
            display: "flex",
            alignItems: "center",
          }
        }}
      />
    </Paper>
  );
}
