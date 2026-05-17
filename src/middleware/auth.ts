import type { NextFunction, Request, Response } from 'express';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { pool } from '../db';

const auth = () => {
   return async (req: Request, res: Response, next: NextFunction) => {
      // console.log('This is protected route');
      console.log(req.headers.authorization);
      const token = req.headers.authorization;

      if (!token) {
         return res.status(401).json({
            success: false,
            message: 'Unauthorized Access!',
         });
      }

      const decode = jwt.verify(token, config.secret as string) as JwtPayload;

      // console.log(decode);

      const userData = await pool.query(
         `
            SELECT * FROM users
            WHERE email=$1
         `,
         [decode.email]
      );
      const user = userData.rows[0];
      console.log(user);

      if (userData.rows.length === 0) {
         return res.status(404).json({
            success: false,
            message: 'User not found!',
         });
      }

      if (user.is_active === false) {
         return res.status(403).json({
            success: false,
            message: 'Forbidden!!',
         });
      }

      next();
   };
};

export default auth;
