import express from "express"
import morgan from "morgan"
import helmet from "helmet"
import cookie_parser from "cookie-parser"
import body_parser from "body-parser"
import userRouter from "./routers/userRouter"
import videoRouter from "./routers/videoRouter"
import globalRouter from "./routers/globalRouter"
import routes from "./routes"

const app = express();

app.use(cookie_parser());
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended: true}));
app.use(helmet());
app.use(morgan("dev"));

app.use(routes.home,globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);
 
export default app;
