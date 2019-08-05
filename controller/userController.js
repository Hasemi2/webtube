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

export const githubLoginCallback = async (_, __, profile, cb) => {
    const { 
        _json: {id, avatar_url, name, email }
    } = profile;

     try {
         const user = await User.findOne({email});

         if(user){
             user.githubId = id;
             user.save();
             return cb(null, user);

         }
             const newUser = await User.create({
                 email, name, githubId:id, avatarUrl : avatar_url
             });
             return cb(null, newUser);
     
     } catch (error) {
         console.log(error);
         return cb(error);
     }
    return null;

}

export const postGithubLogIn = (req, res) => {
    res.redirect(routes.home);
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

export const getMe = (req, res) => {
    res.render("userDetail", { pageTitle: "userDetail", user : req.user }); //req.user 는 현재 로그인된 사용자, passport가 올려줌
}

export const users = (req, res) => res.render("users", { pageTitle: "users" });
export const userDetail = async (req, res) => {
    const {params : {id}} = req;

    try {
        const user = await User.findById(id);
        res.render("userDetail", { pageTitle: "userDetail" , user});
    } catch (error) {
        res.redirect(routes.home);
    }
}
export const editProfile = (req, res) => res.render("editProfile", { pageTitle: "editProfile" });
export const changePassword = (req, res) => res.render("changePassword", { pageTitle: "changePassword" });