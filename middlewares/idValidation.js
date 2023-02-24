import { isValidObjectId } from "mongoose";
import { CustomError } from "../helpers/errors.js";

const idValidation = (req, _, next) => {
  const { cardId } = req.params;
  const { listId } = req.params;

  const resultCard = isValidObjectId(cardId);
  const resultList = isValidObjectId(listId);

  if (!resultCard && !resultList) {
    next(new CustomError("Invalid id format"));
  }
  next();
};

export { idValidation };
