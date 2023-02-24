import express from "express";
import {
  currentUserCtrl,
  loginCtrl,
  logOutCtrl,
  registerCtrl,
} from "../controllers/users.controller.js";
import { checkJWT, wrapCtrl } from "../middlewares/index.js";
import { reqValidation } from "../middlewares/reqValidation.js";
import { loginSchema, registerSchema } from "../validation/user.validation.js";

const router = express.Router();

router.post("/login", reqValidation(loginSchema), wrapCtrl(loginCtrl));
router.post("/register", reqValidation(registerSchema), wrapCtrl(registerCtrl));

router.use(checkJWT);
router.get("/current", wrapCtrl(currentUserCtrl));
router.get("/logout", wrapCtrl(logOutCtrl));

export { router as usersRouter };
