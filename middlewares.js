import routes from "./routes";
import multer from "multer";

const multerVideo = multer( {dest : "uploads/videos/"});

export const localMiddleWare = (req, res, next) => {
    res.locals.siteName = 'Webtube';
    res.locals.routes = routes;
    res.locals.user = req.user || null; //passport에서 user 가 담긴 object를 request에 올려줌
    console.log("user " , req.user);
    next();
};

export const onlyPublic = (req, res, next) => {
    if (req.user){
        res.redirect(routes.home);
    }else{
        next();
    }
}

export const uploadVideo = multerVideo.single("videoFile"); //form을 통해 전송되는 파일의 name속성