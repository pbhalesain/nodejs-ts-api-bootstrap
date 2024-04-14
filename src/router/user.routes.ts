import express from "express";
import {
    createSessionHandler,
    deleteSessionHandler,
    getUserSessionsHandler,
} from "../controller/session.controller";
import { createUserHandler } from "../controller/user.controller";
import requireUser from "../middleware/requireUser";
import validateResource from "../middleware/validateResource";
import { createSessionSchema } from "../schema/session.schema";
import { createUserSchema } from "../schema/user.schema";

const router = express.Router();

router.post("/api/users", validateResource(createUserSchema), createUserHandler);
router.post(
    "/api/sessions",
    validateResource(createSessionSchema),
    createSessionHandler
);
router.get("/api/sessions", requireUser, getUserSessionsHandler);
router.delete("/api/sessions", requireUser, deleteSessionHandler);


export default router;
