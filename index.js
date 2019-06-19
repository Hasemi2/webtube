import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

const app = express();

const PORT = 4000;

const handleListening = () => console.log('Listen on : http://localhost:${PORT}');

const handleHome = (req, res) => res.send('Hello from home');

const handleProfile = (req, res) => res.send('You are on my profile'); //arrow function 
 
app.use(cookieParser()); 
app.use(bodyParser.urlencoded({extended:true})); 
app.use(bodyParser.json()); 
app.use(helmet()); //보안설정
app.use(morgan("dev")); //log

app.get("/", handleHome);

app.get("/profile" , handleProfile);

app.listen(PORT, handleListening);

