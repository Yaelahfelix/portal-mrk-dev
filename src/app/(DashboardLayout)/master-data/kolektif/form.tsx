"use client";

import { ErrorResponse } from "@/types/axios";
import { addToast } from "@heroui/react";
import api from "@/core/lib/api";
import { AxiosError } from "axios";
import { Formik, FormikHelpers } from "formik";
import React, { useCallback, useState, useEffect, useRef } from "react";
import { mutate } from "swr";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Box,
    CircularProgress,
    IconButton,
    InputAdornment,
    Tooltip,
} from "@mui/material";
import { Refresh } from "@mui/icons-material";

// Interface untuk Kolektif
export interface KolektifForm {
    id?: number;
    no_kolektif: string;
    nama: string;
    telp: string;
}

type FormType = {
    no_kolektif: string;
    nama: string;
    telp: string;
};

export const Form = ({
    isEdit = false,
    kolektif,
    diclosure,
}: {
    isEdit?: boolean;
    kolektif?: KolektifForm;
    diclosure: {
        isOpen: boolean;
        onOpenChange: () => void;
    };
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedNoKolektif, setGeneratedNoKolektif] = useState<string>("");
    const formikRef = useRef<any>(null);
    const { isOpen, onOpenChange } = diclosure;

    // Function to generate/fetch nomor kolektif from backend
    const generateNoKolektif = useCallback(async () => {
        if (isEdit) return; // Only generate for create mode

        setIsGenerating(true);
        try {
            const response = await api.get("/api/portal/master-data/master-kolektif/generate-no-kolektif");
            const noKolektif = response.data?.data?.nomor_kolektif || "";
            setGeneratedNoKolektif(noKolektif);

            // Update formik value if ref is available
            if (formikRef.current) {
                formikRef.current.setFieldValue("no_kolektif", noKolektif);
            }
        } catch (error) {
            addToast({
                color: "danger",
                title: "Gagal generate nomor kolektif",
                description: "Silakan coba lagi",
            });
        } finally {
            setIsGenerating(false);
        }
    }, [isEdit]);

    // Auto-generate nomor kolektif when dialog opens (create mode only)
    useEffect(() => {
        if (isOpen && !isEdit) {
            generateNoKolektif();
        }
        // Reset when dialog closes
        if (!isOpen) {
            setGeneratedNoKolektif("");
        }
    }, [isOpen, isEdit, generateNoKolektif]);

    const initialValues: FormType = {
        no_kolektif: isEdit ? (kolektif?.no_kolektif || "") : generatedNoKolektif,
        nama: kolektif?.nama || "",
        telp: kolektif?.telp || "",
    };

    const handleSubmit = useCallback(
        async (
            values: FormType,
            { setFieldError }: FormikHelpers<FormType>,
            onClose: () => void
        ) => {
            setIsLoading(true);
            const method = isEdit ? "put" : "post";

            const payload = {
                ...values,
                id: kolektif?.id || null,
            };

            api[method]("/api/portal/master-data/master-kolektif", payload)
                .then((res) => {
                    addToast({ color: "success", title: res.data.message });
                    onClose();
                    mutate(() => true);
                })
                .catch((err: AxiosError<ErrorResponse>) => {
                    if (err.response?.status === 409) {
                        addToast({
                            color: "danger",
                            title: "Kolektif sudah ada!",
                            description: err.response?.data.message,
                        });
                        return;
                    }
                    if (err.status !== 500 && err.status !== 401) {
                        if (err.response?.data.message?.includes("no_kolektif")) {
                            return setFieldError("no_kolektif", err.response?.data.message);
                        }
                        if (err.response?.data.message?.includes("nama")) {
                            return setFieldError("nama", err.response?.data.message);
                        }
                        return setFieldError("no_kolektif", err.response?.data.message);
                    }
                    addToast({
                        color: "danger",
                        title: "Terjadi kesalahan",
                        description: err.response?.data.message || "Silakan coba lagi",
                    });
                })
                .finally(() => setIsLoading(false));
        },
        [isEdit, kolektif?.id]
    );

    return (
        <Dialog
            open={isOpen}
            onClose={onOpenChange}
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle>
                {isEdit ? "Edit" : "Tambah"} Kolektif
            </DialogTitle>
            <Formik
                innerRef={formikRef}
                initialValues={initialValues}
                enableReinitialize={!isEdit}
                onSubmit={(values, actions) =>
                    handleSubmit(values, actions, onOpenChange)
                }
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleSubmit,
                    handleBlur,
                }) => {
                    return (
                        <form onSubmit={handleSubmit}>
                            <DialogContent>
                                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        label="Nomor Kolektif"
                                        name="no_kolektif"
                                        type="text"
                                        value={values.no_kolektif}
                                        error={!!errors.no_kolektif && !!touched.no_kolektif}
                                        // helperText={
                                        //     touched.no_kolektif && errors.no_kolektif
                                        //         ? errors.no_kolektif
                                        //         : !isEdit
                                        //             ? "Nomor kolektif di-generate otomatis"
                                        //             : undefined
                                        // }
                                        onChange={isEdit ? handleChange : undefined}
                                        onBlur={handleBlur}
                                        placeholder={isGenerating ? "Generating..." : "Nomor Kolektif"}
                                        disabled={!isEdit}
                                        slotProps={{
                                            input: {
                                                endAdornment: !isEdit ? (
                                                    <InputAdornment position="end">
                                                        <Tooltip title="Generate ulang nomor kolektif">
                                                            <IconButton
                                                                onClick={generateNoKolektif}
                                                                disabled={isGenerating}
                                                                edge="end"
                                                                size="small"
                                                            >
                                                                {isGenerating ? (
                                                                    <CircularProgress size={20} />
                                                                ) : (
                                                                    <Refresh />
                                                                )}
                                                            </IconButton>
                                                        </Tooltip>
                                                    </InputAdornment>
                                                ) : undefined,
                                            },
                                        }}
                                    />
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        label="Nama"
                                        name="nama"
                                        type="text"
                                        value={values.nama}
                                        error={!!errors.nama && !!touched.nama}
                                        helperText={touched.nama && errors.nama}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="Masukkan nama"
                                    />
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        label="Telepon"
                                        name="telp"
                                        type="text"
                                        value={values.telp}
                                        error={!!errors.telp && !!touched.telp}
                                        helperText={touched.telp && errors.telp}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="Masukkan nomor telepon"
                                    />
                                </Box>
                            </DialogContent>
                            <DialogActions sx={{ px: 3, pb: 2 }}>
                                <Button
                                    color="error"
                                    variant="outlined"
                                    onClick={onOpenChange}
                                >
                                    Batal
                                </Button>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    type="submit"
                                    disabled={isLoading}
                                    startIcon={isLoading ? <CircularProgress size={16} color="inherit" /> : null}
                                >
                                    {isEdit ? "Update" : "Simpan"} Kolektif
                                </Button>
                            </DialogActions>
                        </form>
                    );
                }}
            </Formik>
        </Dialog>
    );
};
