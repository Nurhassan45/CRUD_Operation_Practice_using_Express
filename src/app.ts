import express, { type Application, type Request, type Response } from 'express'
import { Pool } from 'pg'
import fs from 'fs';
import config from './config';
import {  pool } from './db';
import userRouter from './modules/Users/user.router';
import adminRouter from './modules/Admin/admin.router';
import { authRouter } from './modules/Auth/auth.router';
import logger from './middlewire/logger';
import cookieParser  from 'cookie-parser'
import cors from 'cors';
import globalErrorHandler from './middlewire/globalErrorHandelr';
const app: Application = express()
app.use(cookieParser() )
app.use(express.json());
app.use(logger);
//cors use section 
const corsOptions = {
  origin: 'http://localhost:5000',
}

app.use(cors(corsOptions))
//User Section
app.use('/api/users',userRouter);
//Admin Section 
app.use('/api/admin',adminRouter);
//Auth Section
app.use('/api/auth',authRouter);
//Global Error Handler 
app.use(globalErrorHandler);

export default app;