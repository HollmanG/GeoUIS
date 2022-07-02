import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface CustomPayload extends JwtPayload {
    id: number
}

export interface Req extends Request {
    id?: number
  }