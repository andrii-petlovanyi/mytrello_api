import express from "express";
import {
  currentUserCtrl,
  loginCtrl,
  registerCtrl,
} from "../controllers/users.controller.js";
import { checkJWT, wrapCtrl } from "../middlewares/index.js";

const router = express.Router();

router.post("/login", wrapCtrl(loginCtrl));
router.post("/register", wrapCtrl(registerCtrl));

router.use(checkJWT);
router.get("/current", wrapCtrl(currentUserCtrl));

export { router as usersRouter };
