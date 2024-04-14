import { Express, Request, Response } from "express";
import {
  createSessionHandler,
  deleteSessionHandler,
  getUserSessionsHandler,
} from "./controller/session.controller";
import { createUserHandler } from "./controller/user.controller";
import requireUser from "./middleware/requireUser";
import validateResource from "./middleware/validateResource";
import { createSessionSchema } from "./schema/session.schema";
import { createUserSchema, registerUserSchema } from "./schema/user.schema";
import { getPrivacyPolicyHandler, getTermsAndConditionsHandler } from "./controller/site.controller";
import { get } from "config";
import { createProductSchema, deleteProductSchema, getProductSchema, updateProductSchema } from "./schema/product.schema";
import { createProductHandler, deleteProductHandler, getProductHandler, updateProductHandler } from "./controller/product.controller";
import { AuthController } from "./controller/auth.controller";
export function routes(app: Express) {
  const authController = new AuthController();
  app.get("/api", (req, res) => {
    res.send("Hello World!");
  });
  app.get("/api/healthcheck", (req: Request, res: Response) => {
    res.send("OK");
    res.sendStatus(200);
    res.send("Hello World!");
  });

  app.post("/api/users", validateResource(createUserSchema), createUserHandler);
  app.post(
    "/api/sessions",
    validateResource(createSessionSchema),
    createSessionHandler
  );
  app.get("/api/sessions",  requireUser, getUserSessionsHandler);
  app.delete("/api/sessions", requireUser, deleteSessionHandler);

  app.get("/api/privacypolicy",  getPrivacyPolicyHandler);
  app.get("/api/terms", getTermsAndConditionsHandler);
  
  app.post(
    "/api/products",
    [requireUser, validateResource(createProductSchema)],
    createProductHandler
  );
  app.put(
    "/api/products/:productId",
    [requireUser, validateResource(updateProductSchema)],
    updateProductHandler
  );
  app.get(
    "/api/products/:productId",
    validateResource(getProductSchema),
    getProductHandler
  );

  app.delete(
    "/api/products/:productId",
    [requireUser, validateResource(deleteProductSchema)],
    deleteProductHandler
  );

  app.post('/api/register',validateResource(registerUserSchema), authController.register);
  app.post('/api/login', authController.login);
}

export default routes;
