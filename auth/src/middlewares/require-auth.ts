import { Request, Response, NextFunction } from "express";

import { NotAuthorizedError } from '../errors/not-authorized-errors';

// currentUser has to be always run before requireAuth
export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if(!req.currentUser){
    return next(new NotAuthorizedError());
  }

  next();
};
