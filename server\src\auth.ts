import bcrypt from "bcrypt"; import jwt from "jsonwebtoken"; import { Request, Response, NextFunction } from "express";
export type AuthUser={id:string;role:"USER"|"ADMIN"}; const secret=()=>{const value=process.env.JWT_SECRET;if(!value) throw new Error("JWT_SECRET is required");return value};
export const hashPassword=(password:string)=>bcrypt.hash(password,12); export const matchesPassword=(password:string,hash:string)=>bcrypt.compare(password,hash);
export const issueAccessToken=(user:AuthUser)=>jwt.sign(user,secret(),{expiresIn:"15m"});
export function requireAuth(req:Request,res:Response,next:NextFunction){try{const token=req.headers.authorization?.replace("Bearer ","");if(!token)return res.status(401).json({error:"Authentication required"});(req as Request & {user:AuthUser}).user=jwt.verify(token,secret()) as AuthUser;next()}catch{return res.status(401).json({error:"Invalid or expired access token"})}}
export const requireRole=(role:AuthUser["role"])=>(req:Request,res:Response,next:NextFunction)=>{const user=(req as Request & {user?:AuthUser}).user;return user?.role===role?next():res.status(403).json({error:"Insufficient permissions"})};
