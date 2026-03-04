import { Router } from "express";
import {
  registerController,
  verifyController,
  resendVerifyController,
  loginController,
  currentController,
  logoutController,
  updateAvatarController,
} from "../controllers/authControllers.js";

import upload from "../middlewares/upload.js";
import authenticate from "../middlewares/authenticate.js";
import validateBody from "../helpers/validateBody.js";
import {
  registerUserSchema,
  loginSchema,
  emailSchema,
} from "../schemas/usersSchemas.js";

const authRouter = Router();

authRouter.post(
  "/register",
  validateBody(registerUserSchema),
  registerController,
);

authRouter.get("/verify/:verificationToken", verifyController);

authRouter.post("/verify", validateBody(emailSchema), resendVerifyController);

authRouter.post("/login", validateBody(loginSchema), loginController);

authRouter.get("/current", authenticate, currentController);

authRouter.post("/logout", authenticate, logoutController);

authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  updateAvatarController,
);

export default authRouter;
