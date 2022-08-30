import { Request, Response } from "express";
import { QueryTypes } from 'sequelize';
import { Req } from "../helpers/interfaces";
import Prestamo from '../models/prestamo.mdl';

const regexFecha = /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01]))/;

const disp = async(id_muestra: string): Promise<boolean> => {

    let disponible = true;
    
    const prestamo: Prestamo | null = await Prestamo.findOne({
        where: {id_muestra},
        order: [
        ['id_prestamo', 'DESC']
        ]
    });
    
    if(prestamo && !prestamo.getDataValue('fecha_devolucion')) {
        disponible = false; 
    }

    return disponible;

}

export const getPrestamos = async (req: Request, res: Response) => {

    try {
        const query = ` SELECT pr.*, mu.nombre as nombre_muestra, us.nombre as nombre_usuario, us.correo, tp.nombre as tipo_muestra
                        FROM prestamos pr
                        JOIN muestras mu ON mu.id_muestra = pr.id_muestra
                        JOIN usuarios us ON us.id = pr.id_usuario
                        JOIN tipos_muestra tp ON tp.id_tipo_muestra = mu.id_tipo_muestra
                        order by pr.id_prestamo DESC`;

        const prestamos = await Prestamo.sequelize?.query(query, { type: QueryTypes.SELECT });
        
        return res.status(200).json({
            ok: true,
            msg: 'getPrestamos',
            prestamos
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

export const postPrestamo = async (req: Req, res: Response) => {

    const {fecha_prestamo, id_muestra} = req.body;

    if(!fecha_prestamo || !id_muestra) {
        return res.status(400).json({
            ok: false,
            msg: 'Los parámetros fecha_prestamo y id_muestra son obligatorios'
        });
    }
    
    if(!(await disp(id_muestra))){
        return res.status(400).json({
            ok: false,
            msg: 'La muestra se encuentra prestada'
        });
    }

    //Verificamos la fecha
    if (!regexFecha.test(fecha_prestamo)) {
        return res.status(400).json({
            ok: false,
            msg: 'El parámetro fecha_recoleccion tiene un formato incorrecto, debe ser yyyy-mm-dd'
        });
    }

    try {
        const prestamo: Prestamo = Prestamo.build({
            fecha_prestamo,
            id_muestra,
            id_usuario: req.usuario?.id
        });
    
        await prestamo.save();
    
        return res.status(200).json({
            ok: true,
            msg: 'Prestamo creado',
            prestamo
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

export const getDisponible = async (req: Request, res: Response) => {
    const { id } = req.params;
    const disponible: boolean = await disp(id);
    return res.status(200).json({
        ok: true,
        msg: 'getDisponible',
        disponible
    });
    
}

export const putPrestamo = async (req: Req, res: Response) => {

    const {fecha_devolucion} = req.body;
    const { id } = req.params;
    const disponible: boolean = await disp(id);

    if(disponible) {
        return res.status(400).json({
            ok: false,
            msg: 'La muestra no está en estado de prestamo'
        });
    }

    if(!fecha_devolucion ) {
        return res.status(400).json({
            ok: false,
            msg: 'El parámetro fecha_devolucion es obligatorio'
        });
    }

    //Verificamos la fecha
    if (!regexFecha.test(fecha_devolucion)) {
        return res.status(400).json({
            ok: false,
            msg: 'El parámetro fecha_devolucion tiene un formato incorrecto, debe ser yyyy-mm-dd'
        });
    }

    try {

        const prestamo: Prestamo | null = await Prestamo.findOne({
            where: {id_muestra: id},
            order: [
            ['id_prestamo', 'DESC']
            ]
        });
        
        // const prestamo = await Prestamo.findByPk(prestamo1?.getDataValue('id_prestamo'));

        if(!prestamo){
            return res.status(400).json({
                ok: false,
                msg: 'No se encontró un préstamo con el id especificado'
            });
        }
        await prestamo.update({fecha_devolucion});
    
        return res.status(200).json({
            ok: true,
            msg: 'Prestamo editado',
            prestamo
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

