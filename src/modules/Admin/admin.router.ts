import { Router } from "express";
import adminControllar from "./admin.controllar";

const router = Router();
//Post Operation 
router.post('/',adminControllar.postAdmin);
//getOperation
router.get('/',adminControllar.getAdmin);
//getOperation By id
router.get('/:id',adminControllar.getAdminById)
//updateOperationById
router.put('/:id',adminControllar.updateAdminById)
//deleteOperationById
router.delete('/:id',adminControllar.deleteAdmin);
const adminRouter=router;
export default adminRouter;