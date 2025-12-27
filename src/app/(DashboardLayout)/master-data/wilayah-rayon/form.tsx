"use client";

import { ErrorResponse } from "@/core/types/axios";
import { addToast } from "@heroui/react";
import api from "@/core/lib/api";
import { AxiosError } from "axios";
import { Formik, FormikHelpers } from "formik";
import React, { useCallback, useState } from "react";
import { Wilayah } from "./type";
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
} from "@mui/material";

interface WilayahFormType {
  nama: string;
  nama_kepala: string;
  jabatan: string;
}

export const Form = ({
  isEdit = false,
  wilayah,
  diclosure,
}: {
  isEdit?: boolean;
  wilayah?: Wilayah;
  diclosure: {
    isOpen: boolean;
    onOpenChange: () => void;
  };
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpenChange } = diclosure;

  const initialValues: WilayahFormType = {
    nama: wilayah?.nama || "",
    nama_kepala: wilayah?.nama_kepala || "",
    jabatan: wilayah?.jabatan || "",
  };

  const handleSubmit = useCallback(
    async (
      values: WilayahFormType,
      { setFieldError }: FormikHelpers<WilayahFormType>,
      onClose: () => void
    ) => {
      setIsLoading(true);
      const method = isEdit ? "put" : "post";

      const submitValues = {
        ...values,
      };

      api[method](
        "/api/portal/master-data/wilayah-rayon/wilayah",
        {
          id: wilayah?.id || null,
          ...submitValues,
        }
      )
        .then((res) => {
          addToast({ color: "success", title: res.data.message });
          onClose();
          mutate(() => true);
        })
        .catch((err: AxiosError<ErrorResponse>) => {
          if (err.status !== 500 && err.status !== 401) {
            return setFieldError("nama", err.response?.data.message);
          }
          addToast({
            color: "danger",
            title: "Terjadi kesalahan",
            description: err.response?.data.message || "Silakan coba lagi",
          });
        })
        .finally(() => setIsLoading(false));
    },
    [isEdit, wilayah?.id]
  );

  return (
    <Dialog
      open={isOpen}
      onClose={onOpenChange}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        {isEdit ? "Edit" : "Add"} Wilayah
      </DialogTitle>
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
        }) => {
          return (
            <form onSubmit={handleSubmit}>
              <DialogContent>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Nama Wilayah"
                    name="nama"
                    type="text"
                    value={values.nama}
                    error={!!errors.nama && !!touched.nama}
                    helperText={touched.nama && errors.nama}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Masukkan nama wilayah"
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Nama Kepala"
                    name="nama_kepala"
                    type="text"
                    value={values.nama_kepala}
                    error={!!errors.nama_kepala && !!touched.nama_kepala}
                    helperText={touched.nama_kepala && errors.nama_kepala}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Masukkan nama kepala wilayah"
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Nama Jabatan"
                    name="jabatan"
                    type="text"
                    value={values.jabatan}
                    error={!!errors.jabatan && !!touched.jabatan}
                    helperText={touched.jabatan && errors.jabatan}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Masukkan nama jabatan kepala"
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
                  {isEdit ? "Edit" : "Tambah"} Wilayah
                </Button>
              </DialogActions>
            </form>
          );
        }}
      </Formik>
    </Dialog>
  );
};
