
import bcrypt from 'bcrypt';
import type { IProfile } from './profile.interface.js';
import { pool } from '../../db/index.js';

const createProfileInDB = async (payload: any) => {
   const { user_id, boi, address, phone, gender } = payload;
   console.log(payload);

   // First check is the user is exiest
   const user = await pool.query(
      `
         SELECT * FROM users 
         WHERE id=$1
      `,
      [user_id]
   );

   if (user.rows.length === 0) {
      throw new Error('User not exists!');
   }

   const result = await pool.query(
      `

      INSERT INTO profiles(user_id, bio, address, phone, gender) 
      VALUES($1,$2,$3,$4,$5)
      RETURNING *
      
      `,
      [user_id, boi, address, phone, gender]
   );
   return result;
   // console.log(user.rows[0]);
};

const getAllProfileFromDB = async () => {
   const result = await pool.query(`
         SELECT * FROM profiles
      `);
   // console.log(result.rows);
   return result.rows;
};

const getSingleProfileFromDB = async (id: string) => {
   const result = await pool.query(
      `
         SELECT * FROM profiles
         WHERE user_id=$1
      `,
      [id]
   );
   console.log(result.rows[0]);
   return result.rows[0];
};

const updateProfileIntoDB = async (payload: IProfile, userId: string) => {
   const { bio, address, gender, phone, password } = payload;
   // *first check profile is exist
   // * check is password is correct
   // * Update profile
   const profile = await pool.query(
      `
         SELECT * FROM profiles
         WHERE user_id=$1
      `,
      [userId]
   );

   if (profile.rows.length === 0) {
      throw new Error('Profile not found. Create your profile first');
   }

   // Check password
   const user = await pool.query(
      `
         SELECT * FROM users
         WHERE id=$1
      `,
      [userId]
   );

   const isPasswordCorrect = await bcrypt.compare(
      password,
      user.rows[0].password
   );
   console.log(isPasswordCorrect);
   if (!isPasswordCorrect) {
      throw new Error('Your Password is incorrect!');
   }

   const result = await pool.query(
      `
         UPDATE profiles 
         SET
         bio=COALESCE($1,bio),
         address=COALESCE($2,address),
         phone=COALESCE($3,phone),
         gender=COALESCE($4,gender)

         WHERE user_id=$5
         RETURNING *

      `,
      [bio, address, phone, gender, userId]
   );

   return result.rows[0];
   // console.log(result.rows[0]);
};

export const profileService = {
   createProfileInDB,
   getAllProfileFromDB,
   getSingleProfileFromDB,
   updateProfileIntoDB,
};
