import { Request, Response } from "express";
import Usuario from "../models/usuario.mdl";
import bcryptjs from "bcryptjs";
import {  } from "express-validator";
import { Req } from "../helpers/interfaces";

export const getUsuarios = async(req: Request, res: Response) => {

    const usuarios = await Usuario.findAll();

    return res.json({
        msg: 'getUsuarios',
        usuarios
    })
}

export const getUsuario = async(req: Request, res: Response) => {
    
    const {id} = req.params;

    const usuario = await Usuario.findByPk(id);

    return res.json({
        msg: 'getUsuario',
        usuario
    })
}

export const postUsuario = async(req: Request, res: Response) => {
    
    const {correo, nombre, password, rol} = req.body;

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    const criptPass = bcryptjs.hashSync(password, salt);
    

    try {
        
        const usuario: Usuario = Usuario.build({correo, nombre, password: criptPass, rol});
        await usuario.save();

        const {password, nombre: nombre1, correo: correo1} = usuario;

        return res.status(200).json({nombre1, correo1});

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }

    
}

export const putUsuario = async(req: Request, res: Response) => {
    
    const {id} = req.params;
    const {correo, password, ...resto} = req.body;

    if(password) {
        //Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    try {

        const usuario = await Usuario.findByPk(id);

        await usuario?.update(resto);
        const {correo, nombre} = usuario!;
        return res.status(200).json({correo, nombre});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador'
        }); 
    }

}

export const deleteUsuario = async(req: Req, res: Response) => {
    
    const { id } = req.params!;
    const idAdmin = req.usuario!.id;

    try {

        const usuario = await Usuario.findByPk(id);

        await usuario?.update({estado: 0})

        return res.status(200).json({usuario, idAdmin});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador'
        }); 
    }
}