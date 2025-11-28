import useSWR from "swr";
import { useMemo } from "react";
import RolesRepository from "./RolesRepository";

export const useRolesList = () => {
    const repository = useMemo(() => new RolesRepository(), []);
    const swrKey = "/roles/list";

    const fetcher = () => repository.getAll();

    const { data, error, isLoading, isValidating, mutate } = useSWR(
        swrKey,
        fetcher,
        {
            revalidateOnFocus: false,
            errorRetryCount: 3,
        },
    );

    return {
        data,
        error,
        isLoading,
        isValidating,
        refresh: mutate,
    };
};
