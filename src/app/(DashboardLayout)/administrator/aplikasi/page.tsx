"use client";

import { useCallback, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useSWR from "swr";

// Layout
import PageContainer from "@/components/container/PageContainer";
import DashboardCard from "@/components/shared/DashboardCard";

// API
import api, { fetcher } from "@/core/lib/api";

// UI MUI
import {
    Alert,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

// Icons
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

// Data Grid
import {
    DataGridPro,
    GridActionsCellItem,
    type GridColDef,
} from "@mui/x-data-grid-pro";

// -------------------------------------------------------------
// 1. Types & Interfaces
// -------------------------------------------------------------
interface AplikasiItem {
    id: number;
    nama: string;
    icon: string;
    url: string;
}

type AplikasiFormValues = {
    nama: string;
    url: string;
};

// -------------------------------------------------------------
// 2. Default Values
// -------------------------------------------------------------
const defaultValues: AplikasiFormValues = {
    nama: "",
    url: "",
};

// -------------------------------------------------------------
// 3. Custom Hook for Aplikasi
// -------------------------------------------------------------
const useAplikasiList = () => {
    const { data, error, isLoading, isValidating, mutate } = useSWR<{ data: AplikasiItem[] }>(
        "/api/portal/manajemen-aplikasi",
        fetcher,
        {
            revalidateOnFocus: false,
        }
    );

    return {
        data: data?.data || [],
        error,
        isLoading,
        isValidating,
        refresh: mutate,
    };
};

// -------------------------------------------------------------
// 4. Main Component
// -------------------------------------------------------------
const AdministratorAplikasiPage = () => {
    const { data, error, isLoading, isValidating, refresh } = useAplikasiList();

    const [formMode, setFormMode] = useState<"create" | "edit">("create");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<AplikasiItem | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<AplikasiItem | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<AplikasiFormValues>({ defaultValues });

    const rows = useMemo(() => data || [], [data]);

    // -------------------------------------------------------------
    // Handlers
    // -------------------------------------------------------------
    const handleOpenCreate = useCallback(() => {
        setFormMode("create");
        setEditingItem(null);
        reset(defaultValues);
        setDialogOpen(true);
    }, [reset]);

    const handleOpenEdit = useCallback(
        (item: AplikasiItem) => {
            setFormMode("edit");
            setEditingItem(item);

            reset({
                nama: item.nama,
                url: item.url,
            });

            setDialogOpen(true);
        },
        [reset],
    );

    const handleCloseDialog = useCallback(() => {
        if (isSubmitting) return;
        setDialogOpen(false);
    }, [isSubmitting]);

    const handleSubmitForm = async (values: AplikasiFormValues) => {
        try {
            if (formMode === "edit" && editingItem) {
                await api.put(`/api/portal/manajemen-aplikasi/${editingItem.id}`, values);
                toast.success("Aplikasi berhasil diperbarui.");
            } else {
                await api.post("/api/portal/manajemen-aplikasi", values);
                toast.success("Aplikasi baru berhasil ditambahkan.");
            }

            setDialogOpen(false);
            refresh();
        } catch (submitError: any) {
            toast.error(
                submitError.response?.data?.message || "Gagal menyimpan data",
            );
        }
    };

    const onError = () => {
        toast.error("Mohon lengkapi data form dengan benar.");
    };

    const handleOpenDelete = useCallback((item: AplikasiItem) => {
        setDeleteTarget(item);
    }, []);

    const handleCloseDelete = useCallback(() => {
        if (isDeleting) return;
        setDeleteTarget(null);
    }, [isDeleting]);

    const handleConfirmDelete = useCallback(async () => {
        if (!deleteTarget) return;

        try {
            setIsDeleting(true);
            await api.delete(`/api/portal/manajemen-aplikasi/${deleteTarget.id}`);
            toast.success("Aplikasi berhasil dihapus.");
            setDeleteTarget(null);
            refresh();
        } catch (deleteError: any) {
            toast.error(
                deleteError.response?.data?.message || "Gagal menghapus data",
            );
        } finally {
            setIsDeleting(false);
        }
    }, [deleteTarget, refresh]);

    // -------------------------------------------------------------
    // DataGrid Columns
    // -------------------------------------------------------------
    const columns = useMemo<GridColDef<AplikasiItem>[]>(
        () => [
            {
                field: "actions",
                type: "actions",
                headerName: "Aksi",
                width: 100,
                getActions: (params) => [
                    <GridActionsCellItem
                        key="edit"
                        icon={<EditIcon />}
                        label="Ubah"
                        onClick={() => handleOpenEdit(params.row)}
                    />,
                    <GridActionsCellItem
                        key="delete"
                        icon={<DeleteIcon />}
                        label="Hapus"
                        onClick={() => handleOpenDelete(params.row)}
                    />,
                ],
            },
            { field: "nama", headerName: "Nama Aplikasi", flex: 1, minWidth: 200 },
            { field: "url", headerName: "URL", flex: 2, minWidth: 300 },
        ],
        [handleOpenEdit, handleOpenDelete],
    );

    // -------------------------------------------------------------
    // Render
    // -------------------------------------------------------------
    return (
        <div className="my-10 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
            {/* Breadcrumb */}
            <ul className="flex gap-2">
                <li className="flex gap-2">
                    <span>Dashboard</span>
                    <span>/</span>
                </li>
                <li className="flex gap-2">
                    <span>Administrator</span>
                    <span>/</span>
                </li>
                <li className="flex gap-2">
                    <span>Manajemen Aplikasi</span>
                </li>
            </ul>

            <h3 className="text-xl font-semibold">Daftar Aplikasi</h3>

            {/* Search & Add Button */}
            <div className="flex justify-between flex-wrap gap-4 items-center">
                <div className="flex items-center gap-3 flex-wrap md:flex-nowrap" />
                <div className="flex flex-row gap-3.5 flex-wrap">
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={handleOpenCreate}
                    >
                        Tambah Aplikasi
                    </Button>
                </div>
            </div>

            {error && <Alert severity="error">Gagal memuat data aplikasi</Alert>}

            {/* Data Table with master-data styling */}
            <Box
                sx={{
                    width: "100%",
                    overflow: "hidden",
                    bgcolor: "background.paper",
                    borderRadius: "12px",
                    boxShadow: 3,
                }}
            >
                <DataGridPro
                    autoHeight
                    rows={rows}
                    columns={columns}
                    disableRowSelectionOnClick
                    loading={isLoading || isValidating}
                    pagination
                    pageSizeOptions={[10, 25, 50, 100]}
                    initialState={{
                        pagination: { paginationModel: { pageSize: 10 } },
                    }}
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
            </Box>

            {/* FORM DIALOG */}
            <Dialog
                open={dialogOpen}
                onClose={handleCloseDialog}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>
                    {formMode === "edit" ? "Ubah Aplikasi" : "Tambah Aplikasi"}
                </DialogTitle>

                <Box
                    component="form"
                    onSubmit={handleSubmit(handleSubmitForm, onError)}
                    noValidate
                >
                    <DialogContent dividers>
                        <Stack spacing={2}>
                            {/* NAMA */}
                            <Controller
                                name="nama"
                                control={control}
                                rules={{ required: "Nama aplikasi wajib diisi" }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Nama Aplikasi"
                                        required
                                        fullWidth
                                        error={Boolean(errors.nama)}
                                        helperText={errors.nama?.message}
                                    />
                                )}
                            />

                            {/* URL */}
                            <Controller
                                name="url"
                                control={control}
                                rules={{ required: "URL wajib diisi" }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="URL"
                                        required
                                        fullWidth
                                        error={Boolean(errors.url)}
                                        helperText={errors.url?.message}
                                    />
                                )}
                            />
                        </Stack>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={handleCloseDialog} disabled={isSubmitting}>
                            Batal
                        </Button>
                        <LoadingButton
                            type="submit"
                            variant="contained"
                            loading={isSubmitting}
                        >
                            {formMode === "edit" ? "Simpan Perubahan" : "Simpan"}
                        </LoadingButton>
                    </DialogActions>
                </Box>
            </Dialog>

            {/* DELETE DIALOG */}
            <Dialog
                open={Boolean(deleteTarget)}
                onClose={handleCloseDelete}
                maxWidth="xs"
                fullWidth
            >
                <DialogTitle>Hapus Aplikasi</DialogTitle>
                <DialogContent dividers>
                    <Typography>
                        Yakin ingin menghapus aplikasi <strong>{deleteTarget?.nama}</strong>?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDelete} disabled={isDeleting}>
                        Batal
                    </Button>
                    <LoadingButton
                        onClick={handleConfirmDelete}
                        color="error"
                        variant="contained"
                        loading={isDeleting}
                    >
                        Hapus
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AdministratorAplikasiPage;
