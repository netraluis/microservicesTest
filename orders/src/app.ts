import express, { Request, Response, NextFunction } from 'express';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from '@nltickets/common'

import { createOrderRouter } from './routes/new';
import { showOrderRouter } from './routes/show';
import { indexOrderRouter } from './routes/index'
import { deleteOrderRouter } from './routes/delete'


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

app.use(currentUser);

app.use(showOrderRouter);
app.use(createOrderRouter);
app.use(indexOrderRouter);
app.use(deleteOrderRouter);

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError());
})
app.use(errorHandler);

export { app };