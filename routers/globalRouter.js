import express from "express";
import routes from "../routes";
import { home, search } from "../controller/videoController";
import { postJoin, getJoin, getLogin, postLogin, logout, githubLogin, postGithubLogIn , getMe, naverLogin, postNaverLogIn, kakaoLogin, postKakaoLogin, facebookLogin, postFacebookLogin} from "../controller/userController";
import { onlyPublic, onlyPrivate } from "../middlewares";
import passport from "passport";

const globalRouter = express.Router();

globalRouter.get(routes.home, home);

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.logout, onlyPrivate ,logout);
globalRouter.get(routes.search, search);

//github login
globalRouter.get(routes.github, githubLogin);
globalRouter.get(
    routes.githubCallback,
    passport.authenticate('github', { failureRedirect: routes.login }),
    postGithubLogIn);

//naver login
globalRouter.get(routes.naver, naverLogin);   
globalRouter.get(
    routes.naverCallback,
    passport.authenticate('naver', {failureRedirect: routes.login}),
    postNaverLogIn);  

//kakao login
globalRouter.get(routes.kakao, kakaoLogin);   
globalRouter.get(
    routes.kakaoCallback,
    passport.authenticate('kakao', {failureRedirect: routes.login}),
    postKakaoLogin);  


//facebook login
globalRouter.get(routes.facebook, facebookLogin);   

globalRouter.get(
    routes.facebookCallback,
    passport.authenticate('facebook', {failureRedirect: routes.login}),
    postFacebookLogin);  

globalRouter.get(routes.me , getMe);

export default globalRouter;