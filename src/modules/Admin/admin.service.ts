import { pool } from "../../db"

//Post Operation 
const postAdminIntoDB=async(payload:any)=>{
const {name,email,password}=payload;
const result = await pool.query(`
  INSERT INTO admin (name,email,password) values ($1,$2,$3) RETURNING *  
    `,[name,email,password]);
return result;
}

const getAdminFromDB=async()=>{
    const result = await pool.query(`
       SELECT * FROM admin 
        `)
    return result;
}

const getAdminByIdFromDB=async(id:number)=>{
    const result = await pool.query(`
    SELECT * FROM admin WHERE id=$1    
        `,[id]);
    return result ;
} 

const updateAdminById=async(payload:any,id:number)=>{
    const{name,email,password}=payload;
    const result = await pool.query(`
        UPDATE admin SET name=$1,email=$2,password=$3 WHERE id=$4 RETURNING *
        `,[name,email,password,id]);
    return result;
}

const deleteAdminFromDB=async(id:number)=>{
    const result = await pool.query(`
       DELETE FROM admin WHERE id=$1 
        `,[id]);
        return result ;
}
const adminService={
    postAdminIntoDB,
    getAdminFromDB,
    getAdminByIdFromDB,
    updateAdminById,
    deleteAdminFromDB
}

export default adminService;