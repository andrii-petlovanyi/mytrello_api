import { login, register } from "../services/users.services.js";

const loginCtrl = async (req, res) => {
  const body = req.body;

  const user = await login(body);

  res.status(200).json({
    message: "You are login successfully!",
    user,
  });
};

const registerCtrl = async (req, res) => {
  const body = req.body;

  const user = await register(body);

  res.status(201).json({
    message: "You are registered successfully!",
    user,
  });
};

const currentUserCtrl = async (req, res) => {
  const user = req.user.toObject();
  delete user.password;

  res.status(200).json({
    user,
  });
};

export { loginCtrl, registerCtrl, currentUserCtrl };
