"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.BaseRepository = void 0;
var date_utility_1 = require("../../../application/utils/utilities/date_utility");
var record_status_1 = require("../../../domain/enum/record_status");
var pagination_1 = require("../../../../../core/shared/domain/model/pagination");
var BaseRepository = /** @class */ (function () {
    function BaseRepository(model) {
        var _this = this;
        this.addAsync = function (entity) { return __awaiter(_this, void 0, Promise, function () {
            var entityToSave, savedEntity;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(entity.recordStatus === record_status_1.RecordStatus.DELETED)) return [3 /*break*/, 2];
                        entity.recordStatus = record_status_1.RecordStatus.ACTIVE;
                        return [4 /*yield*/, this.updateAsync(entity)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, entity];
                    case 2:
                        entityToSave = this.convertToEntity(entity);
                        return [4 /*yield*/, this._model.create(entityToSave)];
                    case 3:
                        savedEntity = _a.sent();
                        return [2 /*return*/, savedEntity.toObject()];
                }
            });
        }); };
        this.addManyAsync = function (entities) { return __awaiter(_this, void 0, Promise, function () {
            var entitiesToSave, inserted;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        entitiesToSave = entities.map(this.convertToEntity);
                        if (!entitiesToSave.length) {
                            return [2 /*return*/, []];
                        }
                        return [4 /*yield*/, this._model.insertMany(entitiesToSave)];
                    case 1:
                        inserted = _a.sent();
                        console.log({ inserted: inserted });
                        return [2 /*return*/, entitiesToSave];
                }
            });
        }); };
        this.getByIdAsync = function (id, joins) { return __awaiter(_this, void 0, Promise, function () {
            var dbQuery, key;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        dbQuery = this._model.findById(id);
                        if (joins) {
                            for (key in joins) {
                                if (joins[key]) {
                                    dbQuery = dbQuery.populate(key);
                                }
                            }
                        }
                        return [4 /*yield*/, dbQuery];
                    case 1: return [2 /*return*/, (_b = (_a = (_c.sent())) === null || _a === void 0 ? void 0 : _a.toObject()) !== null && _b !== void 0 ? _b : null];
                }
            });
        }); };
        this.getAsync = function (query, joins, sort) {
            if (query === void 0) { query = {}; }
            return __awaiter(_this, void 0, Promise, function () {
                var dbQuery, key;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!query.hasOwnProperty('recordStatus')) {
                                query.recordStatus = { "$ne": record_status_1.RecordStatus.DELETED };
                            }
                            dbQuery = this._model.find(query);
                            if (joins) {
                                for (key in joins) {
                                    if (joins[key]) {
                                        dbQuery = dbQuery.populate(key);
                                    }
                                }
                            }
                            if (sort) {
                                dbQuery.sort(sort);
                            }
                            return [4 /*yield*/, dbQuery];
                        case 1: return [2 /*return*/, (_a.sent()).map(function (query) { return query.toObject(); })];
                    }
                });
            });
        };
        this.firstOrDefaultAsync = function (query, joins) {
            if (query === void 0) { query = {}; }
            return __awaiter(_this, void 0, Promise, function () {
                var dbQuery, key, entity;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!query.hasOwnProperty('recordStatus')) {
                                query.recordStatus = { "$ne": record_status_1.RecordStatus.DELETED };
                            }
                            dbQuery = this._model.findOne(query);
                            if (joins) {
                                for (key in joins) {
                                    if (joins[key]) {
                                        dbQuery = dbQuery.populate(key);
                                    }
                                }
                            }
                            return [4 /*yield*/, dbQuery];
                        case 1:
                            entity = _b.sent();
                            return [2 /*return*/, (_a = entity === null || entity === void 0 ? void 0 : entity.toObject()) !== null && _a !== void 0 ? _a : null];
                    }
                });
            });
        };
        this.updateAsync = function (entity) { return __awaiter(_this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        entity.updatedAt = date_utility_1["default"].getUTCNow();
                        return [4 /*yield*/, this._model.findByIdAndUpdate(entity._id, entity)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, entity];
                }
            });
        }); };
        this.updateByIdAsync = function (id, entity) { return __awaiter(_this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        entity.updatedAt = date_utility_1["default"].getUTCNow();
                        return [4 /*yield*/, this._model.findByIdAndUpdate(id, entity)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, entity];
                }
            });
        }); };
        this.updateManyAsync = function (query, update) { return __awaiter(_this, void 0, Promise, function () {
            var updatedResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        update.updatedAt = date_utility_1["default"].getUTCNow();
                        return [4 /*yield*/, this._model.updateMany(query, update)];
                    case 1:
                        updatedResponse = _a.sent();
                        return [2 /*return*/, updatedResponse.modifiedCount];
                }
            });
        }); };
        this.deleteAsync = function (entity, soft) {
            if (soft === void 0) { soft = true; }
            return __awaiter(_this, void 0, Promise, function () {
                var savedEntity, updated;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getByIdAsync(entity._id)];
                        case 1:
                            savedEntity = _a.sent();
                            if (!(savedEntity && soft === true)) return [3 /*break*/, 3];
                            savedEntity.recordStatus = record_status_1.RecordStatus.DELETED;
                            return [4 /*yield*/, this.updateAsync(savedEntity)];
                        case 2:
                            updated = _a.sent();
                            return [2 /*return*/, 1];
                        case 3:
                            if (!(savedEntity && soft === false)) return [3 /*break*/, 5];
                            return [4 /*yield*/, this._model.deleteOne(savedEntity)];
                        case 4:
                            _a.sent();
                            return [2 /*return*/, 1];
                        case 5: return [2 /*return*/, 0];
                    }
                });
            });
        };
        this.buildAddToFieldsQuery = function (fields) {
            var addToSetQuery = {};
            for (var _i = 0, _a = Object.entries(fields); _i < _a.length; _i++) {
                var _b = _a[_i], key = _b[0], values = _b[1];
                addToSetQuery[key] = { $each: values };
                console.log({ $each: values });
            }
            return { $addToSet: addToSetQuery };
        };
        this.addToFieldsList = function (query, fields) { return __awaiter(_this, void 0, Promise, function () {
            var update, updatedResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        update = this.buildAddToFieldsQuery(fields);
                        return [4 /*yield*/, this._model.updateMany(query, update)];
                    case 1:
                        updatedResponse = _a.sent();
                        console.log({ updatedResponse: updatedResponse });
                        return [2 /*return*/, updatedResponse.modifiedCount];
                }
            });
        }); };
        this.buildRemoveFromFieldsQuery = function (fields) {
            var deleteFromFieldListQuery = {};
            for (var _i = 0, _a = Object.entries(fields); _i < _a.length; _i++) {
                var _b = _a[_i], key = _b[0], values = _b[1];
                if (Array.isArray(values)) {
                    deleteFromFieldListQuery[key] = { $in: values };
                }
                else {
                    deleteFromFieldListQuery[key] = values;
                }
            }
            return { $pull: deleteFromFieldListQuery };
        };
        this.removeFromFieldsList = function (query, fields) { return __awaiter(_this, void 0, Promise, function () {
            var update, updatedResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        update = this.buildRemoveFromFieldsQuery(fields);
                        return [4 /*yield*/, this._model.updateMany(query, update)];
                    case 1:
                        updatedResponse = _a.sent();
                        console.log(updatedResponse);
                        return [2 /*return*/, updatedResponse.modifiedCount];
                }
            });
        }); };
        this.addAndRemoveFromFieldsList = function (query, addToFields, removeFromField) { return __awaiter(_this, void 0, Promise, function () {
            var addFieldsQuery, removeFieldsQuery, addAndRemoveUpdate, addKeys, shouldUpdateaddAndRemoveFieldsSeparately, key, key, updatedResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        addFieldsQuery = this.buildAddToFieldsQuery(addToFields);
                        removeFieldsQuery = this.buildRemoveFromFieldsQuery(removeFromField);
                        addAndRemoveUpdate = __assign(__assign({}, addFieldsQuery), removeFieldsQuery);
                        addKeys = new Set();
                        shouldUpdateaddAndRemoveFieldsSeparately = false;
                        for (key in addFieldsQuery.$addToSet) {
                            addKeys.add(key.toString());
                        }
                        for (key in removeFieldsQuery.$pull) {
                            if (addKeys.has(key.toString())) {
                                shouldUpdateaddAndRemoveFieldsSeparately = true;
                            }
                        }
                        console.log({ addAndRemoveUpdate: addAndRemoveUpdate });
                        if (!!shouldUpdateaddAndRemoveFieldsSeparately) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._model.updateMany(query, addAndRemoveUpdate)];
                    case 1:
                        updatedResponse = _a.sent();
                        return [2 /*return*/, updatedResponse.modifiedCount];
                    case 2:
                        console.log("Updating separately");
                        return [4 /*yield*/, this._model.updateMany(query, addFieldsQuery)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this._model.updateMany(query, removeFieldsQuery)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.deleteManyAsync = function (query, soft) {
            if (soft === void 0) { soft = true; }
            return __awaiter(_this, void 0, Promise, function () {
                var deleteCount, deleteUpdate, deleteResponse;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            deleteCount = 0;
                            if (!soft) return [3 /*break*/, 2];
                            deleteUpdate = { recordStatus: record_status_1.RecordStatus.DELETED };
                            return [4 /*yield*/, this.updateManyAsync(query, deleteUpdate)];
                        case 1:
                            deleteCount = _a.sent();
                            return [3 /*break*/, 4];
                        case 2: return [4 /*yield*/, this._model.deleteMany(query)];
                        case 3:
                            deleteResponse = _a.sent();
                            deleteCount = deleteResponse.deletedCount;
                            _a.label = 4;
                        case 4: return [2 /*return*/, deleteCount];
                    }
                });
            });
        };
        this.getPagedAsync = function (query, lastItemId, pageSize, sort) {
            if (pageSize === void 0) { pageSize = 10; }
            return __awaiter(_this, void 0, Promise, function () {
                var queryData, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            queryData = Object.fromEntries(Object.entries(query));
                            if (lastItemId != null) {
                                queryData._id = { $gt: lastItemId };
                            }
                            sort = __assign(__assign({}, sort), { _id: 1 });
                            return [4 /*yield*/, this._model.find(queryData).sort(sort).limit(pageSize)];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, result.map(function (res) { return res.toObject(); })];
                    }
                });
            });
        };
        this.getPagedAsyncDecrement = function (query, lastItemId, pageSize, sort) {
            if (pageSize === void 0) { pageSize = 10; }
            if (sort === void 0) { sort = {}; }
            return __awaiter(_this, void 0, Promise, function () {
                var queryData, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            queryData = Object.fromEntries(Object.entries(query));
                            if (lastItemId != null) {
                                queryData._id = { $lt: lastItemId };
                            }
                            sort = __assign(__assign({}, sort), { _id: -1 });
                            return [4 /*yield*/, this._model.find(queryData).sort(sort).limit(pageSize)];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, result.map(function (res) { return res.toObject(); })];
                    }
                });
            });
        };
        this.toPagedAsync = function (query, page, pageSize, sort) {
            if (page === void 0) { page = 1; }
            if (pageSize === void 0) { pageSize = 10; }
            if (sort === void 0) { sort = { _id: -1 }; }
            return __awaiter(_this, void 0, Promise, function () {
                var itemsToSkipCount, paginatedItemsAggregate, result, totalCount, paginatedItems, totalPages;
                var _a, _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            page = typeof page === 'string' ? parseInt(page) : page;
                            pageSize = typeof pageSize === 'string' ? parseInt(pageSize) : pageSize;
                            itemsToSkipCount = (page === 0 ? 0 : (page - 1)) * pageSize;
                            paginatedItemsAggregate = page === 0 ? [] : [
                                { $skip: itemsToSkipCount },
                                { $limit: pageSize },
                            ];
                            if (query.page) {
                                delete query["page"];
                            }
                            if (query.pageSize) {
                                delete query["pageSize"];
                            }
                            return [4 /*yield*/, this._model.aggregate([
                                    { $match: query },
                                    { $sort: sort },
                                    { $facet: {
                                            paginatedItems: paginatedItemsAggregate,
                                            totalCount: [
                                                { $count: 'count' },
                                            ]
                                        } },
                                ])];
                        case 1:
                            result = _d.sent();
                            totalCount = result[0].totalCount[0] ? result[0].totalCount[0].count : 0;
                            paginatedItems = (_c = (_b = ((_a = result[0]) === null || _a === void 0 ? void 0 : _a.paginatedItems)) === null || _b === void 0 ? void 0 : _b.map(function (res) {
                                console.log({ res: res });
                                return res;
                            })) !== null && _c !== void 0 ? _c : [];
                            totalPages = page === 0 ? 1 : Math.floor(totalCount / pageSize) + ((totalCount % pageSize == 0) ? 0 : 1);
                            return [2 /*return*/, new pagination_1.PaginationResponse(page, page === 0 ? totalCount : pageSize, totalCount, totalPages, paginatedItems)];
                    }
                });
            });
        };
        this.convertToEntity = function (entity) {
            entity.recordStatus = record_status_1.RecordStatus.ACTIVE;
            entity.createdAt = date_utility_1["default"].getUTCNow();
            entity.updatedAt = date_utility_1["default"].getUTCNow();
            return entity;
        };
        this.firstOrDefault = function (query) { return __awaiter(_this, void 0, Promise, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this._model.findOne(query)];
                    case 1: return [2 /*return*/, (_b = (_a = (_c.sent())) === null || _a === void 0 ? void 0 : _a.toObject()) !== null && _b !== void 0 ? _b : null];
                }
            });
        }); };
        this.contains = function (query, joins) { return __awaiter(_this, void 0, Promise, function () {
            var actualQuery, key;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        actualQuery = {};
                        for (key in query) {
                            actualQuery[key] = { "$in": query[key] };
                        }
                        return [4 /*yield*/, this.getAsync(actualQuery, joins)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.or = function (queries, joins) { return __awaiter(_this, void 0, Promise, function () {
            var dbQuery, key;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dbQuery = this._model.find({ $or: queries });
                        if (joins) {
                            for (key in joins) {
                                if (joins[key]) {
                                    dbQuery = dbQuery.populate(key);
                                }
                            }
                        }
                        return [4 /*yield*/, dbQuery];
                    case 1: return [2 /*return*/, (_a.sent()).map(function (res) { return res.toObject(); })];
                }
            });
        }); };
        this.and = function (queries, joins) { return __awaiter(_this, void 0, Promise, function () {
            var dbQuery, key;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dbQuery = this._model.find({ $and: queries });
                        if (joins) {
                            for (key in joins) {
                                if (joins[key]) {
                                    dbQuery = dbQuery.populate(key);
                                }
                            }
                        }
                        return [4 /*yield*/, dbQuery];
                    case 1: return [2 /*return*/, (_a.sent()).map(function (res) { return res.toObject(); })];
                }
            });
        }); };
        this._model = model;
    }
    return BaseRepository;
}());
exports.BaseRepository = BaseRepository;
