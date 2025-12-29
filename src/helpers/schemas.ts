import * as yup from "yup";

export const LoginSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

export const UserSchema = yup.object().shape({
  username: yup.string().max(50).required("Username is required"),
  password: yup.string().max(100).required("Password is required"),
  nama: yup.string().max(50).required("Nama is required"),
  no_hp: yup.string().max(50).required("No HP is required"),
  jabatan: yup.string().max(50).required("Jabatan is required"),
  role_id: yup.number().integer().required("Role is required"),
  is_user_ppob: yup.boolean().required("PPOB status is required"),
  is_active: yup.boolean().required("Active status is required"),
  is_user_timtagih: yup.boolean().required("Tim Tagih status is required"),
});

export const MerekMeterSchema = yup.object().shape({
  nama: yup.string().max(50).required("Merek Meter is required"),
});

export const PetugasSchema = yup.object().shape({
  username: yup.string().max(50).required("Username is required"),
  password: yup.string().max(100).required("Password is required"),
  nama: yup.string().max(50).required("Nama is required"),
  role: yup.string().max(50).required("Role is required"),
  divisi_id: yup.number().integer().required("Divisi is required"),
  no_telp: yup.string().max(50).required("No Telp is required"),
  is_active: yup.boolean().required("Active status is required"),
});

export const UserParafSchema = yup.object().shape({
  nama: yup
    .string()
    .min(2, "Nama minimal 2 karakter")
    .max(50, "Nama maksimal 50 karakter")
    .required("Nama wajib diisi"),
  jabatan: yup
    .string()
    .min(2, "Jabatan minimal 2 karakter")
    .max(50, "Jabatan maksimal 50 karakter")
    .required("Jabatan wajib diisi"),
  nik: yup.string().optional(),
});
export const JenisNonAir = yup.object().shape({
  jenis: yup.string().max(50).required("Jenis is required"),
  namajenis: yup.string().max(50).required("Nama Jenis is required"),
  by_pelayanan: yup.number().integer().required("By Pelayanan is required"),
  flagpajak: yup.boolean().required("Flag Pajak is required"),
  flagpel: yup.boolean().required("Flag Pel is required"),
  flagproses: yup.boolean().required("Flag Proses is required"),
  flagrealisasi: yup.boolean().required("Flag Realisasi is required"),
});

export const GroupPelanggan = yup.object().shape({
  nama: yup.string().max(20).required("Nama is required"),
});

export const SKTarifSchema = yup.object().shape({
  tahun: yup.number().required("Tahun harus diisi"),

  nomor_sk: yup
    .string()
    .required("Nomor SK harus diisi")
    .min(3, "Nomor SK minimal 3 karakter")
    .max(50, "Nomor SK maksimal 50 karakter"),

  mulaitgl: yup.string().required("Tanggal mulai harus diisi"),
  aktif: yup.boolean().required("Status aktif harus dipilih"),
});

export const DivisiSchema = yup.object().shape({
  nama: yup.string().max(50).required("Divisi is required"),
});

const GolonganItemSchema = yup.object().shape({
  kode_golongan: yup.string().required("Kode golongan harus diisi"),

  nama: yup.string().required("Nama golongan harus diisi"),

  administrasi: yup
    .number()
    .required("Administrasi harus diisi")
    .min(0, "Administrasi tidak boleh negatif")
    .max(999999999, "Administrasi maksimal 999.999.999")
    .integer("Administrasi harus berupa angka bulat"),

  pemeliharaan: yup
    .number()
    .required("Pemeliharaan harus diisi")
    .min(0, "Pemeliharaan tidak boleh negatif")
    .max(999999999, "Pemeliharaan maksimal 999.999.999")
    .integer("Pemeliharaan harus berupa angka bulat"),

  retribusi: yup
    .number()
    .required("Retribusi harus diisi")
    .min(0, "Retribusi tidak boleh negatif")
    .max(999999999, "Retribusi maksimal 999.999.999")
    .integer("Retribusi harus berupa angka bulat"),

  pelayanan: yup
    .number()
    .required("Pelayanan harus diisi")
    .min(0, "Pelayanan tidak boleh negatif")
    .max(999999999, "Pelayanan maksimal 999.999.999")
    .integer("Pelayanan harus berupa angka bulat"),
});

