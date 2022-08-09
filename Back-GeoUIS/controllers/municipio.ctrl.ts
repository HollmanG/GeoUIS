import { Request, Response } from "express";
import Municipio from "../models/municipio.mdl";

export const getMunicipios = async(req: Request, res: Response) => {
    
    const municipios = await Municipio.findAll();
    return res.status(200).json({
        ok: true,
        msg: 'getMunicipios',
        municipios
    });

}

export const getMunicipio = async(req: Request, res: Response) => {
    
    const {id} = req.params;
    
    if(!id) {
        return res.status(400).json({
            ok: false,
            msg: 'Debe especificar un id'
        });
    };

    const municipio = await Municipio.findByPk(id);
    
    if(!municipio) {
        return res.status(400).json({
            ok: false,
            msg: 'Debe especificar un municipio válido'
        });
    };

    const municipios = await Municipio.findAll({
        where: {id_municipio:id},
    });
    return res.status(200).json({
        ok: true,
        msg: 'getMunicipio',
        municipios
    });

}