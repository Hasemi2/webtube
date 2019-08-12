import routes from "./routes";
import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import dotenv from "dotenv";
dotenv.config();

const s3 = new aws.S3({
    accessKeyId:process.env.AW_KEY_ID,
    secretAccessKey:process.env.AW_PRIVATE_KEY,
    bucket: process.env.BUCKET_NAME
});


// const multerVideo = multer( {dest : "uploads/videos/"});

// const multerAvatar = multer({
//     storage : multerS3({
//         s3: s3,
//         acl : 'public-read' ,//acl=> access-control-read,
//         bucket :  process.env.BUCKET_NAME + "/avatar",
//         key : (req, file, cb) => {
//             cb(null, file.originalname);
//         }
//     })
// });

const multerAvatar = multer({dest : "uploads/avatar/"});

const multerVideo = multer({
        storage : multerS3({
        s3,
        acl : 'public-read' ,//acl=> access-control-read,
        bucket :  process.env.BUCKET_NAME + "/uploads",
        key : (req, file, callback) => {
            callback(null, file.originalname);
        } 
    })
});

export const localMiddleWare = (req, res, next) => {
    res.locals.siteName = 'Webtube';
    res.locals.routes = routes;
    res.locals.loggedUser = req.user || null; //passport에서 user 가 담긴 object를 request에 올려줌
    next();
};

export const onlyPublic = (req, res, next) => {
    if (req.user){
        res.redirect(routes.home);
    }else{
        next();
    }
}

 
export const onlyPrivate = (req, res, next) => {
    if (req.user){
        next();
    }else{
        res.redirect(routes.home);
    }
}


export const uploadVideo = multerVideo.fields([
    {name : "videoFile" } , {name : "thumbnail"}]); //form을 통해 전송되는 파일의 name속성

export const uploadAvatar = multerAvatar.single("avatar");