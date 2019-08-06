import passport from "passport";
import GithubStrategy from "passport-github";
import FaceBookStrategy from "passport-facebook";
import KakaoStrategy from "passport-kakao";
import NaverStrategy from "passport-naver";
import User from "./models/User";
import  { githubLoginCallback, naverLoginCallback , kakaoLoginCallback, facebookCallback} from "./controller/userController"; 
import routes from "./routes";
import dotenv from "dotenv";

dotenv.config();

//serialization : 쿠키에 어떤 정보를 주느냐 (사용자정보 -> 쿠키)
//deserialization : 어느 사용자인지 어떻게 찾느냐 (쿠키 -> 사용자정보)
//NAVER_ID="HJmNMPhYTShuotwSimeQ"
//NAVER_SECRET="uXqQO_ex9y"

//KAKAO_ID="6944ef36551078344477a7285fcccc94"
//KAKAO_SECRET="RIxhSm3jOsYlA59KICDJKsmb5OheFSqB"

//FACEBOOK_ID="2334253860236347"
//FACEBOOK_SECRET="e1115ab304bcf78dca5be2b2da0bb307"
//페이스북 로그인시 ngrok 를 이용해 https 터널을 이용하여 인증 절차를 거쳐야함, 개발자홈에서도 해당
//터널로 생성된 https url을 사용해야함


passport.use(User.createStrategy());

passport.use(new GithubStrategy({
    clientID: process.env.GH_ID,
    clientSecret: process.env.GH_SECRET,
    callbackURL: `http://localhost:4000${routes.githubCallback}`
},
    githubLoginCallback
));

passport.use(new FaceBookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: `https://7bebf493.ngrok.io${routes.facebookCallback}`,
    profileFields: ['id', 'displayName', 'photos', 'email'],
    scope : ['public_profile' , 'email']
}, 
    facebookCallback
));

passport.use(new NaverStrategy({
    clientID: process.env.NAVER_ID,
    clientSecret: process.env.NAVER_SECRET,
    callbackURL: `http://localhost:4000${routes.naverCallback}` 
},
    naverLoginCallback
));

passport.use(new KakaoStrategy({
    clientID: process.env.KAKAO_ID,
    clientSecret: process.env.KAKAO_SECRET,
    callbackURL: `http://localhost:4000${routes.kakaoCallback}` 
},
    kakaoLoginCallback
));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());