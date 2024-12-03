import { SortOrder } from "../../../domain/enum/sort_order";
import BaseEntity from "../../../domain/entity/base_entity";
import { PaginationResponse } from "../../../../../core/shared/domain/model/pagination";
export default interface IBaseRepository<TEntity extends BaseEntity<TId>, TId> {
    addAsync(entity: TEntity): Promise<TEntity>;
    addManyAsync(entities: TEntity[]): Promise<TEntity[]>;
    getByIdAsync(id: TId, joins?: Partial<{
        [k in keyof TEntity]: boolean;
    }>): Promise<TEntity | null>;
    getAsync(query?: Partial<{
        [k in keyof TEntity]: any;
    }>, joins?: Partial<{
        [k in keyof TEntity]: boolean;
    }>, sort?: {
        [key: string]: SortOrder;
    }): Promise<TEntity[]>;
    getPagedAsync(query: Partial<{
        [k in keyof TEntity]: any;
    }>, lastItemId: TId | null, pageSize?: number, sort?: {
        [key: string]: any;
    }): Promise<TEntity[]>;
    getPagedAsyncDecrement(query: Partial<{
        [k in keyof TEntity]: any;
    }>, lastItemId: TId | null, pageSize?: number, sort?: {
        [key: string]: any;
    }): Promise<TEntity[]>;
    toPagedAsync(query: Partial<{
        [k in keyof TEntity]: any;
    }>, page: number, pageSize: number, sort?: {
        [k: string]: any;
    } | string): Promise<PaginationResponse<TEntity>>;
    firstOrDefaultAsync(query: Partial<{
        [k in keyof TEntity]: any;
    }>, joins?: Partial<{
        [k in keyof TEntity]: boolean;
    }>): Promise<TEntity | null>;
    updateByIdAsync(id: TId, entity: Partial<TEntity>): Promise<Partial<TEntity>>;
    updateAsync(entity: TEntity): Promise<TEntity>;
    updateManyAsync(query: {
        [key in keyof Partial<TEntity>]: any;
    }, update: Partial<TEntity>): Promise<number>;
    deleteAsync(entity: TEntity, soft?: boolean): Promise<number>;
    deleteManyAsync(query: {
        [key in keyof Partial<TEntity>]: any;
    }, soft?: boolean): Promise<number>;
    contains(query: Partial<{
        [k in keyof TEntity]: any[];
    }>, joins?: Partial<{
        [k in keyof TEntity]: boolean;
    }>): Promise<TEntity[]>;
    or(queries: Partial<{
        [k in keyof TEntity]: any;
    }>[], joins?: Partial<{
        [k in keyof TEntity]: boolean;
    }>): Promise<TEntity[]>;
    and(queries: Partial<{
        [k in keyof TEntity]: any;
    }>[], joins?: Partial<{
        [k in keyof TEntity]: boolean;
    }>): Promise<TEntity[]>;
    addToFieldsList(query: Partial<{
        [k in keyof TEntity]: any;
    }>, fields: Partial<{
        [key in keyof TEntity]: any[];
    }>): Promise<number>;
    removeFromFieldsList(query: Partial<{
        [k in keyof TEntity]: any;
    }>, fields: Partial<{
        [key in keyof TEntity]: any[] | {
            [key: string]: any;
        };
    }>): Promise<number>;
    addAndRemoveFromFieldsList(query: Partial<{
        [k in keyof TEntity]: any;
    }>, addToFields: Partial<{
        [key in keyof TEntity]: any[];
    }>, removeFromField: Partial<{
        [key in keyof TEntity]: any[] | {
            [key: string]: any;
        };
    }>): Promise<number>;
}
