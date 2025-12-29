"use client";

import React, { useEffect, useState } from "react";
import { GolonganDetailForm } from "../golongan-form";
import { addToast } from "@heroui/react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import useSWR from "swr";
import { fetcher } from "@/core/lib/api";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Skeleton,
  Typography,
} from "@mui/material";

type Props = { id: string };

export interface GolonganTarif {
  id: number;
  kode_golongan: string;
  nama: string;
  administrasi: number;
  pemeliharaan: number;
  retribusi: number;
  pelayanan: number;
  golongan_id: number;
  tarif_values: TarifValue[];
}
type TarifValue = {
  id: number;
  golongan_id: number;
  harga: number;
  min: number;
  max: number;
  is_tetap: number;
};

const View = (props: Props) => {
  const Router = useRouter();

  const { data, isLoading, error } = useSWR(
    "/api/portal/master-data/golongan-tarif",
    fetcher,
  );

  const [selectedTarif, setSelectedTarif] = useState("");
  const [isLoading2, setIsLoading2] = useState(false);

  const [isEdit, setIsEdit] = useState(false);
  const [golTemplate, setGolTemplate] = useState<GolonganTarif[]>([]);
  useEffect(() => {
    if (selectedTarif) {
      setIsLoading2(true);
      setGolTemplate([]);
      fetcher(
        `/api/portal/master-data/golongan-tarif/get-golongan?id=${selectedTarif}`,
      )
        .then((gol: GolonganTarif[]) => {
          const data = gol.map((gol) => ({
            kode_golongan: gol.kode_golongan,
            nama: gol.nama,
            administrasi: gol.administrasi,
            pemeliharaan: gol.pemeliharaan,
            retribusi: gol.retribusi,
            pelayanan: gol.pelayanan,
            tarif_values: gol.tarif_values.map((tarif) => ({
              golongan_id: tarif.golongan_id,
              harga: tarif.harga,
              min: tarif.min,
              max: tarif.max,
              is_tetap: !!tarif.is_tetap,
            })),
          }));
          setGolTemplate(data as any);

          addToast({
            color: "success",
            title: "Data golongan berhasil dimuat",
          });
        })
        .catch((err) => {
          if (err.status === 404) {
            addToast({
              color: "danger",
              description: "Tidak ada data golongan pada SK Tarif ini",
              title: "Gagal memuat data golongan",
            });
          } else {
            addToast({
              color: "danger",
              title: "Gagal memuat data golongan",
              description: err.message,
            });
          }
        })
        .finally(() => {
          setIsLoading2(false);
        });
    } else {
      setIsLoading2(true);
      setGolTemplate([]);
      fetcher(
        `/api/portal/master-data/golongan-tarif/get-golongan?id=${props.id}`,
      )
        .then((res) => {
          setGolTemplate(res);

          setIsEdit(true);
          addToast({
            color: "success",
            title: "Data golongan berhasil dimuat",
          });
        })
        .catch((err) => { })
        .finally(() => {
          setIsLoading2(false);
        });
    }
  }, [selectedTarif, props.id]);

  if (isLoading || isLoading2) {
    return (
      <Box sx={{ maxWidth: 1200, mx: "auto", p: 3 }}>
        <Skeleton variant="text" width="25%" height={40} sx={{ mb: 2 }} />
        <Skeleton variant="rectangular" width="100%" height={48} sx={{ mb: 3 }} />
        <Skeleton variant="rectangular" width="100%" height={400} />
      </Box>
    );
  }
  if (error) {
    return (
      <Box sx={{ maxWidth: 1200, mx: "auto", p: 3 }}>
        <Typography color="error">Error loading data: {error.message}</Typography>
      </Box>
    );
  }
  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", p: 3 }}>
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 2,
          background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
          color: 'white'
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Button
              variant="outlined"
              onClick={() => Router.back()}
              startIcon={<ArrowLeft size={16} />}
              sx={{
                color: 'white',
                borderColor: 'rgba(255,255,255,0.5)',
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255,255,255,0.1)'
                }
              }}
            >
              Kembali
            </Button>
            <Box>
              <Typography variant="h5" fontWeight="bold">
                {isEdit ? "Edit" : "Add"} Detail Golongan
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Kelola golongan dan detail tarif untuk setiap SK Tarif
              </Typography>
            </Box>
          </Box>

          {!isEdit && (
            <FormControl sx={{ minWidth: 250 }} size="small">
              <InputLabel
                id="template-golongan-label"
                sx={{
                  color: 'rgba(255,255,255,0.8)',
                  '&.Mui-focused': { color: 'white' }
                }}
              >
                Template Golongan
              </InputLabel>
              <Select
                labelId="template-golongan-label"
                value={selectedTarif}
                label="Template Golongan"
                onChange={(e) => setSelectedTarif(e.target.value)}
                sx={{
                  color: 'white',
                  '.MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255,255,255,0.5)',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255,255,255,0.8)',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'white',
                  },
                  '.MuiSvgIcon-root': {
                    color: 'white',
                  }
                }}
              >
                {data?.data
                  ?.filter((item: any) => item.id != props.id)
                  .map((item: any) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.nomor_sk}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          )}
        </Box>
      </Paper>

      <GolonganDetailForm
        key={selectedTarif}
        parentId={props.id}
        initialGolongan={
          golTemplate.map((gol) => ({
            id: gol.id || null,
            kode_golongan: gol.kode_golongan,
            nama: gol.nama,
            administrasi: gol.administrasi,
            pemeliharaan: gol.pemeliharaan,
            retribusi: gol.retribusi,
            pelayanan: gol.pelayanan,
            detail_tarif: gol.tarif_values.map((tarif) => ({
              id: tarif.id || null,
              golongan_id: tarif.golongan_id,
              harga: tarif.harga,
              min: tarif.min,
              max: tarif.max,
              is_tetap: !!tarif.is_tetap,
            })),
          })) as any
        }
      />
    </Box>
  );
};

export default View;
