import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface UserPayload {
  id: string;
  email: string;
}

// enter into a existing type definition and make a modification adding currentUser
declare global{
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // in index.ts with cookieSession req.session is created
  // !req.session || !req.session.jwt equal to !req.session?.jwt
  if (!req.session?.jwt) {
    return next();
  }

  try {
    // Is ensure in index that JWT_KEY is defined
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload;
    req.currentUser = payload;
    res.send({ currentuser: payload });
  } catch (err) {
    // in the process verifiyng the token with jwt will give an error in case the jwt is incorrect
    res.send({ currentuser: null });
  }
};
