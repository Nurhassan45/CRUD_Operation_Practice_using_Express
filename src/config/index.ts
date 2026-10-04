import dotenv from 'dotenv'
import type { SignOptions } from 'jsonwebtoken';
import path from 'path'
dotenv.config({
    path:path.join(process.cwd(),'.env'),
})
const config ={
    connection_string:process.env.CONNECTION_STRING  as string,
    port:process.env.PORT,
    jwtSecret:process.env.JWTSECREAT,
    jwtRefreshSecret:process.env.JWTREFRESHSECREAT,
    accessTokenExpireTime:process.env.ACCESSTOKENEXPIRETIME ,
    refreshTokenExpireTime:process.env.REFRESHTOKENEXPIRETIME
}
export default config;