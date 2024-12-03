import { Document, Model, SortOrder } from "mongoose";
import DateUtility from "../../../application/utils/utilities/date_utility";
import IBaseRepository from "../../../application/contract/data_access/base_repository";
import BaseEntity from "../../../domain/entity/base_entity";
import { RecordStatus } from "../../../domain/enum/record_status";
import { PaginationResponse } from "../../../../../core/shared/domain/model/pagination";



export class BaseRepository<TEntity extends BaseEntity<TId>, TId> implements IBaseRepository<TEntity,  TId>{
    protected _model: Model<TEntity>
    public constructor(model: Model<TEntity>){
       this._model = model;
    }
    addAsync =  async (entity: TEntity): Promise<TEntity> => {
        // Handles adding a deleted entity 
        if(entity.recordStatus === RecordStatus.DELETED){
            entity.recordStatus = RecordStatus.ACTIVE;
            await this.updateAsync(entity);
            return entity;
        }
        const entityToSave = this.convertToEntity(entity);

        const savedEntity = await this._model.create(entityToSave);

        return savedEntity.toObject();
    }
    addManyAsync = async (entities: TEntity[]): Promise<TEntity[]> => {
        const entitiesToSave = entities.map(this.convertToEntity);
        if(!entitiesToSave.length){
            return [];
        }
        let inserted = await this._model.insertMany(entitiesToSave);
        console.log({inserted})
        return entitiesToSave;
    }


    getByIdAsync = async (id: TId, joins?: Partial<{[k in keyof TEntity]: boolean}>): Promise<TEntity | null> => {
        let dbQuery = this._model.findById(id);
        if(joins){
            for(let key in joins){
                if(joins[key]){
                    dbQuery = dbQuery.populate(key)
                }
            }
        }
        return (await dbQuery)?.toObject() ?? null;
    }
    getAsync = async (query: Partial<{[k in keyof TEntity]: any}> = {}, joins?: Partial<{[k in keyof TEntity]: boolean}>, sort?: {[key: string]: SortOrder}): Promise<TEntity[]> => {
        if(!query.hasOwnProperty('recordStatus')){
            query.recordStatus = { "$ne": RecordStatus.DELETED };
        }
        let dbQuery = this._model.find(query);
        if(joins){
            for(let key in joins){
                if(joins[key]){
                    dbQuery = dbQuery.populate(key)
                }
            }
        }
        if(sort){
            dbQuery.sort(sort)
        }
        return (await dbQuery).map(query => query.toObject());
    }
    firstOrDefaultAsync = async (query: Partial<{[k in keyof TEntity]: any}> = {}, joins?: Partial<{[k in keyof TEntity]: boolean}>): Promise<TEntity | null> => {
        if(!query.hasOwnProperty('recordStatus')){
            query.recordStatus = { "$ne": RecordStatus.DELETED };
        }
        let dbQuery = this._model.findOne(query);
        if(joins){
            for(let key in joins){
                if(joins[key]){
                    dbQuery = dbQuery.populate(key)
                }
            }
        }
        const entity = await dbQuery;
        return entity?.toObject() ?? null;
    } 

    updateAsync = async (entity: TEntity): Promise<TEntity> => {
        entity.updatedAt = DateUtility.getUTCNow();
        await this._model.findByIdAndUpdate(entity._id, entity);
        return entity;
    }
    updateByIdAsync = async (id: TId, entity: Partial<TEntity>): Promise<Partial<TEntity>> => {
        entity.updatedAt = DateUtility.getUTCNow();
        await this._model.findByIdAndUpdate(id, entity);
        return entity;
    }
    updateManyAsync = async (query: {[key in keyof Partial<TEntity>]: any}, update: Partial<TEntity>): Promise<number> => {
        update.updatedAt =  DateUtility.getUTCNow();
        const updatedResponse  = await this._model.updateMany(query, update);
        return updatedResponse.modifiedCount;
    }
    deleteAsync = async (entity: TEntity, soft: boolean = true): Promise<number> => {
        const savedEntity = await this.getByIdAsync(entity._id);
        
        if(savedEntity && soft === true){
            savedEntity.recordStatus = RecordStatus.DELETED;
            const updated = await this.updateAsync(savedEntity);
            return 1;
        }
        else if(savedEntity && soft === false){
            await this._model.deleteOne(savedEntity);
            return 1;
        }
        return 0;
    }

