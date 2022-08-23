import { Response } from "express";
import { Req } from "../helpers/interfaces";

export const esAdmin = (req: Req, res: Response, next: any) => {

    if(!req.usuario) {
        return res.status(500).json({
            ok: false,
            msg: 'Se quiere validar el rol sin verificar antes el token'
        });
    }

    const {rol, nombre} = req.usuario;

    if(rol !== 2 && rol !== 4) {
        return res.status(401).json({
            ok: false,
            msg: `${nombre} no es administrador - No puede realizar esta acción`
        });
    }

    next();

}

export const puedePrestar = (req: Req, res: Response, next: any) => {

    if(!req.usuario) {
        return res.status(500).json({
            ok: false,
            msg: 'Se quiere validar el rol sin verificar antes el token'
        });
    }

    const {rol} = req.usuario;

    if(rol !== 2 && rol !== 4 && rol !== 1) {
        return res.status(401).json({
            ok: false,
            msg: `No puede realizar esta acción`
        });
    }

    next();

}