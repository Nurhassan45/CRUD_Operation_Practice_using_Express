import bcrypt from "bcryptjs";
import { pool } from "../../db";
import jwt, { type JwtPayload } from 'jsonwebtoken';
import config from "../../config";
import { error } from "node:console";
const loginIntoDB = async (payload: { email: string, password: string }) => {
    try {
        const { email, password } = payload;
        const user = await pool.query(`
   SELECT * FROM users WHERE email=$1 
    `, [email]);
        if (user.rows.length === 0) throw new Error("User Not Exist");
        const userData = user.rows[0];
        const matchPassword = await bcrypt.compare(password, userData.password);
        if (!matchPassword) throw new Error('Password does not match!');
        const { id, name, is_active } = userData;
        const jwtPayload = {
            id: id,
            name: name,
            email: userData.email,
            password: userData.password,
            role: userData.role,
            is_active: is_active
        }
        //generate jsonwebtoken     
        const accessToken = jwt.sign(jwtPayload, config.jwtSecret as string, { expiresIn: '1d' });
        const RefreshToken = jwt.sign(jwtPayload, config.jwtRefreshSecret as string, { expiresIn: '10d' });
        return { accessToken, RefreshToken };

    } catch (error) {
        console.log('error from authService', error);
    }
}

const generateRefreshToken = async (token: string) => {
    try {
        if (!token) throw new Error('Unauthorize Access !');
        const decoded = jwt.verify(token as string, config.jwtRefreshSecret as string) as JwtPayload;
        const userData = await pool.query(`
            SELECT * FROM users WHERE email=$1
            `, [decoded.email]);
        if (userData.rows.length === 0) throw new Error('Unauthorize access!!');
        const user = userData.rows[0];
        if (!user.is_active) throw new Error('User Not Active');
        const { id, name, is_active } = user;

        const jwtPayload = {
            id: id,
            name: name,
            email: user.email,
            password: user.password,
            role: user.role,
            is_active: is_active
        }
        //generate jsonwebtoken     
        const accessToken = jwt.sign(jwtPayload, config.jwtSecret as string, { expiresIn: '1d' });
        return {accessToken};
    } catch (error) {

    }
}

export const authService = {
    loginIntoDB,
    generateRefreshToken
}