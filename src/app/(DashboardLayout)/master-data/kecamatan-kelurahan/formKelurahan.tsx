"use client";

import { ErrorResponse } from "@/core/types/axios";
import { addToast } from "@heroui/react";
import api from "@/core/lib/api";
import { AxiosError } from "axios";
import { Formik, FormikHelpers } from "formik";
import React, { useCallback, useState } from "react";
import { Kelurahan } from "./type";
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

interface KelurahanFormType {
  nama: string;
}

export const Form = ({
  isEdit = false,
  kelurahan,
  diclosure,
  kecId,
}: {
  isEdit?: boolean;
  kelurahan?: Kelurahan;
  diclosure: {
    isOpen: boolean;
    onOpenChange: (bool: boolean) => void;
  };
  kecId?: number;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpenChange } = diclosure;

  const initialValues: KelurahanFormType = {
    nama: kelurahan?.nama || "",
  };

  const handleSubmit = useCallback(
    async (
      values: KelurahanFormType,
      { setFieldError }: FormikHelpers<KelurahanFormType>,
      onClose: () => void
    ) => {
      setIsLoading(true);
      const method = isEdit ? "put" : "post";

      const submitValues = {
        id: kelurahan?.id || null,
        kec_id: kecId,
        ...values,
      };

      api[method](
        "/api/portal/master-data/kecamatan-kelurahan/kelurahan",
        submitValues
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
    [isEdit, kelurahan?.id, kecId]
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
        {isEdit ? "Edit" : "Tambah"} Kelurahan
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
        }) => {
          return (
            <form onSubmit={handleSubmit}>
              <DialogContent>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Nama Kelurahan"
                    name="nama"
                    type="text"
                    value={values.nama}
                    error={!!errors.nama && !!touched.nama}
                    helperText={touched.nama && errors.nama}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Masukkan nama kelurahan"
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
                  {isEdit ? "Edit" : "Tambah"} Kelurahan
                </Button>
              </DialogActions>
            </form>
          );
        }}
      </Formik>
    </Dialog>
  );
};
