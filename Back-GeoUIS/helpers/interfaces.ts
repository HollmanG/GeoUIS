import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { UsuarioInterface } from "../models/usuario.mdl";

export interface CustomPayload extends JwtPayload {
    id: number
}

export interface Req extends Request {
    usuario?: UsuarioInterface
  }