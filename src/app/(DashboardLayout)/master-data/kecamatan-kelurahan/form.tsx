"use client";

import { ErrorResponse } from "@/types/axios";
import { addToast } from "@heroui/react";
import api from "@/core/lib/api";
import { AxiosError } from "axios";
import { Formik, FormikHelpers } from "formik";
import React, { useCallback, useState } from "react";
import { Kecamatan } from "./type";
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

interface KecamatanFormType {
  nama: string;
}

export const Form = ({
  isEdit = false,
  kecamatan,
  diclosure,
}: {
  isEdit?: boolean;
  kecamatan?: Kecamatan;
  diclosure: {
    isOpen: boolean;
    onOpenChange: () => void;
  };
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpenChange } = diclosure;

  const initialValues: KecamatanFormType = {
    nama: kecamatan?.nama || "",
  };

  const handleSubmit = useCallback(
    async (
      values: KecamatanFormType,
      { setFieldError }: FormikHelpers<KecamatanFormType>,
      onClose: () => void
    ) => {
      setIsLoading(true);
      const method = isEdit ? "put" : "post";

      const submitValues = {
        ...values,
      };

      api[method](
        "/api/portal/master-data/kecamatan-kelurahan/kecamatan",
        {
          id: kecamatan?.id || null,
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
    [isEdit, kecamatan?.id]
  );

  return (
    <Dialog
      open={isOpen}
      onClose={onOpenChange}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        {isEdit ? "Edit" : "Tambah"} Kecamatan
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
                    label="Nama Kecamatan"
                    name="nama"
                    type="text"
                    value={values.nama}
                    error={!!errors.nama && !!touched.nama}
                    helperText={touched.nama && errors.nama}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Masukkan nama kecamatan"
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
                  {isEdit ? "Edit" : "Tambah"} Kecamatan
                </Button>
              </DialogActions>
            </form>
          );
        }}
      </Formik>
    </Dialog>
  );
};
