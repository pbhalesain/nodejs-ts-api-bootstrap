import dotenv from "dotenv";
dotenv.config();
import config from "config";
import express from "express";
import deserializeUser from "./middleware/deserializeUser";
import { routes } from "./routes";
import connect from "./utils/connect";
import logger from "./utils/logger";


const port = config.get<number>("port");
const app = express();
app.use(express.json());
app.use(deserializeUser);

app.listen(1337, async () => {
  logger.info(`App is running at http://localhost:${port}`);
  await connect();
  routes(app);
});
