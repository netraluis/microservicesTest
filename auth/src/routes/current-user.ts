import express, { Request, Response, NextFunction } from 'express';

import { currentUser } from '../middlewares/current-user';
import { requireAuth } from '../middlewares/require-auth';

const router = express.Router();

router.get(
  "/api/users/currentuser",
  currentUser,
  // requireAuth is commented maybe some routes can be accesed without beeing log in
  // requireAuth,
  (req: Request, res: Response, next: NextFunction) => {
    res.send({ currentuser: req.currentUser || null });
  }
);

export { router as currentUserRouter };
