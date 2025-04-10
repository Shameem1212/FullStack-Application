import { Router, Request, Response } from "express";
import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const login = async (req: Request, res: Response) => {
  // TODO(complete): If the user exists and the password is correct, return a JWT token
  const { username, password } = req.body;
  console.log("server-login-req.body", username, password);
  if (username === undefined || password === undefined)
    return res
      .status(400)
      .json({ message: "missing username and/or password" });
  try {
    const user = await User.findOne({ where: { username } });
    if (!user)
      return res.status(401).json({ message: "username or password invalid" });
    const passwordIsCorrect = await bcrypt.compare(password, user.password);
    if (!passwordIsCorrect)
      return res
        .status(400)
        .json({ message: "missing username and/or password" });
    const jwtToken = jwt.sign(
      { username: user.username },
      process.env.JWT_SECRET_KEY || "",
      { expiresIn: "1h" }
    );
    console.log("server-jwtToken", jwtToken);
    return res.json({ jwtToken });
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
};

const router = Router();

// POST /login - Login a user
router.post("/login", login);

export default router;
