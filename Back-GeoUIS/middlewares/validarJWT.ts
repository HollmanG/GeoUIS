import { Response } from "express";
import jwt from "jsonwebtoken";
import { CustomPayload, Req } from "../helpers/interfaces";
import Usuario from "../models/usuario.mdl";


export const validarJWT = async(req: Req, res: Response, next: any) => {

    const token = req.header('Authorization');

    if(!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }

    try {

        const payload = jwt.verify(token, process.env.SECRETORPRIVATEKEY!);
        
        const decoded: CustomPayload = typeof payload === 'string'
        ? JSON.parse(payload)
        : payload

        const usuario = await Usuario.findByPk(decoded.id);

        if(!usuario) {
            return res.status(401).json({
                ok: false,
                msg: 'Token no válido - usuario no existe en DB'
            });
        }

        if(!usuario!.estado) {
            return res.status(401).json({
                ok: false,
                msg: 'Token no válido'
            });
        }

        req.usuario = usuario!;
        
        next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
        
    }

    

}