import routes from "../routes";
import User from "../models/User";
import passport from "passport";

export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });

export const postJoin = async (req, res, next) => {
    //console.log(req.body); 
    //form에서 전송한 데이터 받음
    const {
        body: { name, email, password, password2 }
    } = req;

    if (password !== password2) {
        req.flash("error", "Passwords don't match");
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

export const githubLogin = passport.authenticate("github", {
    successFlash: "Github Login Success",
    failureFlash: "Github Login Fail"
});

export const githubLoginCallback = async (_, __, profile, cb) => {
    const {
        _json: { id, avatar_url, name, email }
    } = profile;

    try {
        const user = await User.findOne({ email });

        if (user) {
            user.githubId = id;
            user.save();
            return cb(null, user);
        } else {
            const newUser = await User.create({
                email, name, githubId: id, avatarUrl: avatar_url
            });
            return cb(null, newUser);

        }

    } catch (error) {
        console.log(error);
        return cb(error);
    }
}

export const postGithubLogIn = (req, res) => {
    res.redirect(routes.home);
}

export const naverLogin = passport.authenticate("naver", {
    successFlash: "Naver Login Success",
    failureFlash: "Naver Login Fail"
});

export const naverLoginCallback = async (_, __, profile, done) => {
    const {
        _json: {
            email,
            id,
            nickname,
            profile_image
        }
    } = profile;

    const user = await User.findOne({ email });
    if (user) {
        user.naverId = id;
        user.save();
        return done(null, user);
    } else {

        const newUser = await User.create({
            email, name: nickname, naverId: id, avatarUrl: profile_image
        });
        return done(null, newUser);
    }


}

export const postNaverLogIn = (req, res) => {
    res.redirect(routes.home);
}

export const kakaoLogin = passport.authenticate("kakao", {
    successFlash: "Kakao Login Success",
    failureFlash: "Kakao Login Fail"
});

export const kakaoLoginCallback = async (_, __, profile, done) => {
    const {
        _json: {
            kaccount_email,
            id,
            properties: {
                profile_image,
                nickname
            }
        }
    } = profile;

    const user = await User.findOne({ email: kaccount_email });
    if (user) {
        user.kakaoId = id;
        user.save();
        return done(null, user);
    } else {
        const newUser = await User.create({
            email: kaccount_email, name: nickname, kakaoId: id, avatarUrl: profile_image
        });
        return done(null, newUser);
    }
}

export const postKakaoLogin = (req, res) => res.redirect(routes.home);

export const facebookLogin = passport.authenticate('facebook', {
    successFlash: "Facebook Login Success",
    failureFlash: "Facebook Login Fail"
});

export const facebookCallback = async (_, __, profile, done) => {
    const {
        _json: { id, name, email }
    } = profile;

    const user = await User.findOne({ email });
    if (user) {
        user.facebookId = id;
        user.save();
        return done(null, user);

    } else {
        const newUser = await User.create({
            email, name, facebookId: id, avatarUrl: `https://graph.facebook.com/${id}/pciture?type=large`
        });
        return done(null, newUser);
    }

}

export const postFacebookLogin = (req, res) => res.redirect(routes.home);

export const getLogin = (req, res) => res.render("login", { pageTitle: "login" });

export const postLogin = passport.authenticate("local", {
    successRedirect: routes.home,
    failureRedirect: routes.login
});

export const logout = (req, res) => {
    req.flash("info", "Logged out");
    req.logout();
    res.redirect(routes.home);
}

export const getMe = async (req, res) => {
    const { user : {id} } = req;
    try {
        const user = await User.findById(id).populate("videos");
        console.log("user ====> " ,  user);
        res.render("userDetail", { pageTitle: "userDetail", user });
    } catch (error) {
        res.redirect(routes.home);
    }
}

export const users = (req, res) => res.render("users", { pageTitle: "users" });

export const userDetail = async (req, res) => {
    const { params: { id } } = req;
    try {
        const user = await User.findById(id).populate("videos");
        res.render("userDetail", { pageTitle: "userDetail", user });
    } catch (error) {
        res.redirect(routes.home);
    }
}

export const postEditProfile = async (req, res) => {
    const {
        body: { name, email },
        file: { location },
        user: { _id, avatarUrl }

    } = req;

    try {
        await User.findByIdAndUpdate(
            _id,
            { name, email, avatarUrl: location ? location : avatarUrl }
        );
        res.redirect(routes.me);
    } catch (error) {
        console.log(error);
        res.render("editProfile", { pageTitle: "editProfile" });
    }

}

export const getEditProfile = (req, res) => res.render("editProfile", { pageTitle: "editProfile" });

export const postChangePassword = async (req, res) => {
    const {
        body: { oldPassword, newPassword, newPassword1 }
    } = req;
    try {
        if (newPassword !== newPassword1) {
            req.flash("error", "Password Not Matched");
            res.status(400);
            res.redirect(`/users${routes.changePassword}`);
            return
        } else {
            await req.user.chagePassword(oldPassword, newPassword); //user를 조회할 필요 없이 바로 password 변경이 가능함
        }
    } catch (error) {
        req.flash("error", "Can't change password");
        res.status(400);
        res.redirect(`/users${routes.changePassword}`);
    }

}

export const getChangePassword = (req, res) => res.render("changePassword", { pageTitle: "changePassword" });