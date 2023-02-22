import express from "express";
import {
  addListCtrl,
  allListsCtrl,
  removeListCtrl,
} from "../controllers/lists.controller.js";

import { checkJWT, wrapCtrl } from "../middlewares/index.js";

const router = express.Router();

router.use(checkJWT);
router.get("/", wrapCtrl(allListsCtrl));
router.post("/", wrapCtrl(addListCtrl));
router.delete("/:listId", wrapCtrl(removeListCtrl));

export { router as listsRouter };
