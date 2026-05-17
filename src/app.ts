import express, {
   type Application,
   type Request,
   type Response,
} from 'express';
import { userRoute } from './modules/user/user.route';
import { profileRouter } from './modules/profile/profile.route';
import { authRouter } from './modules/auth/auth.route';
import fs from 'fs';
import logger from './middleware/logger';

const app: Application = express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
//* Logger Middleware
app.use(logger);

app.get('/', (req: Request, res: Response) => {
   // res.send('Express server!!');
   res.status(200).json({
      message: 'Express server',
      author: 'Next lavel',
   });
});

app.use('/api/users', userRoute);
app.use('/api/profile', profileRouter);
app.use('/api/auth', authRouter);

export default app;
