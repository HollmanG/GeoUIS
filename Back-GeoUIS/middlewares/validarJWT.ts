import { Response } from "express";
import jwt from "jsonwebtoken";
import { CustomPayload, Req } from "../helpers/interfaces";


export const validarJWT = (req: Req, res: Response, next: any) => {

    const token = req.header('Authorization');

    if(!token) {
        return res.status(401).json({msg: 'No hay token en la petición'});
    }

    try {

        const payload = jwt.verify(token, process.env.SECRETORPRIVATEKEY!);

        const decoded: CustomPayload = typeof payload === 'string'
        ? JSON.parse(payload)
        : payload;

        req.id = decoded.id;
        console.log(req.id);
        
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({msg: 'Token no válido'});
        
    }

    

}