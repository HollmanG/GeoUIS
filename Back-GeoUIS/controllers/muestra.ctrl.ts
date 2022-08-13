import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { where } from "sequelize/types";
import { Req } from "../helpers/interfaces";
import Foto from "../models/foto.mdl";
import Muestra from '../models/muestra.mdl';

const regexFecha = /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01]))/;

export const getMuestras = async (req: Request, res: Response) => {

    const muestras = await Muestra.findAll();

    return res.status(200).json({
        ok: true,
        msg: 'getMuestras',
        muestras
    });

}

export const getMuestra = async (req: Request, res: Response) => {

    const { id } = req.params;

    const muestra = await Muestra.findByPk(id);

    if (!muestra) {
        return res.status(400).json({
            ok: false,
            msg: 'No se encontró la muestra con el id proporcionado'
        });
    }

    return res.status(200).json({
        ok: true,
        msg: 'getMuestra',
        muestra
    });

}

export const crearMuestra = async (req: Req, res: Response) => {

    const { nombre, id_tipo_muestra, codigo, caracteristicas_fisicas,
        fecha_recoleccion, fecha_ingreso, id_ubicacion, id_localizacion,
        edad, mineralogia, formacion } = req.body;

    //Verficamos los parámetros obligatorios
    if (!nombre || !id_tipo_muestra || !codigo) {
        return res.status(400).json({
            ok: false,
            msg: 'Los parámetros nombre, id_tipo_muestra y codigo son obligatorios'
        });
    }

    //Verificamos las fechas
    if (fecha_recoleccion && !regexFecha.test(fecha_recoleccion)) {
        return res.status(200).json({
            status: 400,
            message: 'El parámetro fecha_recoleccion tiene un formato incorrecto, debe ser yyyy-mm-dd',
            body: null
        });
    }
    if (fecha_ingreso && !regexFecha.test(fecha_ingreso)) {
        return res.status(200).json({
            status: 400,
            message: 'El parámetro fecha_ingreso tiene un formato incorrecto, debe ser yyyy-mm-dd',
            body: null
        });
    }

    try {
        //Se crea la muestra
        const muestra: Muestra = Muestra.build({
            nombre, id_tipo_muestra, codigo,
            caracteristicas_fisicas: caracteristicas_fisicas ? caracteristicas_fisicas : null,
            fecha_recoleccion: fecha_recoleccion ? fecha_recoleccion : null,
            fecha_ingreso: fecha_ingreso ? fecha_ingreso : null,
            id_ubicacion: id_ubicacion ? id_ubicacion : null,
            id_localizacion: id_localizacion ? id_localizacion : null,
            edad: edad ? edad : null,
            mineralogia: mineralogia ? mineralogia : null,
            formacion: formacion ? formacion : null
        });

        await muestra.save();

        return res.status(200).json({
            ok: true,
            msg: 'Muestra creada',
            muestra
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }


}

export const editarMuestra = async (req: Req, res: Response) => {

    const { id } = req.params;

    const body = req.body;

    //Verificamos las fechas
    if (body.fecha_recoleccion && !regexFecha.test(body.fecha_recoleccion)) {
        return res.status(200).json({
            status: 400,
            message: 'El parámetro fecha_recoleccion tiene un formato incorrecto, debe ser yyyy-mm-dd',
            body: null
        });
    }
    if (body.fecha_ingreso && !regexFecha.test(body.fecha_ingreso)) {
        return res.status(200).json({
            status: 400,
            message: 'El parámetro fecha_ingreso tiene un formato incorrecto, debe ser yyyy-mm-dd',
            body: null
        });
    }

    try {
        //Se edita la muestra
        const muestra = await Muestra.findByPk(id);

        if (!muestra) {
            return res.status(400).json({
                ok: false,
                msg: 'No se encontró la muestra con el id proporcionado'
            });
        }

        await muestra?.update(body);

        return res.status(200).json({
            ok: true,
            msg: 'Muestra creada',
            muestra
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

export const eliminarMuestra = async (req: Req, res: Response) => {

    const { id } = req.params;

    try {

        const muestraExiste = await Muestra.findByPk(id);

        if (!muestraExiste) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe la muestra'
            });
        }

        await Muestra.destroy({ where: { id_muestra: id } });

        return res.status(200).json({
            ok: true,
            msg: 'Muestra Eliminada'
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

export const getFotos = async (req: Req, res: Response) => {

    const { id } = req.params;
    const fotos = await Foto.findAll(
        {
            where: {
                id_muestra: id
            }
        });

    return res.status(200).json({
        ok: true,
        msg: 'getFotos',
        fotos
    });
}

export const agregarFoto = async (req: Req, res: Response) => {

    const { id_muestra, descripcion } = req.body;

    if (!id_muestra) {
        return res.status(400).json({
            ok: false,
            msg: 'El id de la muestra es obligatorio'
        });
    }

    //Verificamos que se envió la foto
    
    if (!req.files?.foto) {
        return res.status(400).json({
            ok: false,
            msg: 'La foto es obligatoria'
        });
    }
    // console.log(req.files.foto.name);
    
    const foto = req.files.foto as UploadedFile;

    const nombreFoto:string = foto.name;

    console.log(nombreFoto);
    

    const muestraExiste = await Muestra.findByPk(id_muestra);

    if (!muestraExiste) {
        return res.status(400).json({
            ok: false,
            msg: 'No existe la muestra'
        });
    }

    try {

        const fotoCreada: Foto = Foto.build({
            id_muestra,
            // foto,
            descripcion
        });

        await fotoCreada.save();

        return res.status(200).json({
            ok: true,
            msg: 'agregarFoto',
            fotoCreada
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

export const eliminarFoto = async (req: Req, res: Response) => {

    const { id } = req.params;

    try {

        // if(!id) {
        //     return res.status(400).json({
        //         ok: false,
        //         msg: 'El id de la foto es obligatorio'
        //     });
        // }

        const fotoExiste = await Foto.findByPk(id);

        if (!fotoExiste) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe la foto'
            });
        }

        await Foto.destroy({ where: { id_foto: id } });

        return res.status(200).json({
            ok: true,
            msg: 'Foto Eliminada'
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}