export const DiameterSchema = yup.object().shape({
  nama: yup
    .string()
    .required("Nama diameter harus diisi")
    .min(1, "Nama diameter minimal 1 karakter")
    .max(100, "Nama diameter maksimal 100 karakter"),
  by_pemeliharaan: yup.string().required("Biaya pemeliharaan harus diisi"),
  by_administrasi: yup.string().required("Biaya administrasi harus diisi"),
  aktif: yup.boolean().required("Status aktif harus dipilih"),
});

export const KecamatanSchema = yup.object().shape({
  nama: yup
    .string()
    .required("Nama kecamatan harus diisi")
    .min(1, "Nama kecamatan minimal 1 karakter")
    .max(100, "Nama kecamatan maksimal 100 karakter"),
});

export const WilayahSchema = yup.object().shape({
  nama: yup
    .string()
    .required("Nama Wilayah harus diisi")
    .min(1, "Nama Wilayah minimal 1 karakter")
    .max(100, "Nama Wilayah maksimal 100 karakter"),
  nama_kepala: yup
    .string()
    .required("Nama Kepala harus diisi")
    .min(1, "Nama Kepala minimal 1 karakter")
    .max(30, "Nama Kepala maksimal 30 karakter"),
  jabatan: yup
    .string()
    .required("Nama Jabatan harus diisi")
    .min(1, "Nama Jabatan minimal 1 karakter")
    .max(30, "Nama Jabatan maksimal 30 karakter"),
});

export const KelurahanSchema = yup.object().shape({
  nama: yup
    .string()
    .required("Nama kelurahan harus diisi")
    .min(1, "Nama kelurahan minimal 1 karakter")
    .max(100, "Nama kelurahan maksimal 100 karakter"),
});

export const RayonSchema = yup.object({
  kode_rayon: yup
    .string()
    .required("Kode rayon wajib diisi")
    .min(1, "Kode rayon minimal 1 karakter")
    .max(35, "Kode rayon maksimal 35 karakter"),

  nama: yup
    .string()
    .required("Nama rayon wajib diisi")
    .min(2, "Nama rayon minimal 2 karakter")
    .max(100, "Nama rayon maksimal 100 karakter"),

  aktif: yup.boolean().required("Status aktif wajib dipilih"),
});

export const GolonganDetailSchema = yup.object().shape({
  golongan: yup
    .array()
    .of(GolonganItemSchema)
    .min(1, "Minimal harus ada 1 golongan")
    .max(20, "Maksimal 20 golongan")
    .test(
      "unique-kode-golongan",
      "Kode golongan tidak boleh duplikat",
      function (value) {
        if (!value || value.length <= 1) return true;

        const kodeGolongan = value
          .map((item) => item.kode_golongan?.trim().toUpperCase())
          .filter(Boolean);

        const uniqueKode = new Set(kodeGolongan);
        return uniqueKode.size === kodeGolongan.length;
      }
    )
    .test(
      "unique-nama-golongan",
      "Nama golongan tidak boleh duplikat",
      function (value) {
        if (!value || value.length <= 1) return true;

        const namaGolongan = value
          .map((item) => item.nama?.trim().toLowerCase())
          .filter(Boolean);

        const uniqueNama = new Set(namaGolongan);
        return uniqueNama.size === namaGolongan.length;
      }
    ),
});

export const PelangganSchema = yup.object().shape({
  no_pelanggan: yup.number().integer().required("No Pelanggan is required"),
  nama: yup.string().max(50).required("Nama is required"),
  alamat: yup.string().max(50).required("Alamat is required"),
  no_ktp: yup.string().max(50).required("No KTP is required"),
  no_kk: yup.string().max(50).required("No KK is required"),
  no_hp: yup.string().max(50).required("No HP is required"),
  kec_id: yup.number().integer().required("Kecamatan is required"),
  kel_id: yup.number().integer().required("Kelurahan is required"),
});

export const PelangganRayonSchema = yup.object().shape({
  no_pelanggan: yup.number().integer().required("No Pelanggan is required"),
  nama: yup.string().max(50).required("Nama is required"),
  rayon_id: yup.number().integer().required("Rayon is required"),
  periode: yup.number().integer().required("Periode is required"),
});

export const PelangganGolonganSchema = yup.object().shape({
  no_pelanggan: yup.number().integer().required("No Pelanggan is required"),
  nama: yup.string().max(50).required("Nama is required"),
  golongan_id: yup.number().integer().required("Golongan is required"),
  diameter_id: yup.number().integer().required("Diameter is required"),
  periode: yup.number().integer().required("Periode is required"),
});

