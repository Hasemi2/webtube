import routes from "../routes";
import User from "../models/User";
import passport from "passport";
import { createVerify } from "crypto";

export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });

export const postJoin = async (req, res) => {
    //console.log(req.body); 
    //form에서 전송한 데이터 받음
    const {
        body: { name, email, password, password2 }
    } = req;

    if (password !== password2) {
        res.status(400);
        res.render("join", { pageTitle: "Join" });
    } else {
        try {
            const user = await User({
                name,
                email
            });
            await User.register(user, password);
            next();

        } catch (error) {
            console.log(error);
            res.redirect(routes.home);
        }

    }

}

export const githubLogin = passport.authenticate("github");

export const githubLoginCallback = (accessToken, refreshToken, profile, cb) => {
    console.log("accessToken", accessToken);
    console.log("refreshToken", refreshToken);
    console.log("profile", profile);
    console.log("cb", cb);
    return null;

}

export const postGithubLogIn = (req, res) => {
    res.send(routes.home);
}

export const getLogin = (req, res) => res.render("login", { pageTitle: "login" });

export const postLogin = passport.authenticate("local", {
    successRedirect: routes.home,
    failureRedirect: routes.login
});

export const logout = (req, res) => {
    //todo: logout
    req.logout();
    res.redirect(routes.home);
}


export const users = (req, res) => res.render("users", { pageTitle: "users" });
export const userDetail = (req, res) => res.render("userDetail", { pageTitle: "userDetail" });
export const editProfile = (req, res) => res.render("editProfile", { pageTitle: "editProfile" });
export const changePassword = (req, res) => res.render("changePassword", { pageTitle: "changePassword" });