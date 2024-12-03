export default class Pagination<T> {
    page?: number = 0; 
    pageSize?: number = 10;
    lastId?: T = null;
}

