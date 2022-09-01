import { Request, Response } from "express";
import Usuario from '../models/usuario.mdl';
import bcryptjs from 'bcryptjs';
import { generarJWT } from "../helpers/generarJWT";
import { Req } from '../helpers/interfaces';
import jwt from "jsonwebtoken";

export const login = async(req: Request, res: Response) => {

    const {correo, password} = req.body;

    if(!correo) {
        return res.status(400).json({
            ok: false,
            msg: 'No existe el correo'
        });
    }

    try {
        
        //Verificar si el correo existe
        const usuario = await Usuario.findOne({where: {correo}});
        
        if(!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ingresado no es correcto'
            });
        }

        
        //Verificar si el usuario está activo
        if(usuario.estado == 0){
            return res.status(400).json({
                ok: false,
                msg: 'El usuario se encuentra inactivo'
            });
        }

        //Verificar la contraseña
        const validarPassword = bcryptjs.compareSync(password, usuario.password)
        if(!validarPassword){
            return res.status(400).json({
                ok: false,
                msg: 'La contraseña es incorrecta'
            });
        }

        //Generar el JWT
        const token = await generarJWT(usuario.id!);


        return res.status(200).json({
            ok: true,
            id: usuario.id,
            rol: usuario?.rol,
            msg: 'login',
            correo,
            token
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el admin'
        })
    }

}

export const revalidarToken = async(req: Req, res: Response) => {

    const { usuario } = req;

    //Generar el JWT
    const token = await generarJWT(usuario!.id!);
    
    return res.json({
        ok: true,
        msg: "Renew",
        id: usuario?.id,
        rol: usuario?.rol,
        nombre: usuario?.nombre,
        correo: usuario?.correo,
        token
    })

}

export const verificarToken = async(req: Req, res: Response) => {

    let bool;

    const token = req.header('Authorization');

    if(!token) {
        return res.status(200).json({
            ok: false
        })
    }

    try {
        jwt.verify(token, process.env.SECRETORPRIVATEKEY!);
        bool = true;
    } catch (error) {
        bool = false;
    }
    
    return res.status(200).json({
        ok: bool
    })

}