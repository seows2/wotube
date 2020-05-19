/* eslint-disable no-undef */
import express from "express"; //노드js 익스프레스
import morgan from "morgan"; //로그
import helmet from "helmet"; //보안
import cookie_parser from "cookie-parser"; //쿠키파서
import body_parser from "body-parser"; //바디파서
import passport from "passport"; //사용자 인증,가입 등등
import mongoose from "mongoose";
import session from "express-session"; // 세션관리 사용자 세션
import path from "path";
import mongoStore from "connect-mongo"; //기존 세션 저장
import flash from "express-flash";

import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import apiRouter from "./routers/apiRouter";
import routes from "./routes";
import { localMiddleware } from "./middlewares";
import "./passport";

const app = express();

const CokieStore = mongoStore(session);

app.use(helmet());
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
//app.use("/uploads", express.static("uploads"));
app.use("/static", express.static(path.join(__dirname, "static")));
app.use(cookie_parser());
app.use(body_parser.json());
app.use(
  body_parser.urlencoded({
    extended: true,
  })
);
app.use(morgan("dev"));
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new CokieStore({
      mongooseConnection: mongoose.connection,
    }),
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(localMiddleware);

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);
app.use(routes.api, apiRouter);

export default app;
