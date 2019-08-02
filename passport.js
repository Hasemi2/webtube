import passport from "passport";
import User from "./models/User";

//serialization : 쿠키에 어떤 정보를 주느냐 (사용자정보 -> 쿠키)
//deserialization : 어느 사용자인지 어떻게 찾느냐 (쿠키 -> 사용자정보)
 
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());