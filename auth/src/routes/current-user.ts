import express, { Request, Response, NextFunction } from 'express';

import { currentUser } from '../middlewares/current-user';
import { requireAuth } from '../middlewares/require-auth';

const router = express.Router();

router.get(
  "/api/users/currentuser",
  currentUser,
  requireAuth,
  (req: Request, res: Response, next: NextFunction) => {
    res.send({ currentuser: req.currentUser || null });
  }
);

export { router as currentUserRouter };
