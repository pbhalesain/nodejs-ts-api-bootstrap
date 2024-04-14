import dotenv from "dotenv";
dotenv.config();
import config from "config";
import express, { Request, Response, NextFunction } from "express";
import deserializeUser from "./middleware/deserializeUser";
import { routes } from "./routes";
import connect from "./utils/connect";
import logger from "./utils/logger";


const port = config.get<number>("port");
const app = express();
app.use(express.json());
const publicRoutes = ['/api/register', '/api/login', '/'];
// Routes
app.use((req: Request, res: Response, next: NextFunction) => {
  if (publicRoutes.some((route) => req.path.startsWith(route))) {
    // This route is public, bypass authentication
    return next();
  }

  // This route requires authentication, use the AuthMiddleware
  deserializeUser;
});
app.listen(1337, async () => {
  logger.info(`App is running at http://localhost:${port}`);
  await connect();
  routes(app);
});
