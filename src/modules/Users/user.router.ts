import { Router } from "express";
import userControllar from "./user.controllar";
import auth from "../../middlewire/auth";
import { UserRole } from "../../types";

const router=Router();


//Get Operation 
router.get('/',auth(UserRole.admin,UserRole.agent), userControllar.getUsers)
//get operation by id
router.get('/:id',userControllar.getUserById);
//post operation
router.post('/',userControllar.postUser);
//Update Operation
router.put('/:id',userControllar.updateUser);
//Delete Operation
router.delete('/:id',userControllar.deleteUser);
const userRouter=router;
export default userRouter;