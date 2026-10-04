import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from 'jsonwebtoken'
import ResMsg from "../Utility/ResMsg";
import config from "../config";
import { pool } from "../db";
import type { Roletype } from "../types";

const auth=(...roles:Roletype[])=>{
    return async(req:Request,res:Response,next:NextFunction)=>{
       try {
         const token= req.headers.authorization;
        if(!token) ResMsg(res,201,false,'Unauthorize access!!');
        const decoded= jwt.verify(token as string,config.jwtSecret as string) as JwtPayload;
        const userData= await pool.query(`
            SELECT * FROM users WHERE email=$1
            `,[decoded.email]);
        if(userData.rows.length===0)  ResMsg(res,404,false,'Unauthorize access!!');
        const user = userData.rows[0];
        if(!user.is_active)  ResMsg(res,404,false,'User Not active!!');

        if(roles.length && !roles.includes(user.role)) ResMsg(res,404,false,'This role cant access!!');
        req.user=decoded;
        next();
       } catch (error) {
        next(error);
       }
    }
}

export default auth;