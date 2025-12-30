"use client";

import { ErrorResponse } from "@/types/axios";
import { addToast } from "@heroui/react";
import api from "@/core/lib/api";
import { AxiosError } from "axios";
import { Formik, FormikHelpers } from "formik";
import React, { useCallback, useState } from "react";
import { Loket } from "./type";
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
    FormControlLabel,
    Switch,
} from "@mui/material";

interface LoketFormType {
    kodeloket: string;
    loket: string;
    aktif: number;
    indek: number;
}

export const Form = ({
    isEdit = false,
    loket,
    diclosure,
}: {
    isEdit?: boolean;
    loket?: Loket;
    diclosure: {
        isOpen: boolean;
        onOpenChange: () => void;
    };
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const { isOpen, onOpenChange } = diclosure;

    const initialValues: LoketFormType = {
        kodeloket: loket?.kodeloket || "",
        loket: loket?.loket || "",
        aktif: loket?.aktif ?? 1,
        indek: loket?.indek || 1,
    };

    const handleSubmit = useCallback(
        async (
            values: LoketFormType,
            { setFieldError }: FormikHelpers<LoketFormType>,
            onClose: () => void
        ) => {
            setIsLoading(true);
            const method = isEdit ? "put" : "post";

            const submitValues = {
                ...values,
            };

            api[method]("/api/portal/master-data/master-loket", {
                id: loket?.id || null,
                ...submitValues,
            })
                .then((res) => {
                    addToast({ color: "success", title: res.data.message });
                    onClose();
                    mutate(() => true);
                })
                .catch((err: AxiosError<ErrorResponse>) => {
                    if (err.status !== 500 && err.status !== 401) {
                        return setFieldError("loket", err.response?.data.message);
                    }
                    addToast({
                        color: "danger",
                        title: "Terjadi kesalahan",
                        description: err.response?.data.message || "Silakan coba lagi",
                    });
                })
                .finally(() => setIsLoading(false));
        },
        [isEdit, loket?.id]
    );

    return (
        <Dialog open={isOpen} onClose={onOpenChange} maxWidth="sm" fullWidth>
            <DialogTitle>{isEdit ? "Edit" : "Tambah"} Loket</DialogTitle>
            <Formik
                initialValues={initialValues}
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
                    setFieldValue,
                }) => {
                    return (
                        <form onSubmit={handleSubmit}>
                            <DialogContent>
                                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        label="Kode Loket"
                                        name="kodeloket"
                                        type="text"
                                        value={values.kodeloket}
                                        error={!!errors.kodeloket && !!touched.kodeloket}
                                        helperText={touched.kodeloket && errors.kodeloket}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="Masukkan kode loket"
                                    />
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        label="Nama Loket"
                                        name="loket"
                                        type="text"
                                        value={values.loket}
                                        error={!!errors.loket && !!touched.loket}
                                        helperText={touched.loket && errors.loket}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="Masukkan nama loket"
                                    />
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        label="Indeks"
                                        name="indek"
                                        type="number"
                                        value={values.indek}
                                        error={!!errors.indek && !!touched.indek}
                                        helperText={touched.indek && errors.indek}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="Masukkan indeks"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={values.aktif === 1}
                                                onChange={(e) =>
                                                    setFieldValue("aktif", e.target.checked ? 1 : 0)
                                                }
                                                color="primary"
                                            />
                                        }
                                        label="Aktif"
                                    />
                                </Box>
                            </DialogContent>
                            <DialogActions sx={{ px: 3, pb: 2 }}>
                                <Button color="error" variant="outlined" onClick={onOpenChange}>
                                    Batal
                                </Button>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    type="submit"
                                    disabled={isLoading}
                                    startIcon={
                                        isLoading ? (
                                            <CircularProgress size={16} color="inherit" />
                                        ) : null
                                    }
                                >
                                    {isEdit ? "Edit" : "Tambah"} Loket
                                </Button>
                            </DialogActions>
                        </form>
                    );
                }}
            </Formik>
        </Dialog>
    );
};
