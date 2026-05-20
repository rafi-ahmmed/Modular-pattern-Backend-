import express, {
   type Application,
   type NextFunction,
   type Request,
   type Response,
} from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import logger from './middleware/logger.js';
import { userRoute } from './modules/user/user.route.js';
import { profileRouter } from './modules/profile/profile.route.js';
import { authRouter } from './modules/auth/auth.route.js';
import globalErrHandler from './middleware/globalErrorHandler.js';

const app: Application = express();

const corsOptions = {
   origin: 'http://localhost:5000',
};
app.use(cookieParser());
app.use(cors(corsOptions));
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

// ? Global error handler middleware
app.use(globalErrHandler);

export default app;