    private buildAddToFieldsQuery = (fields: Partial<{[key in keyof TEntity]: any[]}>): {$addToSet: Partial<{[key in keyof TEntity]: {$each: any[]}}> }=> {
        let addToSetQuery: Partial<{[key in keyof TEntity]: {$each: any[]}}> = {}
        for(let [key, values] of Object.entries(fields)){
            addToSetQuery[key as keyof TEntity] = {$each: values}
            console.log({$each: values})
        }
        return {$addToSet: addToSetQuery}
    }
    addToFieldsList = async (query: Partial<{[k in keyof TEntity]: any}>, fields: Partial<{[key in keyof TEntity]: any[]}>): Promise<number> => {
        let update = this.buildAddToFieldsQuery(fields);
        let updatedResponse = await this._model.updateMany(query, update)
        console.log({updatedResponse})
        return updatedResponse.modifiedCount;
    }
    private buildRemoveFromFieldsQuery = (fields: Partial<{[key in keyof TEntity]: any[] | {[key: string]: any}}>): {$pull: Partial<{[key in keyof TEntity]: ({$in: any[]} | {[key: string]: any} )}> }=>{
        let deleteFromFieldListQuery: Partial<{[key in keyof TEntity]: ({$in: any[]} | {[key: string]: any})}> = {}
        
        for(let [key, values] of Object.entries(fields)){
            if(Array.isArray(values)){
                deleteFromFieldListQuery[key as keyof TEntity] = {$in: values}
            }
            else{
                deleteFromFieldListQuery[key as keyof TEntity] = values as {[key: string]: any}
            }
        }
        return {$pull: deleteFromFieldListQuery}
    }
    removeFromFieldsList = async (query: Partial<{[k in keyof TEntity]: any}>, fields: Partial<{[key in keyof TEntity]: any[] | {[key: string]: any}}>): Promise<number> => {
        let update = this.buildRemoveFromFieldsQuery(fields)
        let updatedResponse = await this._model.updateMany(query, update)
        console.log(updatedResponse)
        return updatedResponse.modifiedCount;
    }

    addAndRemoveFromFieldsList = async (query: Partial<{[k in keyof TEntity]: any}>, addToFields: Partial<{[key in keyof TEntity]: any[]}>, removeFromField: Partial<{[key in keyof TEntity]: any[] | {[key: string]: any}}>): Promise<number> => {
        let addFieldsQuery = this.buildAddToFieldsQuery(addToFields);
        let removeFieldsQuery = this.buildRemoveFromFieldsQuery(removeFromField);

        let addAndRemoveUpdate = {...addFieldsQuery, ...removeFieldsQuery};
        let addKeys = new Set();
        let shouldUpdateaddAndRemoveFieldsSeparately: boolean = false;
        for(let key in addFieldsQuery.$addToSet){
            addKeys.add(key.toString())
        }
        for(let key in removeFieldsQuery.$pull){
            if(addKeys.has(key.toString())){
                shouldUpdateaddAndRemoveFieldsSeparately = true
            }
        }

        console.log({addAndRemoveUpdate})

        if(!shouldUpdateaddAndRemoveFieldsSeparately){
            let updatedResponse = await this._model.updateMany(query, addAndRemoveUpdate)
            return updatedResponse.modifiedCount;
        }
        else{
            console.log("Updating separately")
            await this._model.updateMany(query, addFieldsQuery);
            await this._model.updateMany(query, removeFieldsQuery);
        }
    }

    deleteManyAsync = async (query: {[key in keyof Partial<TEntity>]: any}, soft: boolean = true): Promise<number> => {
        let deleteCount = 0;
        if(soft){
            const deleteUpdate : Partial<TEntity> = { recordStatus : RecordStatus.DELETED} as Partial<TEntity>;
            deleteCount = await this.updateManyAsync(query, deleteUpdate);
        } 
        else{
            const deleteResponse = await this._model.deleteMany(query);
            deleteCount =  deleteResponse.deletedCount;
        }

        return deleteCount;
    }

    getPagedAsync = async (query:  Partial<{[k in keyof TEntity]: any}>, lastItemId: TId | null, pageSize: number = 10, sort?: {[key: string]: any}) : Promise<TEntity[]>=> {
        let queryData:  Record<string, any> = Object.fromEntries(Object.entries(query));
        
        if (lastItemId != null) {
            queryData._id = { $gt: lastItemId };
        }
        sort = { ...sort, _id: 1}
        const result = await this._model.find(queryData).sort(sort).limit(pageSize);
        return result.map(res => res.toObject());
    }

