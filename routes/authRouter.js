import { Router } from "express";
import {
  registerController,
  loginController,
  currentController,
  logoutController,
} from "../controllers/authControllers.js";

import authenticate from "../middlewares/authenticate.js";
import validateBody from "../helpers/validateBody.js";
import { registerUserSchema, loginSchema } from "../schemas/usersSchemas.js";

const authRouter = Router();

authRouter.post(
  "/register",
  validateBody(registerUserSchema),
  registerController,
);

authRouter.post("/login", validateBody(loginSchema), loginController);

authRouter.get("/current", authenticate, currentController);

authRouter.post("/logout", authenticate, logoutController);

export default authRouter;
