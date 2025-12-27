import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatRupiah(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
export function formatLocale(amount: number) {
  return amount.toLocaleString("id-ID");
}

export const calculatePercentage = (numerator: number, denominator: number) => {
  if (!denominator || denominator === 0) return 0;
  const result = (numerator / denominator) * 100;
  return isNaN(result) ? 0 : result;
};

export const formatPeriode = (tanggal: string | number) => {
  try {
    const str = tanggal.toString();
    const year = str.slice(0, 4);
    const month = str.slice(4, 6);

    const bulan = [
      "",
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];

    return `Periode ${bulan[parseInt(month)]} ${year}`;
  } catch {
    return "-";
  }
};

export const clientTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

export function sumDecimal(data: any[], columnId: string) {
  return data.reduce((sum, item) => {
    const value = Number((item as any)[columnId]).toFixed(2) || 0;
    const sumCents = Math.round(sum * 100);
    const valueCents = Math.round(Number(value) * 100);
    return (sumCents + valueCents) / 100;
  }, 0);
}
