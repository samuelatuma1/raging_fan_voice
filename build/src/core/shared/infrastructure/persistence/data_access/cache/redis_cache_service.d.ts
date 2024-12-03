import { RedisClientType } from "redis";
import IRedisConfig from './config/redis_config';
import ICacheService from "../../../../application/contract/data_access/cache/cache_service";
export declare class RedisCache implements ICacheService {
    private readonly config;
    private redisClient;
    private _keyPrefix;
    constructor(config: IRedisConfig);
    getRedisConnection: () => Promise<RedisClientType>;
    addAsync: (key: string, value: any, durationInSeconds: number) => Promise<boolean>;
    getAsync: <T>(key: string) => Promise<T | null>;
    deleteAsync: (key: string) => Promise<boolean>;
}
