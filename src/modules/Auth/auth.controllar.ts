import type { Request, Response } from "express"
import { authService } from "./auth.service"
import ResMsg from "../../Utility/ResMsg";
import type { JwtPayload } from "jsonwebtoken";

const loginUser=async(req:Request,res:Response)=>{
    try {
        const result = await authService.loginIntoDB(req.body) as JwtPayload;
        const {RefreshToken}=result;
        res.cookie('refreshToken',RefreshToken,{
            secure:false,
            httpOnly:true,
            sameSite:"lax"
        })        
        ResMsg(res,200,true,'operation successfully',result);
    } catch (error) {
        ResMsg(res,400,false,'operation unsuccessful');

    }
}

const refreshToken=async(req:Request,res:Response)=>{
 try {
        const result = await authService.generateRefreshToken(req.cookies.refreshToken) ;
        console.log('from authcontrollar',result)
        ResMsg(res,200,true,'operation successfully',result);
    } catch (error) {
        ResMsg(res,400,false,'operation unsuccessful');

    }
}
export const authControllar={
    loginUser,
    refreshToken
}