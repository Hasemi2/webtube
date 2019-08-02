import routes from "./routes";
import multer from "multer";

const multerVideo = multer( {dest : "uploads/videos/"});

export const localMiddleWare = (req, res, next) => {
    res.locals.siteName = 'Webtube';
    res.locals.routes = routes;
    res.locals.user = {
        isAuthenticated : false,
        id: 1
    };
    next();
};

export const uploadVideo = multerVideo.single("videoFile"); //form을 통해 전송되는 파일의 name속성