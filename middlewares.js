import routes from "./routes";
import multer from "multer";

const multerVideo = multer( {dest : "videos/"});

export const localMiddleWare = (req, res, next) => {
    res.locals.siteName = 'Webtube';
    res.locals.routes = routes;
    res.locals.user = {
        isAuthenticated : true,
        id: 1
    };
    next();
};

export const uploadVideo = multerVideo.single("videoFile");