export const PendaftaranPelSchema = yup.object().shape({
  no_regis: yup.string().max(50).required("No Regis is required"),
  tanggal: yup.date().required("Tanggal is required"),
  nama: yup.string().max(50).required("Nama is required"),
  alamat: yup.string().max(255).required("Alamat is required"),
  tmp_lahir: yup.string().max(50).required("Tempat lahir is required"),
  tgl_lahir: yup.date().required("Tanggal lahir is required"),
  email: yup.string().email("Email is invalid").optional(),
  no_ktp: yup.string().max(20).required("No KTP is required"),
  no_kk: yup.string().max(20).required("No KK is required"),
  no_telp: yup.string().max(20).required("No Telp is required"),
  no_hp: yup.string().max(20).required("No HP is required"),
  pekerjaan: yup.string().max(50).required("Pekerjaan is required"),
  jumlah_penghuni: yup
    .number()
    .integer()
    .min(1, "Jumlah penguni harus diisi")
    .required("Jumlah penghuni is required"),
  jenis_bangunan: yup.string().max(50).required("Jenis bangunan is required"),
  kepemilikan: yup.string().max(50).required("Kepemilikan is required"),
  kec_id: yup
    .number()
    .integer()
    .min(1, "Kecamatan harus diisi")
    .required("Kecamatan ID is required"),
  kel_id: yup
    .number()
    .integer()
    .min(1, "Kelurahan harus diisi")
    .required("Kelurahan ID is required"),
  rayon_id: yup
    .number()
    .integer()
    .min(1, "Rayon harus diisi")
    .required("Rayon ID is required"),
  jalan_id: yup
    .number()
    .integer()
    .min(1, "Jalan harus diisi")
    .required("Jalan ID is required"),
  is_mbr: yup.boolean(),
  flexiblebiaya: yup.boolean(),
  biaya: yup
    .number()
    .min(0, "Biaya tidak boleh negatif")
    .when("flexiblebiaya", {
      is: true,
      then: (schema) =>
        schema.required("Biaya harus diisi jika Flexible Biaya dipilih"),
      otherwise: (schema) => schema.notRequired().nullable(),
    }),
});

export const PendaftaranPelayananLainSchema = yup.object().shape({
  no_regis: yup.string().max(50).required("No Regis is required"),
  tanggal: yup.date().required("Tanggal is required"),
  nama: yup.string().max(50).required("Nama is required"),
  alamat: yup.string().max(255).required("Alamat is required"),
  jenis_nonair_id: yup
    .number()
    .integer()
    .min(1, "Jenis Non Air wajib diisi")
    .required("Jenis Non Air ID is required"),
  keterangan: yup.string().max(255).required("Keterangan is required"),
  flexiblebiaya: yup.boolean(),
  biaya: yup
    .number()
    .min(0, "Biaya tidak boleh negatif")
    .when("flexiblebiaya", {
      is: true,
      then: (schema) =>
        schema.required("Biaya harus diisi jika Flexible Biaya dipilih"),
      otherwise: (schema) => schema.notRequired().nullable(),
    }),
});

export const PasangBaruSchema = yup.object().shape({
  no_rab: yup.string().max(50).required("No RAB is required"),
  tglrab: yup.date().required("Tanggal is required"),
  reg_id: yup.string().max(50).required("Reg ID is required"),
  biaya_peralatan: yup.number().min(0, "Biaya Peralatan tidak boleh negatif"),
  biaya_ongkos: yup.number().min(0, "Biaya Ongkos tidak boleh negatif"),
  biaya_lainnya: yup.number().min(0, "Biaya Lainnya tidak boleh negatif"),
  diskon: yup.number().min(0, "Diskon tidak boleh negatif"),
  ppn: yup.number().min(0, "PPN tidak boleh negatif"),
  total: yup.number().min(0, "Total tidak boleh negatif"),
  golongan_id: yup.number().integer().required("Golongan is required"),
  diameter_id: yup.number().integer().required("Diameter is required"),
  nama_diameter: yup
    .string()
    .max(50)
    .required("Nama diameter tidak boleh kosong"),
});

