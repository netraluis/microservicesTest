import express, { Request, Response, NextFunction } from 'express';
import { json } from 'body-parser';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const app = express();
//app has been proxyed by ingress and gnex
app.set('trust proxy', true);

app.use(json())

app.use(
  cookieSession({
    // not encrypt the cookie
    signed: false,
    // only https request
    secure: true
  })
)

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.all('*', (req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError());
})
app.use(errorHandler)

const start = async () => {
  if(!process.env.JWT_KEY){
    throw new Error('JWT_KEY must be defined')
  }

  try{
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
      useNewUrlParser: true,
      useFindAndModify: true,
      useCreateIndex: true
    })

    console.log('connected to mongoDb')
  }catch(err){
    console.error(err)
  }
}

start()

app.listen(3000, ()=>{
  console.log('Listening in port 3000!!!!!!!!!')
});