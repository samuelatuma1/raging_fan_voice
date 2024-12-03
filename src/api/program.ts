import IRedisConfig, { IIRedisConfig } from '../core/shared/application/utils/config/redis_config';
import ICloudinaryConfig, { IICloudinaryConfig } from '../core/shared/application/utils/config/cloudinary_config';
import dotenv from 'dotenv'
import {container} from "tsyringe";
import { IEmailJSConfig, IIEmailJSConfig } from '../core/shared/application/utils/config/email_config';
import { IILogger } from '../core/shared/application/contract/observability/logger';
import Logger from '../core/shared/infrastructure/observability/observability';
import { IIEventTracer } from '../core/shared/application/contract/observability/event_tracer';
import EventTracer from '../core/shared/infrastructure/observability/event_tracer';
import { IIFileService } from '../core/shared/application/contract/services/files/file_service';
import CloudinaryService from '../core/shared/infrastructure/services/files/file_service';
import { IICacheService } from '../core/shared/application/contract/data_access/cache/cache_service';
import { RedisCache } from '../core/shared/infrastructure/persistence/data_access/cache/redis_cache_service';
import { IICelebrityRepository } from '../core/raging_fan/application/contract/persistence/celebrity_repository';
import CelebrityLogic from '../core/raging_fan/application/logic/celebrity_logic';
import { IICelebrityLogic } from '../core/raging_fan/application/contract/logic/celebrity_logic';
import CelebrityRepository from '../core/raging_fan/infrastructure/persistence/data_access/celebrity_repository';
import { IICelebrityTrainingRepository } from '../core/raging_fan/application/contract/persistence/celebrity_training_repository';
import CelebrityTrainingRepository from '../core/raging_fan/infrastructure/persistence/data_access/celebrity_training_repository';
import { IINewsAIService } from '../core/ai/application/contract/services/news_ai_service';
import NewsAIService from '../core/ai/infrastructure/ai_service/news_ai_service';
import { IIPerplexityConfig, IPerplexityConfig } from '../core/ai/infrastructure/config/perplexity_config';
import { IIApiService } from '../core/shared/application/contract/services/api/api_service';
import { ApiService } from '../core/shared/infrastructure/services/api/api_service';
import { IIUserPermissionRepository } from '../core/auth/application/contract/persistence/permission_repository';
import UserPermissionRepository from '../core/auth/infrastructure/persistence/data_access/user_permission_repository';
import { IIUserRoleRepository } from '../core/auth/application/contract/persistence/role_repository';
import UserRoleRepository from '../core/auth/infrastructure/persistence/data_access/user_role_repository';
import { IIAuthLogic } from '../core/auth/application/contract/logic/auth_logic';
import AuthLogic from '../core/auth/application/logic/auth_logic';
import UserRepository from '../core/auth/infrastructure/persistence/data_access/user_repository';
import { IIUserRepository } from '../core/auth/application/contract/persistence/user_repository';
import { IIJwtService } from '../core/auth/application/contract/service/jwt_service';
import JwtService from '../core/auth/infrastructure/auth_service/jwt_service';
import { IIChatRepository } from '../core/chat/application/contract/data_access/chat_repository';
import ChatRepository from '../core/chat/infrastructure/persistence/data_access/chat_repository';
import { IIMessageRepository } from '../core/chat/application/contract/data_access/message_repository';
import MessageRepository from '../core/chat/infrastructure/persistence/data_access/message_repository';
import { IIChatLogic } from '../core/chat/application/contract/logic/chat_logic';
import ChatLogic from '../core/chat/application/logic/chat_logic';
import { IIConversationAI } from '../core/ai/application/contract/services/conversation_ai_service';
import ChatGPTConversationAI from '../core/ai/infrastructure/ai_service/conversation_ai';
import { IChatGPTConfig, IIChatGPTConfig } from '../core/ai/infrastructure/config/chatgpt_config';
import NewsService from '../core/raging_fan/application/service/news_service';
import { IINewsService } from '../core/raging_fan/application/contract/services/news_service';
import { IEmailConfig, IIEmailConfig } from '../core/chat/infrastructure/services/config/mail_config';
import { IIMailService } from '../core/chat/application/contract/service/mail_service';
import { MailService } from '../core/chat/infrastructure/services/email_service';
import { OpenAIWebSocket, IAIWebSocket, IIAIWebSocket } from './web_socket_event_handlers/base_handler';


dotenv.config();

let env = process.env;


var cloudinaryConfig : ICloudinaryConfig = {
  CLOUD_NAME: env.CLOUD_NAME,
  API_KEY: env.API_KEY,
  API_SECRET: env.API_SECRET
}

var redisConfig : IRedisConfig = {
  REDIS_URL: env.REDIS_URL ?? ''
}

var emailJSConfig : IEmailJSConfig = {
  service_id: env.email_js_service_id,
  template_id: env.email_js_template_id,
  user_id: env.email_js_user_id,
  access_token: env.email_js_access_token,
  url: env.email_js_url
}

var emailConfig: IEmailConfig = {
  email_address: env.email_username,
  email_password: env.email_password,
  service: env.email_service
}

var  perplexityConfig : IPerplexityConfig = {
  key: env.perplexity_key
}

var  chatGPTConfig : IChatGPTConfig = {
  key: env.open_ai_key
}

var redisConfig : IRedisConfig = {
    REDIS_URL: env.REDIS_URL ?? ''
}


container.register(IILogger, {
    useClass: Logger
})
container.register(IIEventTracer, {
    useClass: EventTracer
})

container.register(IICloudinaryConfig, {
  useValue: cloudinaryConfig
})

container.register(IIRedisConfig, {
  useValue: redisConfig
})

container.register(IIEmailJSConfig, {
  useValue: emailJSConfig
})

container.register(IIPerplexityConfig, {
  useValue: perplexityConfig
})

container.register(IIEmailConfig, {
  useValue: emailConfig
})
container.register(IIFileService, {
  useClass: CloudinaryService
})

container.register(IICacheService, {
    useClass: RedisCache
})

container.register(IICelebrityRepository, {
  useClass: CelebrityRepository
})

container.register(IICelebrityLogic, {
  useClass: CelebrityLogic
})

container.register(IICelebrityTrainingRepository, {
  useClass: CelebrityTrainingRepository
})

container.register(IINewsAIService, {
  useClass: NewsAIService
})

container.register(IIApiService, {
  useClass: ApiService
})

container.register(IIUserPermissionRepository, {
  useClass: UserPermissionRepository
})

container.register(IIUserRoleRepository, {
  useClass: UserRoleRepository
})

container.register(IIAuthLogic, {
  useClass: AuthLogic
})

container.register(IIUserRepository, {
  useClass: UserRepository
})

container.register(IIJwtService, {
  useClass: JwtService
})

container.register(IIChatRepository, {
  useClass: ChatRepository
})

container.register(IIMessageRepository, {
  useClass: MessageRepository
})

container.register(IIChatLogic, {
  useClass: ChatLogic
})

container.register(IIConversationAI, {
  useClass: ChatGPTConversationAI
})

container.register(IIChatGPTConfig, {
  useValue: chatGPTConfig
})

container.register(IINewsService, {
  useClass: NewsService
})

container.register(IIMailService, {
  useClass: MailService
})

container.register(IIAIWebSocket, {
  useClass: OpenAIWebSocket
})
export {container as iocContainer}