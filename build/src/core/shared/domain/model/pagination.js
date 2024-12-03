"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationResponse = void 0;
class PaginationResponse {
    currentPage;
    itemsPerPage;
    totalItems;
    totalPages;
    items;
    constructor(currentPage, itemsPerPage, totalItems, totalPages, items) {
        if (typeof (currentPage) === "number") {
            this.currentPage = currentPage;
            this.itemsPerPage = itemsPerPage;
            this.totalItems = totalItems;
            this.totalPages = totalPages;
            this.items = items;
        }
        else {
            this.currentPage = currentPage.currentPage;
            this.itemsPerPage = currentPage.itemsPerPage;
            this.totalItems = currentPage.totalItems;
            this.totalPages = currentPage.totalPages;
            this.items = currentPage.items;
        }
    }
}
exports.PaginationResponse = PaginationResponse;
//# sourceMappingURL=pagination.js.map