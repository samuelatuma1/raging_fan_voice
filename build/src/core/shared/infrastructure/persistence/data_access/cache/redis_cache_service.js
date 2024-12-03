"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisCache = void 0;
const redis_1 = require("redis");
const redis_config_1 = require("./config/redis_config");
const serialization_utility_1 = __importDefault(require("../../../../application/utils/utilities/serialization_utility"));
const tsyringe_1 = require("tsyringe");
let RedisCache = class RedisCache {
    config;
    redisClient = null;
    _keyPrefix = "RAGING_FAN_";
    constructor(config) {
        this.config = config;
        try {
            const redis = (0, redis_1.createClient)({ url: this.config.REDIS_URL });
            console.log({ redis_url: this.config.REDIS_URL });
            redis.on('error', (err) => console.log('Redis Client Error', err));
            // Connect and assign the redisClient
            this.getRedisConnection()
                .then(resp => {
                this.redisClient = resp;
            });
        }
        catch (ex) {
            console.log('Redis Client Error', ex);
        }
    }
    getRedisConnection = async () => {
        if (!this.redisClient) {
            const redis = (0, redis_1.createClient)({ url: this.config.REDIS_URL });
            this.redisClient = await redis.connect();
        }
        return this.redisClient;
    };
    addAsync = async (key, value, durationInSeconds) => {
        try {
            let redisConnection = await this.getRedisConnection();
            let valueAsJson = serialization_utility_1.default.serializeJson(value);
            let response = redisConnection.set(this._keyPrefix + key, valueAsJson, { EX: durationInSeconds });
            return true;
        }
        catch (ex) {
            console.log(ex);
            return false;
        }
    };
    getAsync = async (key) => {
        try {
            let redisConnection = await this.getRedisConnection();
            let json = await redisConnection.get(this._keyPrefix + key);
            return serialization_utility_1.default.deserializeJson(json);
        }
        catch (ex) {
            console.log(ex);
            return null;
        }
    };
    deleteAsync = async (key) => {
        try {
            let redisConnection = await this.getRedisConnection();
            await redisConnection.del(key);
            return true;
        }
        catch (ex) {
            console.log(ex);
            return false;
        }
    };
};
exports.RedisCache = RedisCache;
exports.RedisCache = RedisCache = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(redis_config_1.IIRedisConfig)),
    __metadata("design:paramtypes", [Object])
], RedisCache);
//# sourceMappingURL=redis_cache_service.js.map