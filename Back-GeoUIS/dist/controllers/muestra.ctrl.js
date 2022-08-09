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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editarMuestra = exports.crearMuestra = exports.getMuestra = exports.getMuestras = void 0;
const foto_mdl_1 = __importDefault(require("../models/foto.mdl"));
const muestra_mdl_1 = __importDefault(require("../models/muestra.mdl"));
const regexFecha = /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01]))/;
const getMuestras = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const muestras = yield muestra_mdl_1.default.findAll();
    return res.status(200).json({
        ok: true,
        msg: 'getMuestras',
        muestras
    });
});
exports.getMuestras = getMuestras;
const getMuestra = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const muestra = yield muestra_mdl_1.default.findByPk(id);
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
});
exports.getMuestra = getMuestra;
const crearMuestra = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, id_tipo_muestra, codigo, caracteristicas_fisicas, fecha_recoleccion, fecha_ingreso, id_ubicacion, id_localizacion, edad, mineralogia, formacion, fotos } = req.body;
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
    if (!Array.isArray(fotos)) {
        return res.status(200).json({
            status: 400,
            message: 'El parámetro fotos debe ser un arreglo de objetos',
            body: null
        });
    }
    try {
        //Se crea la muestra
        const muestra = muestra_mdl_1.default.build({
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
        yield muestra.save();
        fotos.forEach((obj) => __awaiter(void 0, void 0, void 0, function* () {
            if (obj.foto) {
                let foto = foto_mdl_1.default.build({
                    id_muestra: muestra.id_muestra,
                    foto: obj.foto,
                    descripcion: obj.descripcion
                });
                yield foto.save();
            }
        }));
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
    const _a = req.body, { fotos } = _a, body = __rest(_a, ["fotos"]);
    //Verficamos los parámetros obligatorios
    if (!body.nombre || !body.id_tipo_muestra || !body.codigo) {
        return res.status(400).json({
            ok: false,
            msg: 'Los parámetros nombre, id_tipo_muestra y codigo son obligatorios'
        });
    }
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
    // if (!Array.isArray(fotos)) {
    //     return res.status(200).json({
    //         status: 400,
    //         message: 'El parámetro fotos debe ser un arreglo de objetos',
    //         body: null
    //     });
    // }
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
        // fotos.forEach(async (obj) => {
        //     if (obj.foto) {
        //         let foto = Foto.build({
        //             id_muestra: muestra!.id_muestra,
        //             foto: obj.foto,
        //             descripcion: obj.descripcion
        //         });
        //         await foto.save();
        //     }
        // })
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
exports.editarMuestra = editarMuestra;
//# sourceMappingURL=muestra.ctrl.js.map