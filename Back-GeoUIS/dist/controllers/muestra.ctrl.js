"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarFoto = exports.agregarFoto = exports.getFotos = exports.eliminarMuestra = exports.editarMuestra = exports.crearMuestra = exports.getMuestra = exports.getMuestras = void 0;
const foto_mdl_1 = __importDefault(require("../models/foto.mdl"));
const muestra_mdl_1 = __importDefault(require("../models/muestra.mdl"));
const sequelize_1 = require("sequelize");
const localizacion_mdl_1 = __importDefault(require("../models/localizacion.mdl"));
const regexFecha = /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01]))/;
const getMuestras = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const query = `SELECT mu.*, tp.nombre as tipo_muestra, ub.descripcion as ubicacion, lo.punto, lo.localizacion_geografica, lo.localizacion_geologica, lo.id_municipio FROM muestras mu
                     JOIN ubicaciones ub ON ub.id_ubicacion = mu.id_ubicacion
                     JOIN localizaciones lo ON lo.id_localizacion = mu.id_localizacion
                     JOIN tipos_muestra tp ON tp.id_tipo_muestra = mu.id_tipo_muestra`;
        const muestras = yield ((_a = muestra_mdl_1.default.sequelize) === null || _a === void 0 ? void 0 : _a.query(query, { type: sequelize_1.QueryTypes.SELECT }));
        return res.status(200).json({
            ok: true,
            msg: 'getMuestras',
            muestras
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
});
exports.getMuestras = getMuestras;
const getMuestra = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { id } = req.params;
    try {
        const query = `SELECT mu.*, tp.nombre as tipo_muestra, ub.descripcion as ubicacion, lo.punto, lo.localizacion_geografica, lo.localizacion_geologica, lo.id_municipio FROM muestras mu
                     JOIN ubicaciones ub ON ub.id_ubicacion = mu.id_ubicacion
                     JOIN localizaciones lo ON lo.id_localizacion = mu.id_localizacion
                     JOIN tipos_muestra tp ON tp.id_tipo_muestra = mu.id_tipo_muestra
                     where mu.id_muestra = :id`;
        const muestras = yield ((_b = muestra_mdl_1.default.sequelize) === null || _b === void 0 ? void 0 : _b.query(query, { replacements: { id }, type: sequelize_1.QueryTypes.SELECT }));
        return res.status(200).json({
            ok: true,
            msg: 'getMuestras',
            muestras
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
});
exports.getMuestra = getMuestra;
const crearMuestra = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, id_tipo_muestra, codigo, caracteristicas_fisicas, fecha_recoleccion, fecha_ingreso, id_ubicacion, edad, mineralogia, formacion, lat, lng, localizacion_geografica, localizacion_geologica, id_municipio } = req.body;
    //Verficamos los parámetros obligatorios
    if (!nombre || !id_tipo_muestra || !id_ubicacion || !codigo || !id_municipio) {
        return res.status(400).json({
            ok: false,
            msg: 'Los parámetros nombre, id_tipo_muestra, id_ubicacion, id_municipio  y codigo son obligatorios'
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
        let punto;
        //TODO: Validar si es correcto el punto
        if (lng && lat) {
            punto = {
                type: 'Point',
                coordinates: [lng, lat],
                crs: { type: 'name', properties: { name: 'EPSG:4326' } }
            };
        }
        //Se crea la localización
        const localizacion = localizacion_mdl_1.default.build({
            id_municipio,
            punto: punto ? punto : undefined,
            localizacion_geografica: localizacion_geografica ? localizacion_geografica : null,
            localizacion_geologica: localizacion_geologica ? localizacion_geologica : null
        });
        yield localizacion.save();
        //Se crea la muestra
        const muestra = muestra_mdl_1.default.build({
            nombre, id_tipo_muestra, codigo,
            caracteristicas_fisicas: caracteristicas_fisicas ? caracteristicas_fisicas : null,
            fecha_recoleccion: fecha_recoleccion ? fecha_recoleccion : null,
            fecha_ingreso: fecha_ingreso ? fecha_ingreso : null,
            id_ubicacion: id_ubicacion,
            id_localizacion: localizacion.id_localizacion,
            edad: edad ? edad : null,
            mineralogia: mineralogia ? mineralogia : null,
            formacion: formacion ? formacion : null
        });
        yield muestra.save();
        return res.status(200).json({
            ok: true,
            msg: 'Muestra creada',
            muestra
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
});
exports.crearMuestra = crearMuestra;
const editarMuestra = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const body = req.body;
    console.log(body);
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
        const muestra = yield muestra_mdl_1.default.findByPk(id);
        if (!muestra) {
            return res.status(400).json({
                ok: false,
                msg: 'No se encontró la muestra con el id proporcionado'
            });
        }
        yield (muestra === null || muestra === void 0 ? void 0 : muestra.update(body));
        let punto;
        //TODO: Validar si es correcto el punto
        if (body.lng && body.lat) {
            punto = {
                type: 'Point',
                coordinates: [body.lng, body.lat],
                crs: { type: 'name', properties: { name: 'EPSG:4326' } }
            };
        }
        body.punto = punto;
        const localizacion = yield localizacion_mdl_1.default.findByPk(muestra.id_localizacion);
        yield (localizacion === null || localizacion === void 0 ? void 0 : localizacion.update(body));
        return res.status(200).json({
            ok: true,
            msg: 'Muestra editada',
            muestra,
            localizacion
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
});
exports.editarMuestra = editarMuestra;
const eliminarMuestra = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const muestraExiste = yield muestra_mdl_1.default.findByPk(id);
        if (!muestraExiste) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe la muestra'
            });
        }
        yield muestra_mdl_1.default.destroy({ where: { id_muestra: id } });
        yield localizacion_mdl_1.default.destroy({ where: { id_localizacion: muestraExiste.id_localizacion } });
        return res.status(200).json({
            ok: true,
            msg: 'Muestra Eliminada'
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
});
exports.eliminarMuestra = eliminarMuestra;
const getFotos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const fotos = yield foto_mdl_1.default.findAll({
        where: {
            id_muestra: id
        }
    });
    return res.status(200).json({
        ok: true,
        msg: 'getFotos',
        fotos
    });
});
exports.getFotos = getFotos;
const agregarFoto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const { id_muestra, descripcion } = req.body;
    if (!id_muestra) {
        return res.status(400).json({
            ok: false,
            msg: 'El id de la muestra es obligatorio'
        });
    }
    //Verificamos que se envió la foto
    if (!((_c = req.files) === null || _c === void 0 ? void 0 : _c.foto)) {
        return res.status(400).json({
            ok: false,
            msg: 'La foto es obligatoria'
        });
    }
    // console.log(req.files.foto.name);
    const foto = req.files.foto;
    const nombreFoto = foto.name;
    console.log(nombreFoto);
    const muestraExiste = yield muestra_mdl_1.default.findByPk(id_muestra);
    if (!muestraExiste) {
        return res.status(400).json({
            ok: false,
            msg: 'No existe la muestra'
        });
    }
    try {
        const fotoCreada = foto_mdl_1.default.build({
            id_muestra,
            // foto,
            descripcion
        });
        yield fotoCreada.save();
        return res.status(200).json({
            ok: true,
            msg: 'agregarFoto',
            fotoCreada
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
});
exports.agregarFoto = agregarFoto;
const eliminarFoto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        // if(!id) {
        //     return res.status(400).json({
        //         ok: false,
        //         msg: 'El id de la foto es obligatorio'
        //     });
        // }
        const fotoExiste = yield foto_mdl_1.default.findByPk(id);
        if (!fotoExiste) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe la foto'
            });
        }
        yield foto_mdl_1.default.destroy({ where: { id_foto: id } });
        return res.status(200).json({
            ok: true,
            msg: 'Foto Eliminada'
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
});
exports.eliminarFoto = eliminarFoto;
//# sourceMappingURL=muestra.ctrl.js.map