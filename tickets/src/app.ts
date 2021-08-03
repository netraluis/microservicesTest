import express, { Request, Response, NextFunction } from 'express';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError } from '@nltickets/common';

const app = express();
//app has been proxyed by ingress and gnex
app.set('trust proxy', true);

app.use(json())

app.use(
  cookieSession({
    // not encrypt the cookie
    signed: false,
    // only https request if is not test environment
    secure: process.env.NODE_ENV !== 'test'
  })
)


app.all('*', (req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError());
})
app.use(errorHandler)

export { app };