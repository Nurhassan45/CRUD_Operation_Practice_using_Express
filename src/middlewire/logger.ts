import type { NextFunction, Request, Response } from "express";
import fs from 'fs';
const logger=(req:Request, res:Response, next:NextFunction) => {
  const log=`\nURL -> ${req.url} Method -> ${req.method}\n`;
  fs.appendFile('logger.txt',log,(err:any)=>{});
  next();
}

export default logger;