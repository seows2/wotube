import express from "express"
import morgan from "morgan"
import helmet from "helmet"
import cookie_parser from "cookie-parser"
import body_parser from "body-parser"

var app = express();
const PORT = 4000;

const listening = () => console.log(`Welcome Port : http://localhost:${PORT}`);
const Home = (req, res) => res.send("Hello World")
const Profile = (req, res) => res.send("Profile");
const middleware = (req,res,next) =>{
    console.log('middle');
    next();
}

app.use(cookie_parser());
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended: true}));
app.use(helmet());
app.use(morgan("dev"));

app.get("/",Home);

app.get("/profile", Profile);

app.listen(PORT,listening);