import express from "express";
import {
  addCardCtrl,
  deleteCardCtrl,
  moveCardCtrl,
  updateCardCtrl,
} from "../controllers/cards.controller.js";
import { idValidation } from "../middlewares/idValidation.js";

import { checkJWT, wrapCtrl } from "../middlewares/index.js";

const router = express.Router();

router.use(checkJWT);
router.post("/", wrapCtrl(addCardCtrl));
router.delete("/", wrapCtrl(deleteCardCtrl));
router.patch("/:cardId", idValidation, wrapCtrl(updateCardCtrl));
router.put("/move", wrapCtrl(moveCardCtrl));

export { router as cardsRouter };
