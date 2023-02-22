import { ConflictError } from "../helpers/errors.js";
import { generateJWT } from "../helpers/generateJWT.js";
import { User } from "../models/user.model.js";

const login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user || !user.comparePassword(password))
    throw new NotAuthorizedError("Email or password is wrong");

  const accessToken = generateJWT(user);
  const { name } = user;
  await User.findByIdAndUpdate(user._id, { accessToken });

  return { name, email, accessToken };
};

const register = async ({ email, password, name }) => {
  const user = await User.findOne({ email });
  if (user) throw new ConflictError(`User with email ${email} is registered`);

  const newUser = new User({ name, email });
  newUser.setPassword(password);

  const token = generateJWT(newUser);
  newUser.setToken(token);

  await newUser.save();

  const updated = newUser.toObject();
  delete updated.password;

  return updated;
};

export { login, register };
