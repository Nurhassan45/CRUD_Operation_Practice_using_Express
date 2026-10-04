import type { Request, Response } from "express"
import { pool } from "../../db"
import { userService } from "./user.service"
import ResMsg from "../../Utility/ResMsg"

const getUsers= async (req: Request, res: Response) => {
  try {
    const result = await userService.getUsersFromDB()
    ResMsg(res,200,true,"SuccessFully Retrive",result.rows)
   
  } catch (error: any) {
    ResMsg(res,404,false,error.message)
  }
}

const getUserById=async(req:Request,res:Response)=>{
    try {
        const {id}=req.params;
        const numberId=Number(id);
        const result= await userService.getUserFromDBbyeId(numberId )
        if(result.rowCount===0) ResMsg(res,404,false,'Invalid Input')
        ResMsg(res,200,true,"SuccessFully Retrive",result.rows)}
         catch (error:any) { ResMsg(res,404,false,error.message) }
}

const postUser=async(req:Request,res:Response)=>{
    try {
        const result= await userService.postUserIntoDB(req.body);
        if(result.rowCount===0) ResMsg(res,404,false,'Unsuccessfull post Operation')
        ResMsg(res,200,true,"SuccessFully post operation",result.rows)
        

    } catch (error:any) {
         ResMsg(res,404,false,error.message)
    }
}

const updateUser=async(req:Request,res:Response)=>{
    try {
        const numberId=Number(req.params.id);
        const result =await userService.updateUserByIdFromDB(req.body,numberId)
        if(result.rowCount===0) ResMsg(res,400,false,'Updated Operation Fail!');
        ResMsg(res,200,true,'Updated Operation Successfully',result.rows[0]);
    } catch (error:any) {
        ResMsg(res,400,false,error.message);
    }
}

const deleteUser=async(req:Request,res:Response)=>{
 try {
    const numberId=Number(req.params.id);
    const result = await userService.deleteUserFromDB(numberId);
    if(result.rowCount===0) ResMsg(res,400,false,'Invalid Input ');
    ResMsg(res,200,true,'Delete Operation Successfully');
 } catch (error:any) {
    ResMsg(res,400,false,error.message);
    }

}

const userControllar={
    getUsers,
    getUserById,
    postUser,
    updateUser,
    deleteUser
}

export default userControllar