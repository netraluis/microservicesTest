import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get(
  "/api/users/currentuser",
  (req: Request, res: Response, next: NextFunction) => {
    // in index.ts with cookieSession req.session is created
    // !req.session || !req.session.jwt equal to !req.session?.jwt
    if (!req.session?.jwt) {
      return res.send({ currentuser: null });
    }

    try{
      // Is ensure in index that JWT_KEY is defined
      const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!);
      res.send({ currentuser: payload })
    }catch(err){
      // in the process verifiyng the token with jwt will give an error in case the jwt is incorrect
      res.send({ currentuser: null });
    }
  }
);

export { router as currentUserRouter };
