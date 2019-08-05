import passport from "passport";
import GithubStrategy from "passport-github";
import FaceBookStrategy from "passport-facebook";
import KakaoStrategy from "passport-kakao";
import NaverStrategy from "passport-naver";
import User from "./models/User";
import  { githubLoginCallback } from "./controller/userController"; 
import routes from "./routes";
import dotenv from "dotenv";

dotenv.config();

//serialization : 쿠키에 어떤 정보를 주느냐 (사용자정보 -> 쿠키)
//deserialization : 어느 사용자인지 어떻게 찾느냐 (쿠키 -> 사용자정보)
// GH_ID="b806a6efd9005baffe43"
// GH_SECRET="474afe0738a9c3b4c435607d4200b29d7f3e2517"
// PRODUCTION="http://192.168.3.7:4000/auth/github/callback"

passport.use(User.createStrategy());

passport.use(new GithubStrategy({
    clientID: process.env.GH_ID,
    clientSecret: process.env.GH_SECRET,
    callbackURL: `http://127.0.0.1:3000${routes.githubCallback}`
},
    githubLoginCallback
));

// passport.use(new FaceBookStrategy({

// }));

// passport.use(new KakaoStrategy({

// }));

// passport.use(new NaverStrategy({

// }));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());