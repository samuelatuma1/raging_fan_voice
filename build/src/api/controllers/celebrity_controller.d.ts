import BaseController from "./base_controller";
import { NextFunction, Request, Response } from "express";
import { ICelebrityLogic } from "../../core/raging_fan/application/contract/logic/celebrity_logic";
import CreateCelebrityTraining, { QueryCelebrity } from "../../core/raging_fan/domain/dto/requests/celebrity";
import { INewsAIService } from "../../core/ai/application/contract/services/news_ai_service";
import { IChatLogic } from "../../core/chat/application/contract/logic/chat_logic";
import { InitiateChat, TextMessageChatRequest } from "../../core/chat/domain/dto/requests/initiate_chat";
export default class CelebrityController extends BaseController {
    private readonly celebrityLogic;
    private readonly newsAIService;
    private readonly chatLogic;
    constructor(celebrityLogic: ICelebrityLogic, newsAIService: INewsAIService, chatLogic: IChatLogic);
    createCelebrity: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    trainCelebrity: (req: Request<{}, {}, CreateCelebrityTraining>, res: Response, next: NextFunction) => Promise<void>;
    getCelebrities: (req: Request<{}, {}, {}, QueryCelebrity>, res: Response, next: NextFunction) => Promise<void>;
    testAINews: (req: Request<{}, {}, {
        message: string;
    }>, res: Response, next: NextFunction) => Promise<void>;
    initiateChat: (req: Request<{}, {}, InitiateChat>, res: Response, next: NextFunction) => Promise<void>;
    chat: (req: Request<{}, {}, TextMessageChatRequest>, res: Response, next: NextFunction) => Promise<void>;
}
