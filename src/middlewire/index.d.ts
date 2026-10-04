import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      // Replace 'JwtPayload' with your specific User type if you have one
      user?: string | JwtPayload; 
    }
  }
}
