import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { Req } from "../helpers/interfaces";
import Foto from "../models/foto.mdl";
import Muestra from '../models/muestra.mdl';
import { QueryTypes } from 'sequelize';
import Localizacion from '../models/localizacion.mdl';
import path from "path";
import { existsSync, mkdirSync } from "fs";
import Prestamo from "../models/prestamo.mdl";

const regexFecha = /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01]))/;

export const getMuestras = async (req: Request, res: Response) => {

    const {q, limit} = req.query;
    const texto = q as string;

    try {
        const query = `SELECT mu.*, tp.nombre as tipo_muestra, ub.descripcion as ubicacion, lo.punto, lo.localizacion_geografica, lo.localizacion_geologica, lo.id_municipio FROM muestras mu
                     JOIN ubicaciones ub ON ub.id_ubicacion = mu.id_ubicacion
                     JOIN localizaciones lo ON lo.id_localizacion = mu.id_localizacion
                     JOIN tipos_muestra tp ON tp.id_tipo_muestra = mu.id_tipo_muestra ${q ? `where UPPER(mu.nombre) like '%${texto.toUpperCase()}%'` : ``} order by mu.nombre`;

        const muestras = await Muestra.sequelize?.query(query, { type: QueryTypes.SELECT });
        
        if(muestras) {
            muestras.forEach((muestra: any) => {
                if(muestra.punto){ 
                    muestra.x = muestra.punto.coordinates[0];
                    muestra.y = muestra.punto.coordinates[1];
                    muestra.z = muestra.punto.coordinates[2];
                }
                delete muestra.punto;
            })
        }
        
        
        return res.status(200).json({
            ok: true,
            msg: 'getMuestras',
            muestras: limit ? muestras?.slice(0, parseInt(limit as string)) : muestras
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

export const getMuestra = async (req: Request, res: Response) => {

    const { id } = req.params;

    try {
        const query = `SELECT mu.*, tp.nombre as tipo_muestra, ub.descripcion as ubicacion, lo.punto, lo.localizacion_geografica, lo.localizacion_geologica, lo.id_municipio FROM muestras mu
                     JOIN ubicaciones ub ON ub.id_ubicacion = mu.id_ubicacion
                     JOIN localizaciones lo ON lo.id_localizacion = mu.id_localizacion
                     JOIN tipos_muestra tp ON tp.id_tipo_muestra = mu.id_tipo_muestra
                     where mu.id_muestra = :id`;

        const muestra = await Muestra.sequelize?.query(query, { replacements: { id }, type: QueryTypes.SELECT });

        if(muestra) {
            muestra.forEach((muestra: any) => {
                if(muestra.punto){ 
                    muestra.x = muestra.punto.coordinates[0];
                    muestra.y = muestra.punto.coordinates[1];
                    muestra.z = muestra.punto.coordinates[2];
                }
                delete muestra.punto;
            })
        }

        return res.status(200).json({
            ok: true,
            msg: 'getMuestra',
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

export const crearMuestra = async (req: Req, res: Response) => {

    const { textura, fecha_recoleccion, fecha_ingreso, id_ubicacion, size,
        nombre, id_tipo_muestra, edad, composicion, codigo, 
        formacion, recolector, color, clasificacion, seccion_delgada, 
        docente, asignatura, estructura, descripcion_seccion_delgada,
        x, y, z, localizacion_geografica, localizacion_geologica, id_municipio } = req.body; //En esta línea lo refente a localización

    //Verficamos los parámetros obligatorios
    if (!nombre || !id_tipo_muestra || !id_ubicacion || !codigo || seccion_delgada === null || seccion_delgada === undefined) {
        return res.status(400).json({
            ok: false,
            msg: 'Los parámetros nombre, id_tipo_muestra, id_ubicacion, seccion_delgada y codigo son obligatorios'
        });
    }

    //Verificamos las fechas
    if (fecha_recoleccion && !regexFecha.test(fecha_recoleccion)) {
        return res.status(400).json({
            ok: false,
            msg: 'El parámetro fecha_recoleccion tiene un formato incorrecto, debe ser yyyy-mm-dd'
        });
    }

    if (fecha_ingreso && !regexFecha.test(fecha_ingreso)) {
        return res.status(400).json({
            ok: false,
            msg: 'El parámetro fecha_ingreso tiene un formato incorrecto, debe ser yyyy-mm-dd'
        });
    }

    try {

        let punto;
        if (x && y) {
            punto = {
                type: 'Point',
                coordinates: [x, y, z]
            };
        }

        //Se crea la localización
        const localizacion: Localizacion = Localizacion.build({
            id_municipio,
            punto: punto ? punto : undefined,
            localizacion_geografica: localizacion_geografica ? localizacion_geografica : null,
            localizacion_geologica: localizacion_geologica ? localizacion_geologica : null
        });

        await localizacion.save();
        
        //Se crea la muestra
        const muestra: Muestra = Muestra.build({
            nombre, id_tipo_muestra, codigo,
            textura: textura ? textura : null,
            fecha_recoleccion: fecha_recoleccion ? fecha_recoleccion : null,
            fecha_ingreso: fecha_ingreso ? fecha_ingreso : null,
            id_ubicacion: id_ubicacion,
            id_localizacion: localizacion.id_localizacion,
            seccion_delgada, 
            edad: edad ? edad : null,
            composicion: composicion ? composicion : null,
            formacion: formacion ? formacion : null,
            recolector: recolector ? recolector : null, 
            color: color ? color : null,
            clasificacion: clasificacion ? clasificacion : null,
            docente: docente ? docente : null,
            asignatura: asignatura ? asignatura : null,
            estructura: estructura ? estructura : null,
            descripcion_seccion_delgada: descripcion_seccion_delgada ? descripcion_seccion_delgada : null,
            size: size ? size : null
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
        return res.status(400).json({
            ok: false,
            msg: 'El parámetro fecha_recoleccion tiene un formato incorrecto, debe ser yyyy-mm-dd'
        });
    }
    if (body.fecha_ingreso && !regexFecha.test(body.fecha_ingreso)) {
        return res.status(200).json({
            ok: false,
            msg: 'El parámetro fecha_ingreso tiene un formato incorrecto, debe ser yyyy-mm-dd'
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

        await muestra.update(body);

        let punto;
        if (body.x && body.y) {
            punto = {
                type: 'Point',
                coordinates: [body.x, body.y, body.z]
            };
        }
        body.punto = punto;
        const localizacion = await Localizacion.findByPk(muestra.id_localizacion);

        await localizacion?.update(body);

        return res.status(200).json({
            ok: true,
            msg: 'Muestra editada',
            muestra,
            localizacion
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
        await Foto.destroy({ where: { id_muestra: id } });
        await Prestamo.destroy({ where: { id_muestra: id } })
        await Muestra.destroy({ where: { id_muestra: id } });
        await Localizacion.destroy({ where: { id_localizacion: muestraExiste.id_localizacion } });

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

    const { id_muestra } = req.body;

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
            msg: 'Debe enviar al menos 1 foto'
        });
    }

    const muestraExiste = await Muestra.findByPk(id_muestra);

    if (!muestraExiste) {
        return res.status(400).json({
            ok: false,
            msg: 'No existe la muestra'
        });
    }
    const f = req.files.foto as UploadedFile[];
    let fotos: any = [];
    if(!f.length) {
        fotos.push(req.files.foto as any);
    } else {
        fotos = req.files.foto;
    }
    
    const ruta = path.join(`${path.resolve()}/storage/uploads/muestras/${id_muestra}`);
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'PNG', 'JPG', 'JPEG'];
    try {
        const fotosCreadas: Foto[] = [];
        for (const foto of fotos) {

            const fotoID = await Foto.sequelize?.query("SELECT nextval('fotos_id_fotos_seq'::regclass)", { type: QueryTypes.SELECT });
            const id_foto = Object.values(fotoID![0])[0];
            const nombreCortado = foto.name.split('.');
            const extension = nombreCortado[nombreCortado.length - 1];
            const nombre = `${id_muestra}_${id_foto}.${extension}`;
            
            if (!extensionesValidas.includes(extension)) {
                return res.status(400).json({
                    ok: false,
                    msg: `Las extensiones admitidas son ${extensionesValidas.join(', ')}`
                });
            }
            
            const fotoTemp: Foto = Foto.build({
                id_muestra,
                id_foto,
                foto: nombre
            });

            await fotoTemp.save();

            fotosCreadas.push(fotoTemp);

            if (!existsSync(ruta)) mkdirSync(ruta, { recursive: true });

            await new Promise((resolve, reject) => {
                foto.mv(`${ruta}/${nombre}`, (err: any) => {
                    if (err) reject(err);
                    else resolve(`${nombre}`);
                });
            });

        }

        return res.status(200).json({
            ok: true,
            msg: 'agregarFoto',
            fotosCreadas
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
