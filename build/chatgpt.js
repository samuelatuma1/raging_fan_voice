"use strict";
// import { ApiRequestContentType, ApiRequestMethod } from "core/shared/domain/model/api_service/enum/api_request";
Object.defineProperty(exports, "__esModule", { value: true });
// @injectable()
// export default class AIChat implements IAIChat{
//     public constructor(
//         @inject(IIApiService) private readonly apiService: IApiService,
//         @inject(IIChatGPTConfig) private readonly chatgptConfig: IChatGPTConfig,
//         @inject(IIGeminiConfig) private readonly geminiConfig: IGeminiConfig
//     ){
//     }
//     prompt = async (query: string): Promise<string> => {
//         try{
//             let response: ChatCompletion = await this.apiService.apiRequest<ChatGPTCreatePrompt, ChatCompletion>(new ApiRequest({
//                 url: "https://api.openai.com/v1/chat/completions",
//                 method: ApiRequestMethod.POST,
//                 headers: {
//                     contentType: ApiRequestContentType.JSON,
//                     authorization: `Bearer ${this.chatgptConfig.secret_key}`,
//                     responseType: ApiRequestContentType.JSON
//                 },
//                 body: {
//                     model: "gpt-3.5-turbo",
//                     messages: [{role: "user", content: query}],
//                     "temperature": 0.7
//                   }
//             }))
//             return response.choices?.[0]?.message?.content
//         } catch(ex){
//             console.log({ex})
//             return "";
//         }
//     }
//     public aiPrompt = async (query: string): Promise<{response: string, model: string} | null> => {
//         let response: string = await this.geminiPrompt(query)
//         if(response){
//             return ({
//                 response,
//                 model: "gemini"
//             })
//         }
//         else{
//             response =  await this.prompt(query)
//             if(response){
//                 return ({
//                     response,
//                     model: "chatgpt"
//                 })
//             }
//         }
//         return null
//     }
// }
//# sourceMappingURL=chatgpt.js.map