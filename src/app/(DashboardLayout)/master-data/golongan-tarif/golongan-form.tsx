"use client";

import { addToast } from "@heroui/react";
import api from "@/core/lib/api";
import { FieldArray, Formik, FormikHelpers } from "formik";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { Plus, Trash2, Save, X, DollarSign } from "lucide-react";
import { mutate } from "swr";
import { GolonganDetailSchema } from "@/helpers/schemas";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  CircularProgress,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

export interface DetailTarif {
  id?: number;
  golongan_id?: number;
  min: number;
  max: number;
  harga: number;
  is_tetap: boolean;
}

export interface Golongan {
  id?: number;
  kode_golongan: string;
  nama: string;
  administrasi: number;
  pemeliharaan: number;
  retribusi: number;
  pelayanan: number;
  detail_tarif: DetailTarif[];
}

type Form = {
  golongan: Golongan[];
};

export const GolonganDetailForm = ({
  isEdit = false,
  initialGolongan = [],
  parentId,
  onBack,
}: {
  isEdit?: boolean;
  initialGolongan?: Golongan[];
  parentId?: string;
  onBack?: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const Router = useRouter();

  const defaultDetailTarif: DetailTarif = {
    min: 0,
    max: 0,
    harga: 0,
    is_tetap: false,
  };

  const defaultGolongan: Golongan = {
    kode_golongan: "",
    nama: "",
    administrasi: 0,
    pemeliharaan: 0,
    retribusi: 0,
    pelayanan: 0,
    detail_tarif: [defaultDetailTarif],
  };

  let initialValues: Form = {
    golongan: initialGolongan.length > 0 ? initialGolongan : [],
  };

  const handleSubmit = useCallback(
    async (values: Form, { setFieldError }: FormikHelpers<Form>) => {
      setIsLoading(true);

      if (values.golongan.length === 0) {
        addToast({
          color: "danger",
          title: "Error",
          description: "Minimal harus ada 1 golongan",
        });
        setIsLoading(false);
        return;
      }

      const kodeGolongan = values.golongan.map((g) =>
        g.kode_golongan.trim().toUpperCase()
      );
      const duplicateKode = kodeGolongan.find(
        (kode, index) => kodeGolongan.indexOf(kode) !== index
      );

      if (duplicateKode) {
        addToast({
          color: "danger",
          title: "Error",
          description: `Kode golongan "${duplicateKode}" tidak boleh duplikat`,
        });
        setIsLoading(false);
        return;
      }

      for (let i = 0; i < values.golongan.length; i++) {
        const golongan = values.golongan[i];
        if (golongan.detail_tarif.length === 0) {
          addToast({
            color: "danger",
            title: "Error",
            description: `Golongan "${golongan.nama}" harus memiliki minimal 1 detail tarif`,
          });
          setIsLoading(false);
          return;
        }

        for (let j = 0; j < golongan.detail_tarif.length; j++) {
          const tarif = golongan.detail_tarif[j];
          if (
            tarif.min === null ||
            tarif.max === null ||
            !tarif.harga === null
          ) {
            addToast({
              color: "danger",
              title: "Error",
              description: `Pada golongan "${golongan.nama}", tarif ${j + 1
                }: Harus diisi!`,
            });
            setIsLoading(false);
            return;
          }
        }
      }

      const payload = {
        parentId,
        golongan: values.golongan.map((g) => ({
          ...g,
          kode_golongan: g.kode_golongan.trim().toUpperCase(),
          nama: g.nama.trim(),
          detail_tarif: g.detail_tarif.map((dt) => ({
            ...dt,
            golongan_id: g.id,
          })),
        })),
      };

      try {
        const response = await api.post(
          "/api/portal/master-data/golongan-tarif/golongan-detail",
          payload
        );

        addToast({ color: "success", title: response.data.message });
        mutate(() => true);
      } catch (err: any) {
        console.log("Error Response:", err.response);

        if (err.response?.status === 409) {
          addToast({
            color: "danger",
            title: "Conflict",
            description: err.response?.data.message,
          });
          return;
        }
        addToast({
          color: "danger",
          title: "Error",
          description: err.response?.data.message || "Terjadi kesalahan",
        });
      } finally {
        setIsLoading(false);
      }
    },
    [parentId]
  );

  // Format currency untuk display
  const formatCurrency = (value: number) => {
    return (value && value.toLocaleString("id-ID")) || "";
  };

  // Parse currency dari input
  const parseCurrency = (value: string) => {
    const cleaned = value.replace(/[^0-9]/g, "");
    return Number(cleaned);
  };

  return (
    <Box>
      <Formik
        initialValues={initialValues}
        validationSchema={GolonganDetailSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          setFieldValue,
        }) => {
          return (
            <FieldArray name="golongan">
              {({ remove: removeGolongan, push: pushGolongan }) => (
                <form onSubmit={handleSubmit}>
                  {/* Info Alert */}
                  <Alert
                    severity="info"
                    icon={<InfoIcon />}
                    sx={{ mb: 3 }}
                  >
                    <AlertTitle>Informasi</AlertTitle>
                    <Typography variant="body2">• Semua field harus diisi</Typography>
                    <Typography variant="body2">• Setiap golongan harus memiliki minimal 1 detail tarif</Typography>
                  </Alert>

                  {/* Golongan Items */}
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {values.golongan.map((golongan, golonganIndex) => (
                      <Card key={golonganIndex} elevation={3}>
                        <CardHeader
                          avatar={
                            <Box
                              sx={{
                                width: 40,
                                height: 40,
                                bgcolor: 'primary.light',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              <Typography variant="body1" fontWeight="bold" color="primary.main">
                                {golonganIndex + 1}
                              </Typography>
                            </Box>
                          }
                          title={
                            <Typography variant="h6" fontWeight="600">
                              {golongan.kode_golongan && golongan.nama
                                ? `${golongan.kode_golongan} - ${golongan.nama}`
                                : `Golongan ${golonganIndex + 1}`}
                            </Typography>
                          }
                          subheader={
                            !golongan.kode_golongan && !golongan.nama
                              ? "Belum diisi"
                              : null
                          }
                          action={
                            values.golongan.length > 1 && (
                              <Button
                                color="error"
                                variant="outlined"
                                size="small"
                                startIcon={<Trash2 size={16} />}
                                onClick={() => removeGolongan(golonganIndex)}
                              >
                                Hapus Golongan
                              </Button>
                            )
                          }
                          sx={{ pb: 1 }}
                        />
                        <Divider />
                        <CardContent sx={{ pt: 3 }}>
                          {/* Informasi Golongan */}
                          <Box sx={{ mb: 4 }}>
                            <Typography
                              variant="subtitle1"
                              fontWeight="600"
                              color="text.secondary"
                              sx={{ mb: 2 }}
                            >
                              Informasi Golongan
                            </Typography>
                            <Grid container spacing={2}>
                              <Grid size={{ xs: 12, md: 6 }}>
                                <TextField
                                  fullWidth
                                  variant="outlined"
                                  label="Kode Golongan"
                                  placeholder="Contoh: A1, B2, C3"
                                  value={values.golongan[golonganIndex].kode_golongan}
                                  error={
                                    !!(errors.golongan as any)?.[golonganIndex]?.kode_golongan &&
                                    !!(touched.golongan as any)?.[golonganIndex]?.kode_golongan
                                  }
                                  helperText={
                                    (touched.golongan as any)?.[golonganIndex]?.kode_golongan &&
                                    (errors.golongan as any)?.[golonganIndex]?.kode_golongan
                                  }
                                  onChange={(e) => {
                                    const value = e.target.value.toUpperCase();
                                    setFieldValue(
                                      `golongan.${golonganIndex}.kode_golongan`,
                                      value
                                    );
                                  }}
                                />
                              </Grid>
                              <Grid size={{ xs: 12, md: 6 }}>
                                <TextField
                                  fullWidth
                                  variant="outlined"
                                  label="Nama Golongan"
                                  placeholder="Contoh: Rumah Tangga, Komersial"
                                  value={values.golongan[golonganIndex].nama}
                                  error={
                                    !!(errors.golongan as any)?.[golonganIndex]?.nama &&
                                    !!(touched.golongan as any)?.[golonganIndex]?.nama
                                  }
                                  helperText={
                                    (touched.golongan as any)?.[golonganIndex]?.nama &&
                                    (errors.golongan as any)?.[golonganIndex]?.nama
                                  }
                                  onChange={handleChange(`golongan.${golonganIndex}.nama`)}
                                />
                              </Grid>
                            </Grid>
                          </Box>

                          {/* Biaya Golongan */}
                          <Box sx={{ mb: 4 }}>
                            <Typography
                              variant="subtitle1"
                              fontWeight="600"
                              color="text.secondary"
                              sx={{ mb: 2 }}
                            >
                              Biaya Golongan
                            </Typography>
                            <Grid container spacing={2}>
                              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <TextField
                                  fullWidth
                                  variant="outlined"
                                  label="Administrasi"
                                  placeholder="0"
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">Rp</InputAdornment>
                                    ),
                                  }}
                                  value={formatCurrency(values.golongan[golonganIndex].administrasi)}
                                  error={
                                    !!(errors.golongan as any)?.[golonganIndex]?.administrasi &&
                                    !!(touched.golongan as any)?.[golonganIndex]?.administrasi
                                  }
                                  helperText={
                                    (touched.golongan as any)?.[golonganIndex]?.administrasi &&
                                    (errors.golongan as any)?.[golonganIndex]?.administrasi
                                  }
                                  onChange={(e) => {
                                    const value = parseCurrency(e.target.value);
                                    setFieldValue(`golongan.${golonganIndex}.administrasi`, value);
                                  }}
                                />
                              </Grid>
                              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <TextField
                                  fullWidth
                                  variant="outlined"
                                  label="Pemeliharaan"
                                  placeholder="0"
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">Rp</InputAdornment>
                                    ),
                                  }}
                                  value={formatCurrency(values.golongan[golonganIndex].pemeliharaan)}
                                  error={
                                    !!(errors.golongan as any)?.[golonganIndex]?.pemeliharaan &&
                                    !!(touched.golongan as any)?.[golonganIndex]?.pemeliharaan
                                  }
                                  helperText={
                                    (touched.golongan as any)?.[golonganIndex]?.pemeliharaan &&
                                    (errors.golongan as any)?.[golonganIndex]?.pemeliharaan
                                  }
                                  onChange={(e) => {
                                    const value = parseCurrency(e.target.value);
                                    setFieldValue(`golongan.${golonganIndex}.pemeliharaan`, value);
                                  }}
                                />
                              </Grid>
                              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <TextField
                                  fullWidth
                                  variant="outlined"
                                  label="Retribusi"
                                  placeholder="0"
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">Rp</InputAdornment>
                                    ),
                                  }}
                                  value={formatCurrency(values.golongan[golonganIndex].retribusi)}
                                  error={
                                    !!(errors.golongan as any)?.[golonganIndex]?.retribusi &&
                                    !!(touched.golongan as any)?.[golonganIndex]?.retribusi
                                  }
                                  helperText={
                                    (touched.golongan as any)?.[golonganIndex]?.retribusi &&
                                    (errors.golongan as any)?.[golonganIndex]?.retribusi
                                  }
                                  onChange={(e) => {
                                    const value = parseCurrency(e.target.value);
                                    setFieldValue(`golongan.${golonganIndex}.retribusi`, value);
                                  }}
                                />
                              </Grid>
                              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <TextField
                                  fullWidth
                                  variant="outlined"
                                  label="Pelayanan"
                                  placeholder="0"
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">Rp</InputAdornment>
                                    ),
                                  }}
                                  value={formatCurrency(values.golongan[golonganIndex].pelayanan)}
                                  error={
                                    !!(errors.golongan as any)?.[golonganIndex]?.pelayanan &&
                                    !!(touched.golongan as any)?.[golonganIndex]?.pelayanan
                                  }
                                  helperText={
                                    (touched.golongan as any)?.[golonganIndex]?.pelayanan &&
                                    (errors.golongan as any)?.[golonganIndex]?.pelayanan
                                  }
                                  onChange={(e) => {
                                    const value = parseCurrency(e.target.value);
                                    setFieldValue(`golongan.${golonganIndex}.pelayanan`, value);
                                  }}
                                />
                              </Grid>
                            </Grid>
                          </Box>

                          {/* Detail Tarif */}
                          <Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                              <Typography
                                variant="subtitle1"
                                fontWeight="600"
                                color="text.secondary"
                              >
                                Detail Tarif
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {values.golongan[golonganIndex].detail_tarif.length} tarif
                              </Typography>
                            </Box>

                            <FieldArray name={`golongan.${golonganIndex}.detail_tarif`}>
                              {({ remove: removeTarif, push: pushTarif }) => (
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                  {values.golongan[golonganIndex].detail_tarif.map((tarif, tarifIndex) => (
                                    <Paper
                                      key={tarifIndex}
                                      variant="outlined"
                                      sx={{ p: 2, bgcolor: 'grey.50' }}
                                    >
                                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                          <DollarSign size={16} color="#2e7d32" />
                                          <Typography variant="body2" fontWeight="600">
                                            Tarif {tarifIndex + 1}
                                          </Typography>
                                        </Box>
                                        {values.golongan[golonganIndex].detail_tarif.length > 1 && (
                                          <Button
                                            color="error"
                                            size="small"
                                            startIcon={<Trash2 size={14} />}
                                            onClick={() => removeTarif(tarifIndex)}
                                          >
                                            Hapus
                                          </Button>
                                        )}
                                      </Box>

                                      <Grid container spacing={2} alignItems="center">
                                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                          <TextField
                                            fullWidth
                                            variant="outlined"
                                            size="small"
                                            label="Minimum"
                                            required
                                            placeholder="0"
                                            type="number"
                                            value={tarif.min}
                                            onChange={(e) => {
                                              setFieldValue(
                                                `golongan.${golonganIndex}.detail_tarif.${tarifIndex}.min`,
                                                Number(e.target.value)
                                              );
                                            }}
                                          />
                                        </Grid>
                                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                          <TextField
                                            fullWidth
                                            variant="outlined"
                                            size="small"
                                            label="Maksimum"
                                            required
                                            placeholder="0"
                                            type="number"
                                            value={tarif.max}
                                            onChange={(e) => {
                                              setFieldValue(
                                                `golongan.${golonganIndex}.detail_tarif.${tarifIndex}.max`,
                                                Number(e.target.value)
                                              );
                                            }}
                                          />
                                        </Grid>
                                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                          <TextField
                                            fullWidth
                                            variant="outlined"
                                            size="small"
                                            label="Harga"
                                            required
                                            placeholder="0"
                                            InputProps={{
                                              startAdornment: (
                                                <InputAdornment position="start">Rp</InputAdornment>
                                              ),
                                            }}
                                            value={formatCurrency(tarif.harga)}
                                            onChange={(e) => {
                                              const value = parseCurrency(e.target.value);
                                              setFieldValue(
                                                `golongan.${golonganIndex}.detail_tarif.${tarifIndex}.harga`,
                                                value
                                              );
                                            }}
                                          />
                                        </Grid>
                                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                          <FormControlLabel
                                            control={
                                              <Checkbox
                                                checked={tarif.is_tetap}
                                                onChange={(e) => {
                                                  const checked = e.target.checked;
                                                  setFieldValue(
                                                    `golongan.${golonganIndex}.detail_tarif.${tarifIndex}.is_tetap`,
                                                    checked
                                                  );
                                                  if (checked) {
                                                    setFieldValue(
                                                      `golongan.${golonganIndex}.detail_tarif.${tarifIndex}.min`,
                                                      0
                                                    );
                                                    setFieldValue(
                                                      `golongan.${golonganIndex}.detail_tarif.${tarifIndex}.max`,
                                                      0
                                                    );
                                                  }
                                                }}
                                                color="primary"
                                              />
                                            }
                                            label="Tarif Tetap"
                                          />
                                        </Grid>
                                      </Grid>
                                    </Paper>
                                  ))}

                                  <Button
                                    variant="outlined"
                                    color="primary"
                                    fullWidth
                                    startIcon={<Plus size={16} />}
                                    onClick={() => pushTarif({ ...defaultDetailTarif })}
                                  >
                                    Tambah Detail Tarif
                                  </Button>
                                </Box>
                              )}
                            </FieldArray>
                          </Box>
                        </CardContent>
                      </Card>
                    ))}
                  </Box>

                  {/* Add New Golongan Button */}
                  <Paper
                    variant="outlined"
                    sx={{
                      p: 4,
                      mt: 3,
                      borderStyle: 'dashed',
                      borderColor: 'grey.400',
                      '&:hover': { borderColor: 'primary.main' },
                      transition: 'border-color 0.2s'
                    }}
                  >
                    <Button
                      variant="outlined"
                      color="primary"
                      fullWidth
                      size="large"
                      startIcon={<Plus size={16} />}
                      onClick={() => pushGolongan({ ...defaultGolongan })}
                    >
                      Tambah Golongan Baru
                    </Button>
                  </Paper>

                  {/* Summary */}
                  <Paper elevation={1} sx={{ mt: 3, p: 3 }}>
                    <Grid container spacing={2} textAlign="center">
                      <Grid size={{ xs: 12, md: 4 }}>
                        <Typography variant="h4" fontWeight="bold" color="primary.main">
                          {values.golongan.length}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Total Golongan
                        </Typography>
                      </Grid>
                      <Grid size={{ xs: 12, md: 4 }}>
                        <Typography variant="h4" fontWeight="bold" color="success.main">
                          {values.golongan.reduce(
                            (acc, g) => acc + g.detail_tarif.length,
                            0
                          )}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Total Detail Tarif
                        </Typography>
                      </Grid>
                      <Grid size={{ xs: 12, md: 4 }}>
                        <Typography variant="h4" fontWeight="bold" color="secondary.main">
                          {values.golongan.filter((g) => g.kode_golongan.trim()).length}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Golongan Terisi
                        </Typography>
                      </Grid>
                    </Grid>
                  </Paper>

                  {/* Action Buttons */}
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      gap: 2,
                      pt: 3,
                      mt: 3,
                      borderTop: 1,
                      borderColor: 'divider'
                    }}
                  >
                    <Button
                      variant="outlined"
                      color="error"
                      size="large"
                      startIcon={<X size={16} />}
                      onClick={onBack}
                    >
                      Batal
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      type="submit"
                      disabled={isLoading}
                      startIcon={isLoading ? <CircularProgress size={16} color="inherit" /> : <Save size={16} />}
                    >
                      {isEdit ? "Update" : "Simpan"} Detail Golongan
                    </Button>
                  </Box>
                </form>
              )}
            </FieldArray>
          );
        }}
      </Formik>
    </Box>
  );
};
