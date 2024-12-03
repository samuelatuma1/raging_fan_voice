"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const program_1 = require("./src/api/program");
const error_middleware_1 = require("./src/api/middlewares/error_middleware");
const cors_1 = __importDefault(require("cors"));
const ws_1 = require("ws");
const base_handler_1 = require("./src/api/web_socket_event_handlers/base_handler");
const celebrity_route_1 = __importDefault(require("./src/api/routes/celebrity_route"));
const auth_logic_1 = require("./src/core/auth/application/contract/logic/auth_logic");
const auth_request_1 = require("./src/core/auth/domain/dto/request/auth_request");
const auth_route_1 = __importDefault(require("./src/api/routes/auth_route"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
async function bootstrapMongoose() {
    mongoose_1.default.set("strictQuery", false);
    mongoose_1.default.Promise = Promise;
    await mongoose_1.default.connect(process.env.MONGO_URL ?? "");
    console.log({ url: process.env.MONGO_URL });
    mongoose_1.default.connection.on("error", (error) => console.log({ error }));
}
bootstrapMongoose();
app.use("/celebrity", celebrity_route_1.default);
app.use("/auth", auth_route_1.default);
app.get("/", (req, res) => {
    res.json("Express + TypeScript Server");
});
app.post("/image", async (req, res) => {
    res.json({ text: "Hello" });
});
// consumers
//APIs
// Migrations
let authLogic = program_1.iocContainer.resolve(auth_logic_1.IIAuthLogic);
async function addPermission() {
    try {
        let permissionRequest = new auth_request_1.CreatePermissionRequest();
        permissionRequest.name = "user";
        const createdUserPermission = await authLogic.createPermission(permissionRequest);
        console.log({ createdUserPermission });
    }
    catch (ex) {
        console.log(ex.message);
    }
    try {
        let permissionRequest = new auth_request_1.CreatePermissionRequest();
        permissionRequest.name = "admin";
        const createdUserPermission = await authLogic.createPermission(permissionRequest);
        console.log({ createdUserPermission });
    }
    catch (ex) {
        console.log(ex.message);
    }
}
async function addRole() {
    try {
        await addPermission();
        let roleRequest = new auth_request_1.CreateRoleRequest();
        roleRequest.name = "user";
        roleRequest.permissionNames = ["user"];
        const createdUserRole = await authLogic.createRole(roleRequest);
        console.log({ createdUserRole });
    }
    catch (ex) {
        console.log(ex.message);
    }
    try {
        await addPermission();
        let roleRequest = new auth_request_1.CreateRoleRequest();
        roleRequest.name = "admin";
        roleRequest.permissionNames = ["admin"];
        const createdUserRole = await authLogic.createRole(roleRequest);
        console.log({ createdUserRole });
    }
    catch (ex) {
        console.log(ex.message);
    }
}
// addRole()
app.use(error_middleware_1.ErrorMiddleware);
const server = app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}, web socket on port ws://localhost:${port}`);
});
let wss = new ws_1.WebSocket.Server({ server: server });
var openAIWebSocket = program_1.iocContainer.resolve(base_handler_1.IIAIWebSocket);
wss.on('connection', function connection(client) {
    console.group("started");
    client.on('error', console.error);
    openAIWebSocket.connect();
    openAIWebSocket.relayEventFromOpenAIToWebsocketServer(client);
    client.on('message', async function message(data) {
        // return webSocketDispatcher.dispatchMessage(data, client)
        let d = JSON.parse(data.toString());
        if (d.originatedFrom !== "OPENAI") {
            openAIWebSocket.relayMessageToOpenAI(data, client);
        }
        else {
            console.log("ORIGINATING FROM OPENAI");
        }
    });
    // client.send(`Connected`);
});
process.on('uncaughtException', (err) => {
    console.error('Unhandled exception:', err);
    console.log('Restarting WebSocket server...');
    wss.close(() => {
        wss = new ws_1.WebSocket.Server({ server });
        console.log('WebSocket server restarted successfully.');
        wss.on('connection', function connection(client) {
            console.group("started");
            client.on('error', console.error);
            openAIWebSocket.connect();
            openAIWebSocket.relayEventFromOpenAIToWebsocketServer(client);
            client.on('message', async function message(data) {
                // return webSocketDispatcher.dispatchMessage(data, client)
                let d = JSON.parse(data.toString());
                if (d.originatedFrom !== "OPENAI") {
                    // console.log("Not FROM OPENAI")
                    openAIWebSocket.relayMessageToOpenAI(data, client);
                }
                else {
                    console.log("ORIGINATING FROM OPENAI");
                }
            });
        });
    });
});
// const socket = new WebSocket('wss://plankton-app-4u7bx.ondigitalocean.app');
// socket.onopen = () => {
//   const message = JSON.stringify({
//     "event_id": "evt_y4n9c8fpb43ew1Xeb",
//     "type": "session.update",
//     "session": {
//       "modalities": ["text", "audio"],
//       "instructions": "",
//       "voice": "alloy",
//       "input_audio_format": "pcm16",
//       "output_audio_format": "pcm16",
//       "input_audio_transcription": null,
//       "turn_detection": null,
//       "tools": [],
//       "tool_choice": "auto",
//       "temperature": 0.8,
//       "max_response_output_tokens": 4096
//     }
//   });
//   socket.send(message);
//   console.log("Message sent:", message);
// }
// socket.onmessage = (event: {}) => {
//   console.log("Message received from server:");
//   console.log({event});
//   // If the server sends JSON, you can parse it like this:
//   try {
//     const serverMessage = JSON.parse(event.toString());
//     console.log("Parsed server message:", serverMessage);
//   } catch (error) {
//     console.error("Error parsing server message:", error);
//   }
// };
// // When an error occurs
// socket.onerror = (error) => {
//   console.error('WebSocket Error:', error);
// };
// // When the connection is closed
// socket.onclose = (event) => {
//   console.log("WebSocket connection closed:", event);
// };
//# sourceMappingURL=index.js.map