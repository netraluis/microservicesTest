import express, { Request, Response, NextFunction } from "express";
import { body } from "express-validator";
import jwt from 'jsonwebtoken';
import { validateRequest, BadRequestError } from '@nltickets/common'

import { User } from "../models/user";
import { Password } from "../services/password";

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must ve valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You must supply a password"),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    // check if any user in db has this email
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      // generic error to not give clues to hackers
      return next(new BadRequestError("Invalid credentials"));
    }

    // compare hashed password from db with the input password
    const passwordsMatch = await Password.compare(existingUser.password, password);
 
    if (!passwordsMatch) {
      // generic error to not give clues to hackers
      return next(new BadRequestError("Invalid credentials"));
    }

    // generta Jwt
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      // already is checked in index.js
      process.env.JWT_KEY!
    );

    // Store it on session object
    req.session = {
      jwt: userJwt,
    };

    res.status(200).send(existingUser);
  }
);

export { router as signinRouter };
