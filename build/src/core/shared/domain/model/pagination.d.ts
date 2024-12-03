interface PaginationResponseInit<T> {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
    items: T[];
}
export declare class PaginationResponse<T> {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
    items: T[];
    constructor(currentPage: number | PaginationResponseInit<T>, itemsPerPage?: number, totalItems?: number, totalPages?: number, items?: T[]);
}
export {};