export const ProsesPersetujuanPasangBaruSchema = yup.object().shape({
  uangmuka: yup
    .number()
    .min(0, "Uang Muka tidak boleh negatif")
    .when("flagangsur", {
      is: (val: boolean | string) => val === true || val === "true", // Tipe eksplisit
      then: (schema) =>
        schema.required("Uang Muka harus diisi jika Flag Angsur dipilih"),
      otherwise: (schema) => schema.notRequired().nullable(),
    }),

  bunga: yup.number().min(0, "Uang Muka tidak boleh negatif").optional(),

  tenor: yup.number().when("flagangsur", {
    is: (val: number) => val === 1,
    then: (schema) =>
      schema
        .required("Angsuran Kali harus diisi jika Flag Angsur dipilih")
        .min(1, "Angsuran Kali minimal 1"),
    otherwise: (schema) => schema.notRequired().nullable(),
  }),

  angsuranperbulan: yup
    .number()
    .min(0, "Angsuran Perbulan tidak boleh negatif")
    .when("flagangsur", {
      is: (val: boolean | string) => val === true || val === "true", // Tipe eksplisit
      then: (schema) =>
        schema.required(
          "Angsuran Perbulan harus diisi jika Flag Angsur dipilih"
        ),
      otherwise: (schema) => schema.notRequired().nullable(),
    }),

  tglsetuju: yup
    .date()
    .typeError("Tanggal tidak valid")
    .required("Tanggal is required"),

  flagangsur: yup
    .number()
    .typeError("Metode Pembayaran wajib dipilih") // Ini bantu kalau masih kosong
    .required("Metode Pembayaran wajib dipilih")
    .oneOf([0, 1], "Pilihan tidak valid"),
});

export const PenugasanPasangBaruSchema = yup.object().shape({
  no_penugasan: yup.string().required("Nomor penugasan wajib diisi"),
  divisi_id: yup.number().required("Divisi wajib dipilih"),
});

export const ProsesPemasanganSchema = yup.object().shape({
  petugas_id: yup.number().required("Petugas wajib dipilih"),
  tglpasang: yup.date().required("Tanggal Pemasangan wajib diisi"),
  merek_id: yup.number().required("Merek wajib dipilih"),
});

export const ProsesRealisasiPasangBaruSchema = yup.object().shape({
  tglrealisasi: yup.date().required("Tanggal is required"),
  periode: yup.string().required("Periode wajib dipilih"),
  stan: yup.number().required("Stan wajib diisi"),
});

export const PenugasanPelayananLainSchema = yup.object().shape({
  no_penugasan: yup.string().required("Nomor penugasan wajib diisi"),
  divisi_id: yup.number().required("Divisi wajib dipilih"),
});

export const ProsesPemasanganPelayananLainSchema = yup.object().shape({
  petugas_id: yup.number().required("Petugas wajib dipilih"),
  tglproses: yup.date().required("Tanggal Pemasangan wajib diisi"),
});

export const ProsesRealisasiPelayananLainSchema = yup.object().shape({
  tglrealisasi: yup.date().required("Tanggal is required"),
  periode: yup.lazy((_, { parent }) => {
    if (
      parent.jenis_nonair_id === 5 ||
      parent.jenis_nonair_id === 2 ||
      parent.jenis_nonair_id === 8
    ) {
      return yup.string().required("Periode wajib dipilih");
    }
    return yup.mixed().notRequired();
  }),

  pakaim3: yup.lazy((_, { parent }) => {
    if (parent.jenis_nonair_id === 2) {
      return yup
        .number()
        .typeError("Pakai m3 harus berupa angka")
        .required("Pakai m3 wajib diisi")
        .min(0, "Pakai m3 tidak boleh negatif");
    }
    return yup.mixed().notRequired();
  }),

  namabaru: yup.lazy((_, { parent }) => {
    if (parent.jenis_nonair_id === 5) {
      return yup.string().required("Nama Baru wajib diisi");
    }
    return yup.mixed().notRequired();
  }),

  alamatbaru: yup.lazy((_, { parent }) => {
    if (parent.jenis_nonair_id === 5) {
      return yup.string().required("Alamat Baru wajib diisi");
    }
    return yup.mixed().notRequired();
  }),

  nikbaru: yup.lazy((_, { parent }) => {
    if (parent.jenis_nonair_id === 5) {
      return yup.string().required("NIK Baru wajib diisi");
    }
    return yup.mixed().notRequired();
  }),

  nokkbaru: yup.lazy((_, { parent }) => {
    if (parent.jenis_nonair_id === 5) {
      return yup.string().required("No KK Baru wajib diisi");
    }
    return yup.mixed().notRequired();
  }),

  nohpbaru: yup.lazy((_, { parent }) => {
    if (parent.jenis_nonair_id === 5) {
      return yup.string().required("No HP Baru wajib diisi");
    }
    return yup.mixed().notRequired();
  }),
});
