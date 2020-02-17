import passport from "passport";
import routes from "../routes";
import User from "../models/User";

export const getJoin = (req, res) => {
    res.render("join", {
        pageTitle: "Join"
    });

}
export const postJoin = async (req, res, next) => {
    console.log(req.body);
    const {
        body: {
            name,
            email,
            password,
            password2
        }
    } = req;
    if (password !== password2) {
        res.status(400);
        res.redirect(routes.join);
    } else {
        try {
            const user = await User({
                name,
                email
            });
            await User.register(user,password);
            next();
        } catch (error) {
            console.log(error);
            res.redirect(routes.home);
        }

    }


}
export const getlogin = (req, res) => {

    res.render("login", {pageTitle: "Login" });

}

export const postlogin = passport.authenticate('local', {

    failureRedirect: routes.login,
    successRedirect: routes.home
});

export const githubLogin = passport.authenticate('github');

export const githubLoginCallback = async (_, __, profile, cb) => {
    const {
        _json: {
            id,
            avatar_url: avatarUrl,
            name,
            email
        }
    } = profile

    try {
        const user = await User.findOne({
            email
        });
        if (user) {
            user.githubId = id;
            user.avatarUrl = avatarUrl;
            user.save();
            return cb(null, user);
        }
        if (!email || email === "") {
            throw Error("깃허브 이메일을 찾을 수 없습니다.")
        }

        const newUser = await User.create({
            email,
            name,
            githubId: id,
            avatarUrl
        });
        return cb(null, newUser);

    } catch (error) {

        return cb(error);
    }
}

export const postGithubLogin = (req, res) => {
    res.redirect(routes.home);
}

export const facebookLogin = passport.authenticate('facebook');

export const facebookLoginCallback = async (_, __, profile, cb) =>{
    const {_json : { id, name, email } } = profile;

    try {
        const user = await User.findOne({email});
        if (user) {
            user.facebookId = id;
            user.avatarUrl = `https://graph.facebook.com/${id}/picture?type=large`;
            user.save();
            return cb(null, user);
        }
        if (!email || email === "") {
            throw Error("페이스북 이메일을 찾을 수 없습니다.")
        }

        const newUser = await User.create({
            email,
            name,
            facebookId: id,
            avatarUrl: `https://graph.facebook.com/${id}/picture?type=large`
        });
        return cb(null, newUser);

    } catch (error) {
        return cb(error);
    }
}

export const postFacebookLogin = (req,res) =>{
    res.redirect(routes.home);
}

export const kakaoLogin = passport.authenticate("kakao");

export const kakaoLoginCallback = async (_, __, profile, done) => {
    const {_json : { id, properties: { nickname, profile_image }, kakao_account : { email } } } = profile;

    try {
        const user = await User.findOne({ email });
        if (user) {
            user.kakaoId = id;
            user.avatarUrl = profile_image;
            user.save();
            return done(null, user);
        }
        if (!email || email === "") {
            throw Error("카카오톡 이메일을 찾을 수 없습니다.")
        }

        const newUser = await User.create({
            email,
            name: nickname,
            kakaoId: id,
            avatarUrl: profile_image
        });
        return done(null, newUser);

    } catch (error) {
        return done(error);
    }
}


export const postKakaoLogin = (req,res) =>{
    res.redirect(routes.home);
}

export const logout = (req, res) => {
    req.logout();
    res.redirect(routes.home);
}

//export const getmyPage = (req, res) => {
//    res.render("userDetail", { pageTitle: "User Detail", user: req.user });
//};

export const userDetail = async (req, res) => {
    const {
        params: {
            id
        }
    } = req
    try {
        const user = await User.findById(id).populate('videos');
        console.log(user);
        res.render("userDetail", { pageTitle: "User Detail", user });
    } catch (error) {
        console.log(error);
        res.redirect(routes.home);
    }
}


export const getEditProfile = (req, res) =>{
    res.render("editProfile", { pageTitle: "Edit Profile", user: req.user  } );
};

export const postEditProfile = async (req, res) =>{
    const {
        body: {name, email},
        file
    } = req;
    try {
        await User.findByIdAndUpdate(req.user.id, {
            name,
            email,
            avatarUrl : file ? `/${file.location}` : `${req.user.avatarUrl}`
        });
        res.redirect(routes.userDetail(req.user.id));
    } catch (error) {
        res.redirect(routes.editProfile(req.user.id), { pageTitle: "Edit Profile" });
    }
};

export const getChangePassword = (req, res) => {
    res.render("changePassword", {pageTitle: "Change Password"});
}

export const postChangePassword = async (req, res) => {
    const {
        body :{
            oldPasswod,
            newPassword,
            newPassword1   
        } 
    } = req;

    try {
        if(newPassword !== newPassword1){
            res.status(400);
            res.redirect(routes.changePassword, { pageTitle: "Change Password" });
            return;
        } 
        await req.user.changePassword(oldPasswod,newPassword);
        res.redirect(routes.myPage);
    } catch (error) {
        res.status(400);
        res.redirect(routes.changePassword, { pageTitle: "Change Password" });
    }
}