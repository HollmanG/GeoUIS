import { Request, Response } from "express";
import Usuario from "../models/usuario.mdl";
import bcryptjs from 'bcryptjs';
import { generarJWT } from "../helpers/generarJWT";

export const login = async(req: Request, res: Response) => {

    const {correo , password} = req.body;

    if(!correo) {
        return res.status(400).json({
            msg: 'No existe el correo'
        });
    }

    try {
        
        //Verificar si el correo existe
        const usuario = await Usuario.findOne({where: {correo}});
        
        if(!usuario) {
            return res.status(400).json({
                msg: 'El correo ingresado no es correcto'
            });
        }

        
        //Verificar si el usuario está activo
        if(usuario.estado == 0){
            return res.status(400).json({
                msg: 'El usuario se encuentra inactivo'
            });
        }

        //Verificar la contraseña
        const validarPassword = bcryptjs.compareSync(password, usuario.password)
        if(!validarPassword){
            return res.status(400).json({
                msg: 'La contraseña es incorrecta'
            });
        }

        //Generar el JWT
        const token = await generarJWT(usuario.id!);


        return res.status(200).json({
            msg: 'login',
            correo,
            token
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Comuniquese con el admin'
        })
    }

}
