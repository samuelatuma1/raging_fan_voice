import { Model, SortOrder } from "mongoose";
import IBaseRepository from "../../../application/contract/data_access/base_repository";
import BaseEntity from "../../../domain/entity/base_entity";
import { PaginationResponse } from "../../../../../core/shared/domain/model/pagination";
export declare class BaseRepository<TEntity extends BaseEntity<TId>, TId> implements IBaseRepository<TEntity, TId> {
    protected _model: Model<TEntity>;
    constructor(model: Model<TEntity>);
    addAsync: (entity: TEntity) => Promise<TEntity>;
    addManyAsync: (entities: TEntity[]) => Promise<TEntity[]>;
    getByIdAsync: (id: TId, joins?: Partial<{ [k in keyof TEntity]: boolean; }>) => Promise<TEntity | null>;
    getAsync: (query?: Partial<{ [k in keyof TEntity]: any; }>, joins?: Partial<{ [k in keyof TEntity]: boolean; }>, sort?: {
        [key: string]: SortOrder;
    }) => Promise<TEntity[]>;
    firstOrDefaultAsync: (query?: Partial<{ [k in keyof TEntity]: any; }>, joins?: Partial<{ [k in keyof TEntity]: boolean; }>) => Promise<TEntity | null>;
    updateAsync: (entity: TEntity) => Promise<TEntity>;
    updateByIdAsync: (id: TId, entity: Partial<TEntity>) => Promise<Partial<TEntity>>;
    updateManyAsync: (query: { [key in keyof Partial<TEntity>]: any; }, update: Partial<TEntity>) => Promise<number>;
    deleteAsync: (entity: TEntity, soft?: boolean) => Promise<number>;
    private buildAddToFieldsQuery;
    addToFieldsList: (query: Partial<{ [k in keyof TEntity]: any; }>, fields: Partial<{ [key in keyof TEntity]: any[]; }>) => Promise<number>;
    private buildRemoveFromFieldsQuery;
    removeFromFieldsList: (query: Partial<{ [k in keyof TEntity]: any; }>, fields: Partial<{ [key in keyof TEntity]: any[] | {
        [key: string]: any;
    }; }>) => Promise<number>;
    addAndRemoveFromFieldsList: (query: Partial<{ [k in keyof TEntity]: any; }>, addToFields: Partial<{ [key in keyof TEntity]: any[]; }>, removeFromField: Partial<{ [key in keyof TEntity]: any[] | {
        [key: string]: any;
    }; }>) => Promise<number>;
    deleteManyAsync: (query: { [key in keyof Partial<TEntity>]: any; }, soft?: boolean) => Promise<number>;
    getPagedAsync: (query: Partial<{ [k in keyof TEntity]: any; }>, lastItemId: TId | null, pageSize?: number, sort?: {
        [key: string]: any;
    }) => Promise<TEntity[]>;
    getPagedAsyncDecrement: (query: Partial<{ [k in keyof TEntity]: any; }>, lastItemId: TId | null, pageSize?: number, sort?: {
        [key: string]: any;
    }) => Promise<TEntity[]>;
    toPagedAsync: (query: Partial<{ [k in keyof TEntity]: any; }>, page?: number, pageSize?: number, sort?: {
        [k: string]: any;
    }) => Promise<PaginationResponse<TEntity>>;
    private convertToEntity;
    firstOrDefault: (query: Partial<{ [k in keyof TEntity]: any; }>) => Promise<TEntity | null>;
    contains: (query: Partial<{ [k in keyof TEntity]: any[]; }>, joins?: Partial<{ [k in keyof TEntity]: boolean; }>) => Promise<TEntity[]>;
    or: (queries: Partial<{ [k in keyof TEntity]: any; }>[], joins?: Partial<{ [k in keyof TEntity]: boolean; }>) => Promise<TEntity[]>;
    and: (queries: Partial<{ [k in keyof TEntity]: any; }>[], joins?: Partial<{ [k in keyof TEntity]: boolean; }>) => Promise<TEntity[]>;
}
