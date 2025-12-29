export interface PaginationResultType {
    total: number;
    totalRecords?: number;
    page: number;
    currentPage?: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}
