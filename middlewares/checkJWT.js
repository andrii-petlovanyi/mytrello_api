import jwt from "jsonwebtoken";
import { NotAuthorizedError } from "../helpers/errors.js";
import { User } from "../models/user.model.js";
import dotenv from "dotenv";

dotenv.config();
const { JWT_SECRET_KEY } = process.env;

const checkJWT = async (req, _, next) => {
  const [bearer, token] = req.headers.authorization?.split(" ") ?? [];
  try {
    if (bearer !== "Bearer") {
      throw new NotAuthorizedError("Wrong params bearer! Not authorized");
    }
    const { id } = jwt.verify(token, JWT_SECRET_KEY);
    const user = await User.findById(id);
    if (!user || user.accessToken !== token) {
      throw new NotAuthorizedError("Not authorized");
    }

    req.user = user;
    next();
  } catch (error) {
    next(new NotAuthorizedError(error.message));
  }
};

export { checkJWT };
