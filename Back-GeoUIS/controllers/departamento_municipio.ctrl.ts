import { Request, Response } from "express";
import Departamento from "../models/departamento.mdl";
import Municipio from "../models/municipio.mdl";

export const getDepartamentos = async(req: Request, res: Response) => {
    
    const departamentos = await Departamento.findAll();
    return res.status(200).json({
        ok: true,
        msg: 'getDepartamentos',
        departamentos
    });

}

export const getMunicipios = async(req: Request, res: Response) => {
    
    const municipios = await Municipio.findAll();
    return res.status(200).json({
        ok: true,
        msg: 'getMunicipios',
        municipios
    });

}

export const getMunicipiosPorDpto = async(req: Request, res: Response) => {
    
    const {id_departamento} = req.params;
    
    if(!id_departamento) {
        return res.status(400).json({
            ok: false,
            msg: 'Debe especificar un departamento'
        });
    };

    const dpto = await Departamento.findByPk(id_departamento);
    
    if(!dpto) {
        return res.status(400).json({
            ok: false,
            msg: 'Debe especificar un departamento válido'
        });
    };

    const municipios = await Municipio.findAll({
        where: {id_departamento},
    });
    return res.status(200).json({
        ok: true,
        msg: 'getMunicipiosPorDpto',
        municipios
    });

}