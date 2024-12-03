import { inject, injectable } from "tsyringe";
import BaseController from "./base_controller";
import { NextFunction, Request, Response } from "express";
import { ICelebrityLogic, IICelebrityLogic } from "../../core/raging_fan/application/contract/logic/celebrity_logic";
import CreateCelebrityTraining, { CreateCelebrityRequest, QueryCelebrity } from "../../core/raging_fan/domain/dto/requests/celebrity";
import SerializationUtility from "../../core/shared/application/utils/utilities/serialization_utility";
import { IINewsAIService, INewsAIService } from "../../core/ai/application/contract/services/news_ai_service";
import { IChatLogic, IIChatLogic } from "../../core/chat/application/contract/logic/chat_logic";
import { InitiateChat, TextMessageChatRequest } from "../../core/chat/domain/dto/requests/initiate_chat";

@injectable()
export default class CelebrityController extends BaseController {

    public constructor(
        @inject(IICelebrityLogic) private readonly celebrityLogic: ICelebrityLogic,
        @inject(IINewsAIService) private readonly newsAIService: INewsAIService,
        @inject(IIChatLogic) private readonly chatLogic: IChatLogic
    ){
        super();

    }

    public createCelebrity = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const imgUpload = this.convertReqFilesToUploadFiles(req, 'image')[0] ?? null
            const avatar = this.convertReqFilesToUploadFiles(req, 'avatar')[0] ?? null
            const icons = this.convertReqFilesToUploadFiles(req, 'icons') ?? []
            let reqBody: CreateCelebrityRequest = SerializationUtility.deserializeJson<CreateCelebrityRequest>(req.body.data);
            reqBody.profilePicture = imgUpload;
            reqBody.avatar = avatar;
            reqBody.icons = icons;

            let response = await this.celebrityLogic.createCelebrity(reqBody);
            console.log({response})
            res.json(response)
        } catch(ex){
            next(ex);
        }
    }

    public trainCelebrity = async (req: Request<{}, {}, CreateCelebrityTraining>, res: Response, next: NextFunction) => {
        try{
            let response = await this.celebrityLogic.trainCelebrity(req.body);
            res.json(response)
        } catch(ex){
            next(ex);
        }
    }

    public getCelebrities = async (req: Request<{}, {}, {}, QueryCelebrity>, res: Response, next: NextFunction) => {
        try{
            let response = await this.celebrityLogic.getCelebrities(req.query)
            console.log({response})
            res.json(response);
        } catch(ex){

        }
    }

    public testAINews = async (req: Request<{}, {}, {message: string}>, res: Response, next: NextFunction) => {
        try{
            
            let news = await this.newsAIService.getNewsSummaryForMessage(req.body.message, 'Lionel Messi')
            res.json({news})
        } catch(ex){

        }
    }

    public initiateChat = async (req: Request<{}, {}, InitiateChat>, res: Response, next: NextFunction) => {
        try{
            
            let chatResponse = await this.chatLogic.startChat(req.body);

            res.json(chatResponse);
        } catch(ex){

        }
    }

    public chat = async (req: Request<{}, {}, TextMessageChatRequest>, res: Response, next: NextFunction) => {
        try{
            
            let chatResponse = await this.chatLogic.respondToTextMessage(req.body);
            res.json(chatResponse);
        } catch(ex){

        }
    }
}