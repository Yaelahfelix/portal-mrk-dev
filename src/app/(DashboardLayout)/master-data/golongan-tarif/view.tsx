"use client";

import Link from "next/link";
import React, { useMemo } from "react";
import { columns } from "./columns";
import { useSearchParams } from "next/navigation";
import TableFunction from "./tableFunction";
import useSWR from "swr";
import { fetcher } from "@/core/lib/api";
import { Skeleton } from "@heroui/react";
import DataTableClient from "./data-table";

const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;

const View = () => {
    const searchParams = useSearchParams();

    const page = searchParams.get("page")
        ? parseInt(searchParams.get("page") as string)
        : 1;

    const limit = searchParams.get("limit")
        ? parseInt(searchParams.get("limit") as string)
        : 10;

    // Get search query for frontend filtering only
    const query = searchParams.get("q")?.toLowerCase() || "";

    // Build URL without query parameter (backend doesn't support q)
    const buildUserAccessUrl = () => {
        const params = new URLSearchParams({
            page: String(page),
            limit: String(limit),
        });

        return `${BASEURL}/api/portal/master-data/golongan-tarif?${params.toString()}`;
    };

    const { data, isLoading, isValidating, error } = useSWR(
        buildUserAccessUrl(),
        fetcher,
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            keepPreviousData: true,
        }
    );

    // Frontend filtering based on search query
    const filteredData = useMemo(() => {
        if (!data || !data.data) return null;

        if (!query) {
            return data; // Return original data if no search query
        }

        // Filter the data array based on search query (nama or nomor_sk)
        const filtered = data.data.filter((item: any) => {
            const nama = (item.nama || "").toLowerCase();
            const nomorSk = (item.nomor_sk || "").toLowerCase();
            return nama.includes(query) || nomorSk.includes(query);
        });

        // Return filtered data with updated pagination info
        return {
            ...data,
            data: filtered,
            pagination: {
                ...data.pagination,
                totalRecords: filtered.length,
                totalPages: Math.ceil(filtered.length / limit) || 1,
            }
        };
    }, [data, query, limit]);

    // Show skeleton on initial load when there's no data
    const showSkeleton = isLoading && !data;

    // Check if data is valid for rendering
    const hasValidData = filteredData && filteredData.data && Array.isArray(filteredData.data);

    return (
        <div className="my-10 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
            <ul className="flex gap-2">
                <li className="flex gap-2">
                    <Link href={"/"}>
                        <span>Dashboard</span>
                    </Link>
                    <span>/</span>
                </li>

                <li className="flex gap-2">
                    <span>Master Data</span>
                    <span> / </span>{" "}
                </li>
                <li className="flex gap-2">
                    <span>Golongan & Tarif</span>
                </li>
            </ul>

            <h3 className="text-xl font-semibold">Golongan & Tarif</h3>

            <TableFunction />

            {/* Show loading indicator during validation */}
            {isValidating && !isLoading && (
                <div className="text-sm text-gray-500 animate-pulse">
                    Memuat data...
                </div>
            )}

            {showSkeleton ? (
                <div className="p-5 border rounded-lg">
                    <Skeleton className="h-56 w-full rounded-lg" />
                </div>
            ) : error ? (
                <div className="my-10 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4 text-red-500">
                    Error loading data: {error.message || "Unknown error"}
                </div>
            ) : hasValidData ? (
                <DataTableClient
                    columns={columns}
                    data={filteredData}
                    params={Object.fromEntries(searchParams.entries())}
                />
            ) : (
                <div className="p-5 border rounded-lg text-center text-gray-500">
                    Tidak ada data
                </div>
            )}
        </div>
    );
};

export default View;
