import express from "express";
import routes from "../routes";
import fs from "fs";
import {
    home,
    search
} from "../controllers/videoController";
import {
    getJoin,
    logout,
    postJoin,
    postlogin,
    getlogin,
    githubLogin,
    postGithubLogin,
    facebookLogin,
    postFacebookLogin,
    kakaoLogin,
    postKakaoLogin
} from "../controllers/userController";
import {
    onlyPublic,
    onlyPrivate
} from "../middlewares";
import passport from "passport";

const globalRouter = express.Router();

globalRouter.post(routes.join, onlyPublic, postJoin, postlogin);
globalRouter.get(routes.join, onlyPublic, getJoin);

globalRouter.post(routes.login, onlyPublic, postlogin);
globalRouter.get(routes.login, onlyPublic, getlogin);

globalRouter.get(routes.home, home);


globalRouter.get(routes.logout, onlyPrivate, logout);

globalRouter.get(routes.search, search);

globalRouter.get(routes.github, githubLogin);

globalRouter.get(routes.githubCallback, passport.authenticate('github', {
    successFlash: "반갑습니다!",
    failureRedirect: '/login'
}), postGithubLogin);

//globalRouter.get(routes.myPage, getmyPage);

globalRouter.get(routes.facebook, facebookLogin);

globalRouter.get(routes.facebookCallback, passport.authenticate('facebook', {
    successFlash: "반갑습니다!",
    failureRedirect: '/login'
}), postFacebookLogin);

globalRouter.get(routes.kakao, kakaoLogin);

globalRouter.get(routes.kakaoCallback, passport.authenticate('kakao', {
    successFlash: "반갑습니다!",
    failureRedirect: '/login'
}), postKakaoLogin);



globalRouter.get("/img", function (req, res){
    const num = genRandom()+1;
    fs.readFile(`src/logo/${num}.png`, function(error, data){
        res.writeHead(200, { "Content-Type" : "text/html"});
        res.end(data);
    });
});

const genRandom = () => {
    const number = Math.floor(Math.random() * 4);
    return number;
}


export default globalRouter; 