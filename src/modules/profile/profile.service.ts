import { pool } from '../../db';

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

export const profileService = {
   createProfileInDB,
};
