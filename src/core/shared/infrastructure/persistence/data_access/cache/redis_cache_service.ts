import { createClient, RedisClientType,  } from "redis";
import IRedisConfig, { IIRedisConfig } from './config/redis_config'
import SerializationUtility from "../../../../application/utils/utilities/serialization_utility";
import { inject, injectable } from "tsyringe";
import ICacheService from "../../../../application/contract/data_access/cache/cache_service";

@injectable()
export class RedisCache implements ICacheService{
    private redisClient: RedisClientType | null = null;
    private _keyPrefix: string = "RAGING_FAN_"
    constructor(@inject(IIRedisConfig)private readonly config: IRedisConfig) {
        try {
            const redis: RedisClientType = createClient({ url: this.config.REDIS_URL });
            console.log({redis_url: this.config.REDIS_URL})
            redis.on('error', (err) => console.log('Redis Client Error', err));

            // Connect and assign the redisClient
            this.getRedisConnection()
              .then(resp => {
                this.redisClient = resp;
              })
        } catch (ex) {
            console.log('Redis Client Error', ex);
        }
    }

    public getRedisConnection = async () => {
      if(!this.redisClient){
          const redis: RedisClientType = createClient({ url: this.config.REDIS_URL });
          this.redisClient = await redis.connect();
      }
      return this.redisClient;
    }
    public addAsync = async (key: string, value: any, durationInSeconds: number): Promise<boolean> => {
      try{
        let redisConnection = await this.getRedisConnection();
        let valueAsJson = SerializationUtility.serializeJson(value)
        let response = redisConnection.set(this._keyPrefix + key, valueAsJson, {EX: durationInSeconds})
        
        return true;
      }
      catch(ex){
        console.log(ex);
        return false;
      }
    }
  
    public getAsync = async <T>(key: string): Promise<T | null> => {
      try{
        let redisConnection = await this.getRedisConnection();
        let json = await redisConnection.get(this._keyPrefix + key);
        return SerializationUtility.deserializeJson<T>(json);
      }
      catch(ex){
        console.log(ex);
        return null;
      }
    }

    public deleteAsync = async (key: string): Promise<boolean> => {
        try{
          let redisConnection = await this.getRedisConnection();
          await redisConnection.del(key)
          return true
        } catch(ex){
          console.log(ex)
          return false;
        }
    }
  }