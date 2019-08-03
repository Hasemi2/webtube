import routes from "../routes";
import User from "../models/User";
import passport from "passport";

export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });

export const postJoin = async (req, res) => {
    //console.log(req.body); 
    //form에서 전송한 데이터 받음
    const {
        body : {name, email, password, password2}
    } = req;
    if(password !== password2){
        res.status(400);
    }else{
        try {
            const user = await User({
                name, 
                email
            });
            await User.register(name, password);     
            next();
        } catch (error) {
            console.log(error);
            res.redirect(routes.home);
        }
        
    }
    res.render("join", { pageTitle: "Join" , test : false});
}

export const getLogin = (req, res) => res.render("login", { pageTitle: "login" });

export const postLogin =    passport.authenticate('login' , {
    failureRedirect: routes.login,
    successRedirect : routes.home
}); 

export const logout = (req, res) => {
    //todo: logout
    res.redirect(routes.home);
}
export const users = (req, res) => res.render("users", { pageTitle: "users" });
export const userDetail = (req, res) => res.render("userDetail", { pageTitle: "userDetail" });
export const editProfile = (req, res) => res.render("editProfile", { pageTitle: "editProfile" });
export const changePassword = (req, res) => res.render("changePassword", { pageTitle: "changePassword" });