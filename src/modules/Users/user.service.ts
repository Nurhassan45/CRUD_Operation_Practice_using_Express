import bcrypt from "bcryptjs";
import { pool } from "../../db"
import type { Iuser } from "./user.interface";
import { error } from "node:console";
import ResMsg from "../../Utility/ResMsg";

const getUsersFromDB=async()=>{
     const result = await pool.query(`
        SELECT * FROM users
        `)
    result.rows.forEach(user=>delete user.password)
    return result ;
}

const getUserFromDBbyeId=async(id:number)=>{
      const result = await pool.query(`
  SELECT * FROM users WHERE id=$1 
  `, [id]);
  delete result.rows[0].password
  return result;
}

const postUserIntoDB=async(payload:Iuser)=>{
      try {
         const{name,email,password,role}=payload;
       if(role&& !['admin','agent','user'].includes(role)) throw new Error('Invalid Role');
       const hashPassword=await bcrypt.hash(password,6);
       const result = await pool.query(`
       INSERT INTO users (name , email, password,role) VALUES ( $1,$2,$3 ,COALESCE($4,'user')) RETURNING *
    `, [name, email, hashPassword,role]);
    delete result.rows[0].password;
    return result;
      } catch (error:any) {
       throw new Error(error)
      }
}

const updateUserByIdFromDB=async(payload:Iuser,id:number)=>{
     const{name,email}=payload;
  const result= await pool.query(`
   UPDATE users SET name=$1, email=$2 WHERE id=$3 RETURNING *
    `,[name,email,id])
    return result;
}

const deleteUserFromDB=async(id:number)=>{
    const result = await pool.query(`
       DELETE FROM users WHERE id=$1 
        `,[id]);
    return result;
}
export  const userService={
    getUsersFromDB,
    getUserFromDBbyeId,
    postUserIntoDB,
    updateUserByIdFromDB,
    deleteUserFromDB
}