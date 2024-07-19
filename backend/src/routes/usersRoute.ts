import express, { Request, Response } from "express";
import User from "../models/userModel";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";
const router = express.Router();

router.post(
  "/register",
  [
    check("firstname", "First name is required").isString(),
    check("lastname", "Last name is required").isString(),
    check("email", "Email is required").isEmail(),
    check("password", "Password should at least 6 character").isLength({
      min: 6,
    }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }
    try {
      let user = await User.findOne({
        email: req.body.email,
      });
      if (user) {
        return res.status(400).json({
          message: "Email already exists",
          success: false,
        });
      }
      user = new User(req.body);
      await user.save();

      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET_KEY as string,
        {
          expiresIn: "1d",
        }
      );
      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
      });
      return res.status(200).send({
        message: "User registered successfully",
        success: true,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Something went wrong during user registration",
        success: false,
      });
    }
  }
);

export default router;
