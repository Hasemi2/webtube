import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import routes from "./routes";
import { localMiddleWare } from "./middlewares";
import passport from "passport";
import "./passport";

const app = express();

app.use(helmet()); //보안설정
app.set("view engine" , "pug");
app.use("/uploads" , express.static("uploads")); //정적 파일을 제공하는 미들웨어 함수 uploads의 디렉토리에 포함된 동영상 url을 정적 파일로 제공함
app.use("/static" , express.static("static")); //webpack build시 generate 되는 static 폴더의 css와 js파일이 들어있는 폴더
app.use(cookieParser()); //쿠키를 전달받아서 사용할수 있도록 만들어주는 미들웨어
app.use(bodyParser.urlencoded({extended:true}));  //json 형태의  request 데이터 검사
app.use(bodyParser.json()); 
app.use(morgan("dev")); //logging
app.use(passport.initialize()); //passport 초기화
//app.use(passport.session()); //세션 설정

app.use(localMiddleWare);
app.use(routes.home , globalRouter);
app.use(routes.users , userRouter);
app.use(routes.videos , videoRouter);
 
export default app;