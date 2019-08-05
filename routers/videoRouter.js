import express from "express";
import routes from "../routes";
import {
        getUpload,
        postUpload,
        videoDetail,
        deleteVideo,
        getEditVideo,
        postEditVideo

} from "../controller/videoController";

import { uploadVideo, onlyPrivate } from "../middlewares";

const videoRouter = express.Router();
videoRouter.get(routes.upload, onlyPrivate, getUpload);
videoRouter.post(routes.upload, onlyPrivate, uploadVideo, postUpload); //multer 모듈을 사용하여 파일전송 관리함

videoRouter.get(routes.videoDetail(), videoDetail);

videoRouter.post(routes.editVideo(), postEditVideo);
videoRouter.get(routes.editVideo(), getEditVideo);

videoRouter.get(routes.deleteVideo(), deleteVideo);

export default videoRouter;