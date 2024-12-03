import "reflect-metadata";
import express, { Express, NextFunction, Request, response, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { iocContainer } from "./src/api/program";
import { ErrorMiddleware } from "./src/api/middlewares/error_middleware";
import cors from 'cors';
import { WebSocket } from "ws";
import WebSocketDispatcher, { IAIWebSocket, IIAIWebSocket, OpenAIWebSocket } from "./src/api/web_socket_event_handlers/base_handler";
import celebrityRouter from "./src/api/routes/celebrity_route";
import { IAuthLogic, IIAuthLogic } from "./src/core/auth/application/contract/logic/auth_logic";
import { CreatePermissionRequest, CreateRoleRequest } from "./src/core/auth/domain/dto/request/auth_request";
import authRouter from "./src/api/routes/auth_route";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cors())
async function bootstrapMongoose() {
  mongoose.set("strictQuery", false);
  mongoose.Promise = Promise;
  await mongoose.connect(process.env.MONGO_URL ?? "");
  console.log({url: process.env.MONGO_URL})
  mongoose.connection.on("error", (error: Error) => console.log({error}));
}
bootstrapMongoose()

app.use("/celebrity", celebrityRouter)
app.use("/auth", authRouter)

app.get("/", (req: Request, res: Response) => {
  res.json("Express + TypeScript Server");
});

app.post("/image", async (req: Request, res: Response) => {
  res.json({text: "Hello"});
});

// consumers
//APIs

// Migrations
let authLogic: IAuthLogic = iocContainer.resolve(IIAuthLogic)

async function addPermission (){
  
  try{
    
    let permissionRequest = new CreatePermissionRequest();
    permissionRequest.name = "user"
    const createdUserPermission = await authLogic.createPermission(permissionRequest)
    console.log({createdUserPermission})
  }
  catch(ex){
    console.log(ex.message)
  }

  try{
    
    let permissionRequest = new CreatePermissionRequest();
    permissionRequest.name = "admin"
    const createdUserPermission = await authLogic.createPermission(permissionRequest)
    console.log({createdUserPermission})
  }
  catch(ex){
    console.log(ex.message)
  }
}

async function addRole (){
  
  try{
    await addPermission()
    let roleRequest = new CreateRoleRequest();
    roleRequest.name = "user"
    roleRequest.permissionNames = ["user"]
    const createdUserRole = await authLogic.createRole(roleRequest)
    console.log({createdUserRole})
  }
  catch(ex){
    console.log(ex.message)
  }

  try{
    await addPermission()
    let roleRequest = new CreateRoleRequest();
    roleRequest.name = "admin"
    roleRequest.permissionNames = ["admin"]
    const createdUserRole = await authLogic.createRole(roleRequest)
    console.log({createdUserRole})
  }
  catch(ex){
    console.log(ex.message)
  }
}
// addRole()



app.use(ErrorMiddleware);


const server = app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}, web socket on port ws://localhost:${port}`);
});

let wss = new WebSocket.Server({ server: server });

var openAIWebSocket: IAIWebSocket = iocContainer.resolve(IIAIWebSocket);
wss.on('connection', function connection(client) {
  
  console.group("started")
  client.on('error', console.error);
  openAIWebSocket.connect();
  openAIWebSocket.relayEventFromOpenAIToWebsocketServer(client)
  
  client.on('message', async function message(data) {
    // return webSocketDispatcher.dispatchMessage(data, client)
    let d = JSON.parse(data.toString())
    if(d.originatedFrom !== "OPENAI"){
      openAIWebSocket.relayMessageToOpenAI(data, client);

    }
    else{
      console.log("ORIGINATING FROM OPENAI")
    }

  });



  // client.send(`Connected`);
});

process.on('uncaughtException', (err) => {
  console.error('Unhandled exception:', err);
  console.log('Restarting WebSocket server...');
  wss.close(() => {
    wss = new WebSocket.Server({ server });
    console.log('WebSocket server restarted successfully.');
    wss.on('connection', function connection(client) {
  
      console.group("started")
      client.on('error', console.error);
      openAIWebSocket.connect();
      openAIWebSocket.relayEventFromOpenAIToWebsocketServer(client)
      
      client.on('message', async function message(data) {
        // return webSocketDispatcher.dispatchMessage(data, client)
        let d = JSON.parse(data.toString())
        if(d.originatedFrom !== "OPENAI"){
          // console.log("Not FROM OPENAI")
          openAIWebSocket.relayMessageToOpenAI(data, client);
    
        }
        else{
          console.log("ORIGINATING FROM OPENAI")
        }
      })
      });
  });
});

console.log("Updated")