import type { Request, Response } from "express";
import ResMsg from "../../Utility/ResMsg";
import adminService from "./admin.service"

//post Operation 
const postAdmin = async (req: Request, res: Response) => {
    try {
        const result = await adminService.postAdminIntoDB(req.body);
        if (result.rowCount === 0) ResMsg(res, 400, false, 'Unsuccessful Operation!');
        ResMsg(res, 200, true, 'Successfull Operation', result.rows[0]);
    } catch (error: any) {
        ResMsg(res, 400, true, error.message);
    }
}

const getAdmin = async (req: Request, res: Response) => {
    try {
        const result = await adminService.getAdminFromDB();
        if (result.rowCount === 0) ResMsg(res, 400, false, 'Unsuccessful Operation!');
        ResMsg(res, 200, true, 'Successfull Operation', result.rows);
    } catch (error: any) {
        ResMsg(res, 400, true, error.message);
    }
}

const getAdminById = async (req: Request, res: Response) => {
    try {
        const numberId = Number(req.params.id);
        const result = await adminService.getAdminByIdFromDB(numberId);
        if (result.rowCount === 0) ResMsg(res, 400, false, 'Unsuccessful Operation!');
        ResMsg(res, 200, true, 'Successfull Operation', result.rows[0]);
    } catch (error: any) {
        ResMsg(res, 400, true, error.message);
    }
}

const updateAdminById = async (req: Request, res: Response) => {
    try {
        const numberId = Number(req.params.id);
        const result = await adminService.updateAdminById(req.body, numberId);

        if (result.rowCount === 0) ResMsg(res, 400, false, 'Unsuccessful Operation!');
        ResMsg(res, 200, true, 'Successfull Operation', result.rows[0]);
    } catch (error:any) {
        ResMsg(res, 400, true, error.message);

    }
}

const deleteAdmin=async(req:Request,res:Response)=>{
    try {
        const numberId = Number(req.params.id);
        const result = await adminService.deleteAdminFromDB(numberId);
        if (result.rowCount === 0) ResMsg(res, 400, false, 'Unsuccessful Operation!');
        ResMsg(res, 200, true, 'Successfull Operation');
    } catch (error:any) {
        ResMsg(res, 400, true, error.message);
        
    }
}
const adminControllar = {
    postAdmin,
    getAdmin,
    getAdminById,
    updateAdminById,
    deleteAdmin

}

export default adminControllar;