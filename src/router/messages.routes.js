import { Router } from "express";
import messagesController from "../controllers/message.controller.js";

const messageRouter = Router();

messageRouter.get('/', messagesController.getMessages);
messageRouter.post('/', messagesController.postMessages);

export default messageRouter;