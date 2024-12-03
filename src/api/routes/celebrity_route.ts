import CelebrityController from "../../api/controllers/celebrity_controller";
import { upload } from "../../api/middlewares/multer_upload";
import { iocContainer } from "../../api/program";
import { Router } from "express";


const celebrityController = iocContainer.resolve(CelebrityController);


const celebrityRouter = Router();
celebrityRouter.post("/create", upload.fields([{name: 'image', maxCount: 1}, {name: 'icons', maxCount: 4}, {name: 'avatar', maxCount: 1}]), celebrityController.createCelebrity);
celebrityRouter.post("/train", celebrityController.trainCelebrity)
celebrityRouter.post("/news", celebrityController.testAINews)
celebrityRouter.post("/chat", celebrityController.initiateChat);
celebrityRouter.get("/", celebrityController.getCelebrities);
celebrityRouter.post("/converse", celebrityController.chat);

export default celebrityRouter;