import express, { Express, Request, Response } from "express";
import validateResource from "../middleware/validateResource";
import { AuthController } from "../controller/auth.controller";
import { registerUserSchema } from "../schema/user.schema";

const router = express.Router()

const authController = new AuthController();

router.post('/api/register', validateResource(registerUserSchema), authController.register);
router.post('/api/login', authController.login);

export default router;
