"use strict";
var _a, _b;
exports.__esModule = true;
exports.iocContainer = void 0;
var redis_config_1 = require("../core/shared/application/utils/config/redis_config");
var cloudinary_config_1 = require("../core/shared/application/utils/config/cloudinary_config");
var dotenv_1 = require("dotenv");
var tsyringe_1 = require("tsyringe");
exports.iocContainer = tsyringe_1.container;
var email_config_1 = require("../core/shared/application/utils/config/email_config");
var logger_1 = require("../core/shared/application/contract/observability/logger");
var observability_1 = require("../core/shared/infrastructure/observability/observability");
var event_tracer_1 = require("../core/shared/application/contract/observability/event_tracer");
var event_tracer_2 = require("../core/shared/infrastructure/observability/event_tracer");
var file_service_1 = require("../core/shared/application/contract/services/files/file_service");
var file_service_2 = require("../core/shared/infrastructure/services/files/file_service");
var cache_service_1 = require("../core/shared/application/contract/data_access/cache/cache_service");
var redis_cache_service_1 = require("../core/shared/infrastructure/persistence/data_access/cache/redis_cache_service");
var celebrity_repository_1 = require("../core/raging_fan/application/contract/persistence/celebrity_repository");
var celebrity_logic_1 = require("../core/raging_fan/application/logic/celebrity_logic");
var celebrity_logic_2 = require("../core/raging_fan/application/contract/logic/celebrity_logic");
var celebrity_repository_2 = require("../core/raging_fan/infrastructure/persistence/data_access/celebrity_repository");
var celebrity_training_repository_1 = require("../core/raging_fan/application/contract/persistence/celebrity_training_repository");
var celebrity_training_repository_2 = require("../core/raging_fan/infrastructure/persistence/data_access/celebrity_training_repository");
var news_ai_service_1 = require("../core/ai/application/contract/services/news_ai_service");
var news_ai_service_2 = require("../core/ai/infrastructure/ai_service/news_ai_service");
var perplexity_config_1 = require("../core/ai/infrastructure/config/perplexity_config");
var api_service_1 = require("../core/shared/application/contract/services/api/api_service");
var api_service_2 = require("../core/shared/infrastructure/services/api/api_service");
var permission_repository_1 = require("../core/auth/application/contract/persistence/permission_repository");
var user_permission_repository_1 = require("../core/auth/infrastructure/persistence/data_access/user_permission_repository");
var role_repository_1 = require("../core/auth/application/contract/persistence/role_repository");
var user_role_repository_1 = require("../core/auth/infrastructure/persistence/data_access/user_role_repository");
var auth_logic_1 = require("../core/auth/application/contract/logic/auth_logic");
var auth_logic_2 = require("../core/auth/application/logic/auth_logic");
var user_repository_1 = require("../core/auth/infrastructure/persistence/data_access/user_repository");
var user_repository_2 = require("../core/auth/application/contract/persistence/user_repository");
var jwt_service_1 = require("../core/auth/application/contract/service/jwt_service");
var jwt_service_2 = require("../core/auth/infrastructure/auth_service/jwt_service");
var chat_repository_1 = require("../core/chat/application/contract/data_access/chat_repository");
var chat_repository_2 = require("../core/chat/infrastructure/persistence/data_access/chat_repository");
var message_repository_1 = require("../core/chat/application/contract/data_access/message_repository");
var message_repository_2 = require("../core/chat/infrastructure/persistence/data_access/message_repository");
var chat_logic_1 = require("../core/chat/application/contract/logic/chat_logic");
var chat_logic_2 = require("../core/chat/application/logic/chat_logic");
var conversation_ai_service_1 = require("../core/ai/application/contract/services/conversation_ai_service");
var conversation_ai_1 = require("../core/ai/infrastructure/ai_service/conversation_ai");
var chatgpt_config_1 = require("../core/ai/infrastructure/config/chatgpt_config");
var news_service_1 = require("../core/raging_fan/application/service/news_service");
var news_service_2 = require("../core/raging_fan/application/contract/services/news_service");
var mail_config_1 = require("../core/chat/infrastructure/services/config/mail_config");
var mail_service_1 = require("../core/chat/application/contract/service/mail_service");
var email_service_1 = require("../core/chat/infrastructure/services/email_service");
var base_handler_1 = require("./web_socket_event_handlers/base_handler");
dotenv_1["default"].config();
var env = process.env;
var cloudinaryConfig = {
    CLOUD_NAME: env.CLOUD_NAME,
    API_KEY: env.API_KEY,
    API_SECRET: env.API_SECRET
};
var redisConfig = {
    REDIS_URL: (_a = env.REDIS_URL) !== null && _a !== void 0 ? _a : ''
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
    REDIS_URL: (_b = env.REDIS_URL) !== null && _b !== void 0 ? _b : ''
};
tsyringe_1.container.register(logger_1.IILogger, {
    useClass: observability_1["default"]
});
tsyringe_1.container.register(event_tracer_1.IIEventTracer, {
    useClass: event_tracer_2["default"]
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
    useClass: file_service_2["default"]
});
tsyringe_1.container.register(cache_service_1.IICacheService, {
    useClass: redis_cache_service_1.RedisCache
});
tsyringe_1.container.register(celebrity_repository_1.IICelebrityRepository, {
    useClass: celebrity_repository_2["default"]
});
tsyringe_1.container.register(celebrity_logic_2.IICelebrityLogic, {
    useClass: celebrity_logic_1["default"]
});
tsyringe_1.container.register(celebrity_training_repository_1.IICelebrityTrainingRepository, {
    useClass: celebrity_training_repository_2["default"]
});
tsyringe_1.container.register(news_ai_service_1.IINewsAIService, {
    useClass: news_ai_service_2["default"]
});
tsyringe_1.container.register(api_service_1.IIApiService, {
    useClass: api_service_2.ApiService
});
tsyringe_1.container.register(permission_repository_1.IIUserPermissionRepository, {
    useClass: user_permission_repository_1["default"]
});
tsyringe_1.container.register(role_repository_1.IIUserRoleRepository, {
    useClass: user_role_repository_1["default"]
});
tsyringe_1.container.register(auth_logic_1.IIAuthLogic, {
    useClass: auth_logic_2["default"]
});
tsyringe_1.container.register(user_repository_2.IIUserRepository, {
    useClass: user_repository_1["default"]
});
tsyringe_1.container.register(jwt_service_1.IIJwtService, {
    useClass: jwt_service_2["default"]
});
tsyringe_1.container.register(chat_repository_1.IIChatRepository, {
    useClass: chat_repository_2["default"]
});
tsyringe_1.container.register(message_repository_1.IIMessageRepository, {
    useClass: message_repository_2["default"]
});
tsyringe_1.container.register(chat_logic_1.IIChatLogic, {
    useClass: chat_logic_2["default"]
});
tsyringe_1.container.register(conversation_ai_service_1.IIConversationAI, {
    useClass: conversation_ai_1["default"]
});
tsyringe_1.container.register(chatgpt_config_1.IIChatGPTConfig, {
    useValue: chatGPTConfig
});
tsyringe_1.container.register(news_service_2.IINewsService, {
    useClass: news_service_1["default"]
});
tsyringe_1.container.register(mail_service_1.IIMailService, {
    useClass: email_service_1.MailService
});
tsyringe_1.container.register(base_handler_1.IIAIWebSocket, {
    useClass: base_handler_1.OpenAIWebSocket
});
