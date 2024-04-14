import express from "express";
import user from "./user.routes";
import auth from "./auth.routes";
import product from "./product.routes"

const router = express.Router();

router.get("/api", (req, res) => {
    res.send("Application is running!").sendStatus(200);
});

router.get("/api/healthcheck", (req, res) => {
    res.send("Health is fine").sendStatus(200);
   
});
router.get("/healthcheck", (_, res) => res.sendStatus(200));

router.use(user);
router.use(auth);
router.use(product);

export default router;


