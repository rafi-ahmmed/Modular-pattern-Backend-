import { pool } from '../../db';
import bcrypt from 'bcrypt';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import config from '../../config';

const loginUserIntoDB = async (payload: {
   email: string;
   password: string;
}) => {
   const { email, password } = payload;
   // * Check if the user exiest
   // * compare the password
   // * Generate token

   const userData = await pool.query(
      `
      SELECT * FROM users WHERE email=$1
      
      `,
      [email]
   );

   if (userData.rows.length == 0) {
      throw new Error('Invalid Credentials!');
   }

   const user = userData.rows[0];
   // console.log(user);

   const matchPassword = await bcrypt.compare(password, user.password);
   if (!matchPassword) throw new Error('Invalid Credentials!');

   // Generate Token
   const jwtPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      is_active: user.is_active,
   };

   const accessToken = jwt.sign(jwtPayload, config.accessTknSecret as string, {
      expiresIn: '1d',
   });

   const refreshToken = jwt.sign(
      jwtPayload,
      config.refreshTknSecret as string,
      {
         expiresIn: '2d',
      }
   );
   // console.table({ accessToken, refreshToken });
   return { accessToken, refreshToken };
};

const generateAccessToken = async (token: string) => {
   //* Check is the token exist
   if (!token) {
      throw new Error('Unauthorized!!');
   }

   //* Check is the user is exist in db
   // ? Decode refresh token
   const decoded = jwt.verify(
      token,
      config.refreshTknSecret as string
   ) as JwtPayload;

   const userData = await pool.query(
      `
            SELECT * FROM users
            WHERE email=$1
         `,
      [decoded.email]
   );
   const user = userData.rows[0];

   //* Checking
   if (userData.rows.length === 0) {
      throw new Error('User not found');
   }

   //* check is the user status active or not
   if (user?.is_active === false) {
      throw new Error('Forbidden');
   }

   // Generate access Token
   const jwtPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      is_active: user.is_active,
   };

   const accessToken = jwt.sign(jwtPayload, config.accessTknSecret as string, {
      expiresIn: '2h',
   });

   return { accessToken };
};

export const authService = {
   loginUserIntoDB,
   generateAccessToken,
};
