import express from "express";
import routes from "../routes";
import {
    postRegisterView, postAddComment, postRemoveComment, postUpdateComment
} from "../controller/videoController";

const apiRouter = express.Router();

apiRouter.post(routes.registerView , postRegisterView);

apiRouter.post(routes.addComment, postAddComment);

apiRouter.post(routes.removeComment, postRemoveComment);

apiRouter.post(routes.updateComment, postUpdateComment);

export default apiRouter;