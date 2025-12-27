"use client";

import { ErrorResponse } from "@/core/types/axios";
import { addToast } from "@heroui/react";
import api from "@/core/lib/api";
import { AxiosError } from "axios";
import { format } from "date-fns";
import { Formik, FormikHelpers } from "formik";
import React, { useCallback, useState } from "react";
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
  Typography,
} from "@mui/material";

// Interface untuk SK Tarif
export interface SKTarif {
  id?: number;
  tahun: number;
  nomor_sk: string;
  aktif: number;
  mulaitgl: string; // Format: YYYY-MM-DD
}

type FormType = {
  tahun: number;
  nomor_sk: string;
  aktif: boolean; // Menggunakan boolean untuk UI, nanti dikonversi ke 0/1
  mulaitgl: string;
};

export const Form = ({
  isEdit = false,
  skTarif,
  diclosure,
}: {
  isEdit?: boolean;
  skTarif?: SKTarif;
  diclosure: {
    isOpen: boolean;
    onOpenChange: () => void;
  };
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpenChange } = diclosure;

  const initialValues: FormType = {
    tahun: skTarif?.tahun || new Date().getFullYear(),
    nomor_sk: skTarif?.nomor_sk || "",
    aktif: skTarif?.aktif === 1 || false,
    mulaitgl: skTarif?.mulaitgl
      ? format(new Date(skTarif.mulaitgl), "yyyy-MM-dd")
      : "",
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
        aktif: values.aktif ? 1 : 0,
        id: skTarif?.id || null,
      };

      api[method]("/api/portal/master-data/golongan-tarif", payload)
        .then((res) => {
          addToast({ color: "success", title: res.data.message });
          onClose();
          mutate(() => true);
        })
        .catch((err: AxiosError<ErrorResponse>) => {
          if (err.response?.status === 409) {
            addToast({
              color: "danger",
              title: "SK Tarif sudah ada!",
              description: err.response?.data.message,
            });
            return;
          }
          if (err.status !== 500 && err.status !== 401) {
            // Set error ke field yang sesuai berdasarkan response
            if (err.response?.data.message?.includes("nomor_sk")) {
              return setFieldError("nomor_sk", err.response?.data.message);
            }
            if (err.response?.data.message?.includes("tahun")) {
              return setFieldError("tahun", err.response?.data.message);
            }
            return setFieldError("nomor_sk", err.response?.data.message);
          }
          addToast({
            color: "danger",
            title: "Terjadi kesalahan",
            description: err.response?.data.message || "Silakan coba lagi",
          });
        })
        .finally(() => setIsLoading(false));
    },
    [isEdit, skTarif?.id]
  );

  return (
    <Dialog
      open={isOpen}
      onClose={onOpenChange}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        {isEdit ? "Edit" : "Tambah"} SK Tarif
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
          setFieldValue,
        }) => {
          return (
            <form onSubmit={handleSubmit}>
              <DialogContent>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Tahun"
                    name="tahun"
                    type="number"
                    value={values.tahun}
                    error={!!errors.tahun && !!touched.tahun}
                    helperText={touched.tahun && errors.tahun}
                    onChange={(e) =>
                      setFieldValue("tahun", parseInt(e.target.value))
                    }
                    onBlur={handleBlur}
                    placeholder="Masukkan tahun"
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Nomor SK"
                    name="nomor_sk"
                    type="text"
                    value={values.nomor_sk}
                    error={!!errors.nomor_sk && !!touched.nomor_sk}
                    helperText={touched.nomor_sk && errors.nomor_sk}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Masukkan nomor SK"
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Tanggal Mulai"
                    name="mulaitgl"
                    type="date"
                    value={values.mulaitgl}
                    error={!!errors.mulaitgl && !!touched.mulaitgl}
                    helperText={touched.mulaitgl && errors.mulaitgl}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    InputLabelProps={{ shrink: true }}
                  />
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={values.aktif}
                          onChange={(e) => setFieldValue("aktif", e.target.checked)}
                          color="primary"
                        />
                      }
                      label="Status Aktif"
                    />
                    <Typography variant="body2" color="text.secondary">
                      {values.aktif ? "Aktif" : "Tidak Aktif"}
                    </Typography>
                  </Box>
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
                  {isEdit ? "Update" : "Simpan"} SK Tarif
                </Button>
              </DialogActions>
            </form>
          );
        }}
      </Formik>
    </Dialog>
  );
};
