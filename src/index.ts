import dotenv from "dotenv";
dotenv.config();
import config from "config";

import App from './app';
import HomeController from "./resources/home.controller";
import AuthController from "./resources/users/auth.controller";

const app = new App(
    [new HomeController(),new AuthController()],
    Number(config.get<number>("port"))
);

//Start the server
app.listen();
