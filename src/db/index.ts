import { Pool } from 'pg';
import config from '../config/index.js';


export const pool = new Pool({
   connectionString: config.connection_string,
});

export const initDB = async () => {
   try {
      await pool.query(`
            CREATE TABLE IF NOT EXISTS users(
               id SERIAL PRIMARY KEY,
               name VARCHAR(20),
               email VARCHAR(20) UNIQUE NOT NULL,
               password TEXT NOT NULL,
               is_active BOOLEAN DEFAULT true,
               AGE INT,
               role VARCHAR(10) DEFAULT 'user' CHECK(role IN ('admin','user','agent')),

               created_at TIMESTAMP DEFAULT NOW(),
               updated_at TIMESTAMP DEFAULT NOW()
            )
         `);

      await pool.query(`
         
            CREATE TABLE IF NOT EXISTS profiles(
               id SERIAL PRIMARY KEY,
               user_id INT UNIQUE REFERENCES users(id) ON DELETE CASCADE,
               bio TEXT,
               address TEXT,
               phone VARCHAR(15),
               gender VARCHAR(8),

               created_at TIMESTAMP DEFAULT NOW(),
               updated_at TIMESTAMP DEFAULT NOW()
            )
         `);

      console.log({ DB_CONNECTION_Message: 'Successfully Connected' });
   } catch (error) {
      console.log(error);
   }
};
