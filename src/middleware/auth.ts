import type { NextFunction, Request, Response } from 'express';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { pool } from '../db';
import type { ROLES } from '../types';

const auth = (...roles: ROLES[]) => {
   return async (req: Request, res: Response, next: NextFunction) => {
      try {
         // console.log(roles);
         // console.log(req.headers.authorization);
         const token = req.headers.authorization;

         //* Check is the token exist
         if (!token) {
            return res.status(401).json({
               success: false,
               message: 'Unauthorized Access!',
            });
         }

         //* Check is the user is exist in db
         const decoded = jwt.verify(
            token,
            config.accessTknSecret as string
         ) as JwtPayload;

         console.log(decoded);

         const userData = await pool.query(
            `
            SELECT * FROM users
            WHERE email=$1
         `,
            [decoded.email]
         );
         const user = userData.rows[0];
         // console.log(user);
         //* Checking
         if (userData.rows.length === 0) {
            return res.status(404).json({
               success: false,
               message: 'User not found!',
            });
         }

         //* check is the user status active or not
         if (user.is_active === false) {
            return res.status(403).json({
               success: false,
               message: 'Forbidden!!',
            });
         }

         //* check is the user is an admin or agent or user
         if (roles.length && !roles.includes(user.role)) {
            return res.status(403).json({
               success: false,
               message: 'Not authorized!!',
            });
         }

         req.user = decoded; //req:{user:{}}
         next();
      } catch (error) {
         next(error); //! TODO something
      }
   };
};

export default auth;
