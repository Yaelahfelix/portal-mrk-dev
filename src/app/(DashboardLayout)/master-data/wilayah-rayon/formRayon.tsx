"use client";

import { ErrorResponse } from "@/core/types/axios";
import { addToast } from "@heroui/react";
import api from "@/core/lib/api";
import { AxiosError } from "axios";
import { Formik, FormikHelpers } from "formik";
import React, { useCallback, useState } from "react";
import { Rayon } from "./type";
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
  Checkbox,
} from "@mui/material";

interface RayonFormType {
  kode_rayon: string;
  nama: string;
  aktif: boolean;
}

export const Form = ({
  isEdit = false,
  rayon,
  diclosure,
  wilayahId,
}: {
  isEdit?: boolean;
  rayon?: Rayon;
  diclosure: {
    isOpen: boolean;
    onOpenChange: (bool: boolean) => void;
  };
  wilayahId?: number;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpenChange } = diclosure;

  const initialValues: RayonFormType = {
    kode_rayon: rayon?.kode_rayon || "",
    nama: rayon?.nama || "",
    aktif: rayon?.aktif !== undefined ? !!rayon.aktif : true,
  };

  const handleSubmit = useCallback(
    async (
      values: RayonFormType,
      { setFieldError }: FormikHelpers<RayonFormType>,
      onClose: () => void
    ) => {
      setIsLoading(true);
      const method = isEdit ? "put" : "post";

      const submitValues = {
        id: rayon?.id || null,
        wilayah_id: wilayahId,
        ...values,
        aktif: values.aktif ? 1 : 0,
      };

      api[method]("/api/portal/master-data/wilayah-rayon/rayon", submitValues)
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
    [isEdit, rayon?.id, wilayahId]
  );

  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        {isEdit ? "Edit" : "Tambah"} Rayon
      </DialogTitle>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) =>
          handleSubmit(values, actions, handleClose)
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
                    label="Kode Rayon"
                    name="kode_rayon"
                    type="text"
                    value={values.kode_rayon}
                    error={!!errors.kode_rayon && !!touched.kode_rayon}
                    helperText={touched.kode_rayon && errors.kode_rayon}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Masukkan kode rayon"
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Nama Rayon"
                    name="nama"
                    type="text"
                    value={values.nama}
                    error={!!errors.nama && !!touched.nama}
                    helperText={touched.nama && errors.nama}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Masukkan nama rayon"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={values.aktif}
                        onChange={(e) => setFieldValue("aktif", e.target.checked)}
                      />
                    }
                    label="Aktif"
                  />
                </Box>
              </DialogContent>
              <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button
                  color="error"
                  variant="outlined"
                  onClick={handleClose}
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
                  {isEdit ? "Edit" : "Tambah"} Rayon
                </Button>
              </DialogActions>
            </form>
          );
        }}
      </Formik>
    </Dialog>
  );
};
