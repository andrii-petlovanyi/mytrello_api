import express from "express";

const router = express.Router();

router.post("/login", (req, res, next) => {
  res.status(200).json({ message: "Login route" });
});
router.post("/register", (req, res, next) => {
  res.status(200).json({ message: "Register route" });
});
router.post("/current", (req, res, next) => {
  res.status(200).json({ message: "Current route" });
});

export { router as usersRouter };
