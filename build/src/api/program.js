"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.iocContainer = void 0;
const redis_config_1 = require("../core/shared/application/utils/config/redis_config");
const cloudinary_config_1 = require("../core/shared/application/utils/config/cloudinary_config");
const dotenv_1 = __importDefault(require("dotenv"));
const tsyringe_1 = require("tsyringe");
Object.defineProperty(exports, "iocContainer", { enumerable: true, get: function () { return tsyringe_1.container; } });
const email_config_1 = require("../core/shared/application/utils/config/email_config");
const logger_1 = require("../core/shared/application/contract/observability/logger");
const observability_1 = __importDefault(require("../core/shared/infrastructure/observability/observability"));
const event_tracer_1 = require("../core/shared/application/contract/observability/event_tracer");
const event_tracer_2 = __importDefault(require("../core/shared/infrastructure/observability/event_tracer"));
const file_service_1 = require("../core/shared/application/contract/services/files/file_service");
const file_service_2 = __importDefault(require("../core/shared/infrastructure/services/files/file_service"));
const cache_service_1 = require("../core/shared/application/contract/data_access/cache/cache_service");
const redis_cache_service_1 = require("../core/shared/infrastructure/persistence/data_access/cache/redis_cache_service");
const celebrity_repository_1 = require("../core/raging_fan/application/contract/persistence/celebrity_repository");
const celebrity_logic_1 = __importDefault(require("../core/raging_fan/application/logic/celebrity_logic"));
const celebrity_logic_2 = require("../core/raging_fan/application/contract/logic/celebrity_logic");
const celebrity_repository_2 = __importDefault(require("../core/raging_fan/infrastructure/persistence/data_access/celebrity_repository"));
const celebrity_training_repository_1 = require("../core/raging_fan/application/contract/persistence/celebrity_training_repository");
const celebrity_training_repository_2 = __importDefault(require("../core/raging_fan/infrastructure/persistence/data_access/celebrity_training_repository"));
const news_ai_service_1 = require("../core/ai/application/contract/services/news_ai_service");
const news_ai_service_2 = __importDefault(require("../core/ai/infrastructure/ai_service/news_ai_service"));
const perplexity_config_1 = require("../core/ai/infrastructure/config/perplexity_config");
const api_service_1 = require("../core/shared/application/contract/services/api/api_service");
const api_service_2 = require("../core/shared/infrastructure/services/api/api_service");
const permission_repository_1 = require("../core/auth/application/contract/persistence/permission_repository");
const user_permission_repository_1 = __importDefault(require("../core/auth/infrastructure/persistence/data_access/user_permission_repository"));
const role_repository_1 = require("../core/auth/application/contract/persistence/role_repository");
const user_role_repository_1 = __importDefault(require("../core/auth/infrastructure/persistence/data_access/user_role_repository"));
const auth_logic_1 = require("../core/auth/application/contract/logic/auth_logic");
const auth_logic_2 = __importDefault(require("../core/auth/application/logic/auth_logic"));
const user_repository_1 = __importDefault(require("../core/auth/infrastructure/persistence/data_access/user_repository"));
const user_repository_2 = require("../core/auth/application/contract/persistence/user_repository");
const jwt_service_1 = require("../core/auth/application/contract/service/jwt_service");
const jwt_service_2 = __importDefault(require("../core/auth/infrastructure/auth_service/jwt_service"));
const chat_repository_1 = require("../core/chat/application/contract/data_access/chat_repository");
const chat_repository_2 = __importDefault(require("../core/chat/infrastructure/persistence/data_access/chat_repository"));
const message_repository_1 = require("../core/chat/application/contract/data_access/message_repository");
const message_repository_2 = __importDefault(require("../core/chat/infrastructure/persistence/data_access/message_repository"));
const chat_logic_1 = require("../core/chat/application/contract/logic/chat_logic");
const chat_logic_2 = __importDefault(require("../core/chat/application/logic/chat_logic"));
const conversation_ai_service_1 = require("../core/ai/application/contract/services/conversation_ai_service");
const conversation_ai_1 = __importDefault(require("../core/ai/infrastructure/ai_service/conversation_ai"));
const chatgpt_config_1 = require("../core/ai/infrastructure/config/chatgpt_config");
const news_service_1 = __importDefault(require("../core/raging_fan/application/service/news_service"));
const news_service_2 = require("../core/raging_fan/application/contract/services/news_service");
const mail_config_1 = require("../core/chat/infrastructure/services/config/mail_config");
const mail_service_1 = require("../core/chat/application/contract/service/mail_service");
const email_service_1 = require("../core/chat/infrastructure/services/email_service");
const base_handler_1 = require("./web_socket_event_handlers/base_handler");
dotenv_1.default.config();
let env = process.env;
var cloudinaryConfig = {
    CLOUD_NAME: env.CLOUD_NAME,
    API_KEY: env.API_KEY,
    API_SECRET: env.API_SECRET
};
var redisConfig = {
    REDIS_URL: env.REDIS_URL ?? ''
};
var emailJSConfig = {
    service_id: env.email_js_service_id,
    template_id: env.email_js_template_id,
    user_id: env.email_js_user_id,
    access_token: env.email_js_access_token,
    url: env.email_js_url
};
var emailConfig = {
    email_address: env.email_username,
    email_password: env.email_password,
    service: env.email_service
};
var perplexityConfig = {
    key: env.perplexity_key
};
var chatGPTConfig = {
    key: env.open_ai_key
};
var redisConfig = {
    REDIS_URL: env.REDIS_URL ?? ''
};
tsyringe_1.container.register(logger_1.IILogger, {
    useClass: observability_1.default
});
tsyringe_1.container.register(event_tracer_1.IIEventTracer, {
    useClass: event_tracer_2.default
});
tsyringe_1.container.register(cloudinary_config_1.IICloudinaryConfig, {
    useValue: cloudinaryConfig
});
tsyringe_1.container.register(redis_config_1.IIRedisConfig, {
    useValue: redisConfig
});
tsyringe_1.container.register(email_config_1.IIEmailJSConfig, {
    useValue: emailJSConfig
});
tsyringe_1.container.register(perplexity_config_1.IIPerplexityConfig, {
    useValue: perplexityConfig
});
tsyringe_1.container.register(mail_config_1.IIEmailConfig, {
    useValue: emailConfig
});
tsyringe_1.container.register(file_service_1.IIFileService, {
    useClass: file_service_2.default
});
tsyringe_1.container.register(cache_service_1.IICacheService, {
    useClass: redis_cache_service_1.RedisCache
});
tsyringe_1.container.register(celebrity_repository_1.IICelebrityRepository, {
    useClass: celebrity_repository_2.default
});
tsyringe_1.container.register(celebrity_logic_2.IICelebrityLogic, {
    useClass: celebrity_logic_1.default
});
tsyringe_1.container.register(celebrity_training_repository_1.IICelebrityTrainingRepository, {
    useClass: celebrity_training_repository_2.default
});
tsyringe_1.container.register(news_ai_service_1.IINewsAIService, {
    useClass: news_ai_service_2.default
});
tsyringe_1.container.register(api_service_1.IIApiService, {
    useClass: api_service_2.ApiService
});
tsyringe_1.container.register(permission_repository_1.IIUserPermissionRepository, {
    useClass: user_permission_repository_1.default
});
tsyringe_1.container.register(role_repository_1.IIUserRoleRepository, {
    useClass: user_role_repository_1.default
});
tsyringe_1.container.register(auth_logic_1.IIAuthLogic, {
    useClass: auth_logic_2.default
});
tsyringe_1.container.register(user_repository_2.IIUserRepository, {
    useClass: user_repository_1.default
});
tsyringe_1.container.register(jwt_service_1.IIJwtService, {
    useClass: jwt_service_2.default
});
tsyringe_1.container.register(chat_repository_1.IIChatRepository, {
    useClass: chat_repository_2.default
});
tsyringe_1.container.register(message_repository_1.IIMessageRepository, {
    useClass: message_repository_2.default
});
tsyringe_1.container.register(chat_logic_1.IIChatLogic, {
    useClass: chat_logic_2.default
});
tsyringe_1.container.register(conversation_ai_service_1.IIConversationAI, {
    useClass: conversation_ai_1.default
});
tsyringe_1.container.register(chatgpt_config_1.IIChatGPTConfig, {
    useValue: chatGPTConfig
});
tsyringe_1.container.register(news_service_2.IINewsService, {
    useClass: news_service_1.default
});
tsyringe_1.container.register(mail_service_1.IIMailService, {
    useClass: email_service_1.MailService
});
tsyringe_1.container.register(base_handler_1.IIAIWebSocket, {
    useClass: base_handler_1.OpenAIWebSocket
});
//# sourceMappingURL=program.js.map