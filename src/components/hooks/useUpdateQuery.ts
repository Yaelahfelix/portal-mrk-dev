"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";

type QueryParams = Record<string, string | number | null | undefined>;

const useUpdateQuery = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const updateQuery = useCallback(
        (params: QueryParams) => {
            const current = new URLSearchParams(Array.from(searchParams.entries()));

            Object.entries(params).forEach(([key, value]) => {
                if (value === null || value === undefined || value === "") {
                    current.delete(key);
                } else {
                    current.set(key, String(value));
                }
            });

            const search = current.toString();
            const query = search ? `?${search}` : "";

            router.push(`${pathname}${query}`);
        },
        [pathname, router, searchParams]
    );

    return updateQuery;
};

export default useUpdateQuery;
