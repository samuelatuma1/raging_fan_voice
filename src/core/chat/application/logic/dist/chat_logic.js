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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var chat_type_1 = require("../../../../core/chat/domain/enum/chat_type");
var mongoose_1 = require("mongoose");
var tsyringe_1 = require("tsyringe");
var chat_repository_1 = require("../contract/data_access/chat_repository");
var chat_1 = require("../../../../core/chat/domain/entity/chat");
var participant_1 = require("../../../../core/chat/domain/entity/participant");
var message_repository_1 = require("../contract/data_access/message_repository");
var initiate_chat_1 = require("../../../../core/chat/domain/dto/requests/initiate_chat");
var event_tracer_1 = require("../../../../core/shared/application/contract/observability/event_tracer");
var cache_service_1 = require("../../../../core/shared/application/contract/data_access/cache/cache_service");
var celebrity_logic_1 = require("../../../../core/raging_fan/application/contract/logic/celebrity_logic");
var not_found_exception_1 = require("../../../../core/shared/application/utils/exceptions/not_found_exception");
var auth_logic_1 = require("../../../../core/auth/application/contract/logic/auth_logic");
var ai_message_1 = require("../../../../core/ai/domain/model/ai_message");
var ai_message_enum_1 = require("../../../../core/ai/domain/enum/ai_message_enum");
var conversation_ai_service_1 = require("../../../../core/ai/application/contract/services/conversation_ai_service");
var message_1 = require("../../../../core/chat/domain/entity/message");
var message_status_1 = require("../../../../core/chat/domain/enum/message_status");
var message_type_1 = require("../../../../core/chat/domain/enum/message_type");
var date_utility_1 = require("../../../../core/shared/application/utils/utilities/date_utility");
var news_service_1 = require("../../../../core/raging_fan/application/contract/services/news_service");
var serialization_utility_1 = require("../../../../core/shared/application/utils/utilities/serialization_utility");
var ChatLogic = /** @class */ (function () {
    function ChatLogic(chatRepository, messageRepository, celebrityLogic, authLogic, conversationAI, newsService, eventTracer, cacheService) {
        var _this = this;
        this.chatRepository = chatRepository;
        this.messageRepository = messageRepository;
        this.celebrityLogic = celebrityLogic;
        this.authLogic = authLogic;
        this.conversationAI = conversationAI;
        this.newsService = newsService;
        this.eventTracer = eventTracer;
        this.cacheService = cacheService;
        this.CacheChatDurationInSeconds = 60 * 60;
        this.ChatCachePrefix = "CHAT_";
        this.ChatCacheInstructionPrefix = "CHAT_INSTRUCTION_";
        this.saveChatRecentHistoryInCache = function (chat) { return __awaiter(_this, void 0, Promise, function () {
            var ex_1, evtInstance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.cacheService.addAsync("" + this.ChatCachePrefix + chat._id, chat, this.CacheChatDurationInSeconds)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        ex_1 = _a.sent();
                        evtInstance = this.eventTracer.instance();
                        evtInstance.isExceptionWithMessage(ex_1.message);
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getChatRecentHistoryInCache = function (chatId) { return __awaiter(_this, void 0, Promise, function () {
            var chatResponse, ex_2, evtInstance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.cacheService.getAsync("" + this.ChatCachePrefix + chatId)];
                    case 1:
                        chatResponse = _a.sent();
                        return [2 /*return*/, chatResponse];
                    case 2:
                        ex_2 = _a.sent();
                        evtInstance = this.eventTracer.instance();
                        evtInstance.isExceptionWithMessage(ex_2.message);
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getChat = function (initiateChat) { return __awaiter(_this, void 0, Promise, function () {
            var evtTracer, chat, chatToSave;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        evtTracer = this.eventTracer.instance();
                        if (!initiateChat.chatId) return [3 /*break*/, 2];
                        evtTracer.say("Getting chat by id");
                        return [4 /*yield*/, this.chatRepository.getByIdAsync(new mongoose_1.Types.ObjectId(initiateChat.chatId))];
                    case 1:
                        chat = _b.sent();
                        _b.label = 2;
                    case 2:
                        if (!!chat) return [3 /*break*/, 4];
                        evtTracer.say("Getting chat by userId and celebrityId");
                        return [4 /*yield*/, this.chatRepository.getChat({ userId: initiateChat.userId, celebrityId: initiateChat.celebrityId })];
                    case 3:
                        chat = (_b.sent())[0];
                        _b.label = 4;
                    case 4:
                        if (!!chat) return [3 /*break*/, 6];
                        evtTracer.say("No chat found, creating chat");
                        chatToSave = new chat_1.Chat(new mongoose_1.Types.ObjectId());
                        chatToSave.chatType = (_a = initiateChat.chatType) !== null && _a !== void 0 ? _a : chat_type_1.ChatType.private;
                        chatToSave.participants = [new participant_1.Participant({ chatId: chatToSave._id, celebrityId: initiateChat.celebrityId }), new participant_1.Participant({ chatId: chatToSave._id, userId: initiateChat.userId })];
                        return [4 /*yield*/, this.chatRepository.addAsync(chatToSave)];
                    case 5:
                        chat = _b.sent();
                        _b.label = 6;
                    case 6:
                        evtTracer.isSuccess();
                        return [2 /*return*/, chat];
                }
            });
        }); };
        this.startChat = function (initiateChat) { return __awaiter(_this, void 0, Promise, function () {
            var evtTracer, chat, messages, user, chatResponse, ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        evtTracer = this.eventTracer.instance();
                        evtTracer.request = initiateChat;
                        evtTracer.say("Initiate Chat");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        evtTracer.say("Getting chat");
                        return [4 /*yield*/, this.getChat(initiateChat)
                            // send last 20 messages
                        ];
                    case 2:
                        chat = _a.sent();
                        // send last 20 messages
                        evtTracer.say("Getting most recent messages for chat");
                        return [4 /*yield*/, this.messageRepository.getPagedAsyncDecrement({ chatId: chat._id }, null, 20)
                            // getting user 
                        ];
                    case 3:
                        messages = _a.sent();
                        return [4 /*yield*/, this.authLogic.getUser(initiateChat.userId)];
                    case 4:
                        user = _a.sent();
                        chatResponse = chat;
                        chatResponse.messages = messages;
                        chatResponse.userName = user.name;
                        // add chat to redis cache for faster access
                        evtTracer.say("Caching recent chat for faster access");
                        this.saveChatRecentHistoryInCache(chatResponse);
                        evtTracer.isSuccessWithResponseAndMessage(chatResponse);
                        return [2 /*return*/, chatResponse];
                    case 5:
                        ex_3 = _a.sent();
                        evtTracer.isExceptionWithMessage(ex_3.message);
                        throw ex_3;
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.getChatForMessage = function (textMessageRequest) { return __awaiter(_this, void 0, void 0, function () {
            var evtTracer, chat;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        evtTracer = this.eventTracer.instance();
                        evtTracer.say("Getting chat");
                        return [4 /*yield*/, this.getChatRecentHistoryInCache(textMessageRequest.chatId)];
                    case 1:
                        chat = _a.sent();
                        if (!!chat) return [3 /*break*/, 3];
                        evtTracer.say("No chat found in cache, starting chat");
                        return [4 /*yield*/, this.startChat({ chatId: textMessageRequest.chatId, userId: textMessageRequest.senderId, celebrityId: null, chatType: chat_type_1.ChatType.private })];
                    case 2:
                        chat = _a.sent();
                        _a.label = 3;
                    case 3:
                        evtTracer.isSuccessWithResponseAndMessage(chat);
                        return [2 /*return*/, chat];
                }
            });
        }); };
        this.getChatForVoice = function (voiceChatRequest) { return __awaiter(_this, void 0, void 0, function () {
            var evtTracer, chat;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        evtTracer = this.eventTracer.instance();
                        evtTracer.say("Getting chat");
                        return [4 /*yield*/, this.getChatRecentHistoryInCache(voiceChatRequest.chatId)];
                    case 1:
                        chat = _a.sent();
                        if (!!chat) return [3 /*break*/, 3];
                        evtTracer.say("No chat found in cache, starting chat");
                        return [4 /*yield*/, this.startChat({ chatId: voiceChatRequest.chatId, userId: voiceChatRequest.senderId, celebrityId: null, chatType: chat_type_1.ChatType.private })];
                    case 2:
                        chat = _a.sent();
                        _a.label = 3;
                    case 3:
                        evtTracer.isSuccessWithResponseAndMessage(chat);
                        return [2 /*return*/, chat];
                }
            });
        }); };
        this.getLatestNewsForCelebrityMessage = function (celebrity) {
            return "News summary for " + celebrity.fullName;
        };
        this.buildInstructionQuery = function (textMessageRequest, celebrity, user) { return __awaiter(_this, void 0, Promise, function () {
            var isNewsQuery, _a, conversationTraining, instructionQuery, news;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        isNewsQuery = false;
                        if (textMessageRequest instanceof initiate_chat_1.VoiceChatRequest) {
                            textMessageRequest = __assign(__assign({}, textMessageRequest), { message: this.getLatestNewsForCelebrityMessage(celebrity) });
                            isNewsQuery = true;
                        }
                        if (!isNewsQuery) return [3 /*break*/, 1];
                        _a = isNewsQuery;
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, this.newsService.isNewsQuery(textMessageRequest.message)];
                    case 2:
                        _a = _b.sent();
                        _b.label = 3;
                    case 3:
                        isNewsQuery = _a;
                        conversationTraining = celebrity.training.conversationTemplate.map(function (conversation) {
                            var conversationDict = {};
                            conversationDict[user.name] = conversation.fanMessage;
                            conversationDict[celebrity.fullName] = conversation.celebrityReply;
                            return conversationDict;
                        });
                        instructionQuery = "You are " + celebrity.fullName + ", the popular footballer. You are known for being " + celebrity.training.personality + ". Fans look up to you for your skills and wisdom. In this conversation, you are engaging with " + user.name + ", a devoted fan. You should be conversational and avoid excessive formaility. Always respond in line with your personality. Please, never say you are an AI. Instead say you are " + celebrity.fullName + " if asked.\n        Typical conversation template [" + serialization_utility_1["default"].serializeJson(conversationTraining) + "].\n        ";
                        if (!isNewsQuery) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.newsService.getNewsUpdateForMessage(textMessageRequest.message, celebrity.fullName)];
                    case 4:
                        news = _b.sent();
                        instructionQuery += celebrity.fullName + "'s Recent news: " + news;
                        _b.label = 5;
                    case 5: return [2 /*return*/, instructionQuery];
                }
            });
        }); };
        this.getCelebrityAndUserFromChatResponse = function (chat) { return __awaiter(_this, void 0, void 0, function () {
            var chatCelebrityParticipant, celebrityId, celebrity, chatUserParticipant, userId, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        chatCelebrityParticipant = chat.participants.find(function (participant) { return participant.celebrityId; });
                        celebrityId = new mongoose_1.Types.ObjectId(chatCelebrityParticipant.celebrityId);
                        return [4 /*yield*/, this.celebrityLogic.getCelebrity(celebrityId, { useCache: true })];
                    case 1:
                        celebrity = _a.sent();
                        if (!celebrity) {
                            throw new not_found_exception_1["default"]("Celebrity Participant not found");
                        }
                        chatUserParticipant = chat.participants.find(function (participant) { return participant.userId; });
                        userId = new mongoose_1.Types.ObjectId(chatUserParticipant.userId);
                        return [4 /*yield*/, this.authLogic.getUser(userId, { useCache: true })];
                    case 2:
                        user = _a.sent();
                        return [2 /*return*/, { celebrity: celebrity, user: user }];
                }
            });
        }); };
        this.respondToTextMessage = function (textMessageRequest) { return __awaiter(_this, void 0, Promise, function () {
            var evtTracer, chat, _a, celebrity_1, user, instructionQuery, messagesMemoryWindow, messagesThread, conversationResponse, userMessage, celebrityResponse, ex_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        // Get celebrity training instruction to work with
                        textMessageRequest.sentAt = date_utility_1["default"].getUTCNow();
                        evtTracer = this.eventTracer.instance();
                        evtTracer.request = textMessageRequest;
                        evtTracer.say("Text Message Chat");
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 6, , 7]);
                        evtTracer.say("Getting chat");
                        return [4 /*yield*/, this.getChatForMessage(textMessageRequest)];
                    case 2:
                        chat = _b.sent();
                        evtTracer.say("Getting participants");
                        return [4 /*yield*/, this.getCelebrityAndUserFromChatResponse(chat)];
                    case 3:
                        _a = _b.sent(), celebrity_1 = _a.celebrity, user = _a.user;
                        return [4 /*yield*/, this.buildInstructionQuery(textMessageRequest, celebrity_1, user)];
                    case 4:
                        instructionQuery = _b.sent();
                        evtTracer.say("Gotten celebrity: " + celebrity_1.fullName + ".\nBuilt instruction query: " + instructionQuery);
                        messagesMemoryWindow = chat.messages.slice(0, 6);
                        messagesThread = __spreadArrays(messagesMemoryWindow).reverse().map(function (message) {
                            var role = message.senderId.toString() === celebrity_1._id.toString() ? ai_message_enum_1.AIMessageUnitRole.system : ai_message_enum_1.AIMessageUnitRole.user;
                            return new ai_message_1.AIMessageUnit({
                                role: role,
                                content: message.messageText
                            });
                        });
                        evtTracer.say("Added previous messages for context. Size " + messagesMemoryWindow.length);
                        // call ai to get response
                        evtTracer.say("Calling conversationAI");
                        return [4 /*yield*/, this.conversationAI.message(instructionQuery, messagesThread, textMessageRequest.message)];
                    case 5:
                        conversationResponse = _b.sent();
                        evtTracer.say("Updating cache and saving messages");
                        userMessage = new message_1.Message({
                            chatId: chat._id,
                            status: message_status_1.MessageStatus.read,
                            messageText: textMessageRequest.message,
                            senderId: user._id,
                            messageType: message_type_1.MessageType.text,
                            sentAt: textMessageRequest.sentAt
                        });
                        celebrityResponse = new message_1.Message({
                            chatId: chat._id,
                            status: message_status_1.MessageStatus.sent,
                            messageText: conversationResponse.message.content,
                            senderId: celebrity_1._id,
                            messageType: message_type_1.MessageType.text,
                            isAIGenerated: true,
                            sentAt: textMessageRequest.sentAt
                        });
                        this.updateChatCacheAndDb(chat, celebrityResponse, userMessage); // no need to await this update
                        // return response
                        evtTracer.isSuccessWithResponseAndMessage(celebrityResponse);
                        return [2 /*return*/, celebrityResponse];
                    case 6:
                        ex_4 = _b.sent();
                        evtTracer.isExceptionWithMessage(ex_4.message);
                        throw ex_4;
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        this.updateChatCacheAndDb = function (chat, celebrityResponse, userMessage) { return __awaiter(_this, void 0, void 0, function () {
            var addedMessages, cached;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.messageRepository.addManyAsync([userMessage, celebrityResponse])]; // no need to await
                    case 1:
                        addedMessages = _a.sent() // no need to await
                        ;
                        chat.messages.unshift(userMessage);
                        chat.messages.unshift(celebrityResponse);
                        return [4 /*yield*/, this.saveChatRecentHistoryInCache(chat)];
                    case 2:
                        cached = _a.sent();
                        console.log({ cached: cached, addedMessages: addedMessages });
                        return [2 /*return*/];
                }
            });
        }); };
        this.getVoiceCallInstructionForChat = function (chat) { return __awaiter(_this, void 0, Promise, function () {
            var cacheChatInstructionId, cachedInstruction, voiceChat, _a, celebrity, user, instruction;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        cacheChatInstructionId = "" + this.ChatCacheInstructionPrefix + chat.chatId;
                        return [4 /*yield*/, this.cacheService.getAsync(cacheChatInstructionId)];
                    case 1:
                        cachedInstruction = _b.sent();
                        if (cachedInstruction) {
                            console.log("Cached Instruction in use for " + chat.chatId);
                            return [2 /*return*/, cachedInstruction];
                        }
                        return [4 /*yield*/, this.getChatForVoice(chat)];
                    case 2:
                        voiceChat = _b.sent();
                        return [4 /*yield*/, this.getCelebrityAndUserFromChatResponse(voiceChat)];
                    case 3:
                        _a = _b.sent(), celebrity = _a.celebrity, user = _a.user;
                        instruction = this.buildInstructionQuery(chat, celebrity, user);
                        this.cacheService.addAsync(cacheChatInstructionId, instruction, 60 * 10);
                        return [2 /*return*/, instruction];
                }
            });
        }); };
    }
    ChatLogic = __decorate([
        tsyringe_1.injectable(),
        __param(0, tsyringe_1.inject(chat_repository_1.IIChatRepository)),
        __param(1, tsyringe_1.inject(message_repository_1.IIMessageRepository)),
        __param(2, tsyringe_1.inject(celebrity_logic_1.IICelebrityLogic)),
        __param(3, tsyringe_1.inject(auth_logic_1.IIAuthLogic)),
        __param(4, tsyringe_1.inject(conversation_ai_service_1.IIConversationAI)),
        __param(5, tsyringe_1.inject(news_service_1.IINewsService)),
        __param(6, tsyringe_1.inject(event_tracer_1.IIEventTracer)),
        __param(7, tsyringe_1.inject(cache_service_1.IICacheService))
    ], ChatLogic);
    return ChatLogic;
}());
exports["default"] = ChatLogic;