    getPagedAsyncDecrement = async (query:  Partial<{[k in keyof TEntity]: any}>, lastItemId: TId | null, pageSize: number = 10, sort: {[key: string]: any} = {}) : Promise<TEntity[]>=> {
        let queryData:  Record<string, any> = Object.fromEntries(Object.entries(query));
        
        if (lastItemId != null) {
            queryData._id = { $lt: lastItemId };
        }
        sort = { ...sort, _id: -1}
        const result = await this._model.find(queryData).sort(sort).limit(pageSize);
        return result.map(res => res.toObject());
    }

    toPagedAsync = async (query: Partial<{[k in keyof TEntity]: any}>, page: number = 1, pageSize: number = 10, sort: {[k: string]: any} = {_id: -1} ): Promise<PaginationResponse<TEntity>> => {
        page = typeof page === 'string' ? parseInt(page as string) : page
        pageSize = typeof pageSize === 'string' ? parseInt(pageSize as string) : pageSize
        const itemsToSkipCount = (page === 0 ? 0 : (page - 1 )) * pageSize
        let paginatedItemsAggregate = page === 0 ? [] : [
            { $skip: itemsToSkipCount },
            { $limit: pageSize },
          ]
        if((query as {[key: string]: any}).page){

            delete (query as {[key: string]: any})["page"]

        }
        if((query as {[key: string]: any}).pageSize){

            delete (query as {[key: string]: any})["pageSize"]
        }
        const result = await this._model.aggregate([
            { $match: query }, // Match your query
            { $sort: sort }, // Sort as needed
            { $facet: { // Use $facet to run multiple pipelines within a single stage
              paginatedItems: paginatedItemsAggregate,
              totalCount: [
                { $count: 'count' },
              ],
            }},
          ]);
          
        const totalCount = result[0].totalCount[0] ? result[0].totalCount[0].count : 0;
        const paginatedItems: TEntity[] = (result[0]?.paginatedItems)?.map((res: Document) => {
            console.log({res})
            return res
        }) ?? [];
        const totalPages = page === 0 ? 1 : Math.floor(totalCount / pageSize) + ((totalCount % pageSize == 0) ? 0 : 1);

        return new PaginationResponse<TEntity>(page, page === 0 ? totalCount : pageSize, totalCount, totalPages, paginatedItems);
    }

    private convertToEntity = (entity: TEntity): TEntity => {
        entity.recordStatus = RecordStatus.ACTIVE;
        entity.createdAt = DateUtility.getUTCNow();
        entity.updatedAt = DateUtility.getUTCNow();
        return entity;
    }

    firstOrDefault = async (query:  Partial<{[k in keyof TEntity]: any}>): Promise<TEntity | null> => {
        return (await this._model.findOne(query))?.toObject() ?? null;
    }
    
    contains = async (query: Partial<{[k in keyof TEntity]: any[]}>, joins?: Partial<{[k in keyof TEntity]: boolean}>): Promise<TEntity[]> => {
        let actualQuery: Partial<{[k in keyof TEntity]: {[key: string]: any[]}}> = {};
        for(let key in query){
            actualQuery[key] = {"$in": query[key]}
        }
        
        return await this.getAsync(actualQuery, joins);
    }


    or = async (queries: Partial<{[k in keyof TEntity]: any}>[], joins?: Partial<{[k in keyof TEntity]: boolean}>): Promise<TEntity[]> => {
        
        let dbQuery = this._model.find({$or: queries});
        if(joins){
            for(let key in joins){
                if(joins[key]){
                    dbQuery = dbQuery.populate(key)
                }
            }
        }
        return (await dbQuery).map((res: Document) => res.toObject());
    }

    and = async (queries: Partial<{[k in keyof TEntity]: any}>[], joins?: Partial<{[k in keyof TEntity]: boolean}>): Promise<TEntity[]> => {
        let dbQuery = this._model.find({$and: queries});
        if(joins){
            for(let key in joins){
                if(joins[key]){
                    dbQuery = dbQuery.populate(key)
                }
            }
        }
        return (await dbQuery).map((res: Document) => res.toObject());
    }
    
}