import { Request, Response } from "express";
import Muestra from '../models/muestra.mdl';

export const getMuestras = async(req: Request, res: Response) => {

    const muestras = await Muestra.findAll();

    return res.json({
        ok: true,
        msg: 'getMuestras',
        muestras
    });

}

export const getMuestra = async(req: Request, res: Response) => {

    const {id} = req.params;

    const muestra = await Muestra.findByPk(id);

    return res.json({
        ok: true,
        msg: 'getMuestra',
        muestra
    });
    
}