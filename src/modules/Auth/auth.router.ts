import { Router } from "express";
import { authControllar } from "./auth.controllar";

const router=Router();
router.post('/login',authControllar.loginUser);
router.post('/refreshToken',authControllar.refreshToken)
export const authRouter=router;