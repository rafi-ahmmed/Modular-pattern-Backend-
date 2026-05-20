import dotenv from 'dotenv';
import path from 'path';
dotenv.config({
    path: path.join(process.cwd(), '.env'),
});
const config = {
    connection_string: process.env.CONNECTION_STRING,
    port: process.env.PORT,
    accessTknSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
    refreshTknSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
    refreshTokExpTime: process.env.REFRESH_TOK_EXPIRE_TIME,
    accessTokExpTime: process.env.ACCESS_TOK_EXPIRE_TIME,
};
export default config;
