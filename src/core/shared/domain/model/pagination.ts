interface PaginationResponseInit<T> {
    currentPage: number
    itemsPerPage: number
    totalItems: number
    totalPages: number
    items: T[]
}
export class PaginationResponse<T> {
    currentPage: number
    itemsPerPage: number
    totalItems: number
    totalPages: number
    items: T[]

    public constructor(currentPage: number | PaginationResponseInit<T>, itemsPerPage?: number, totalItems?: number, totalPages?: number, items?: T[]){
            if(typeof(currentPage) === "number"){
                this.currentPage = currentPage;
                this.itemsPerPage = itemsPerPage;
                this.totalItems = totalItems;
                this.totalPages = totalPages;
                this.items = items;
            }
            else{
                this.currentPage = currentPage.currentPage;
                this.itemsPerPage = currentPage.itemsPerPage;
                this.totalItems = currentPage.totalItems;
                this.totalPages = currentPage.totalPages;
                this.items = currentPage.items;
            }
    }
}