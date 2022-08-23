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
exports.putPrestamo = exports.getDisponible = exports.postPrestamo = void 0;
const prestamo_mdl_1 = __importDefault(require("../models/prestamo.mdl"));
const regexFecha = /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01]))/;
const disp = (id_muestra) => __awaiter(void 0, void 0, void 0, function* () {
    let disponible = true;
    const prestamo = yield prestamo_mdl_1.default.findOne({
        where: { id_muestra },
        order: [
            ['id_prestamo', 'DESC']
        ]
    });
    if (prestamo && !prestamo.getDataValue('fecha_devolucion')) {
        disponible = false;
    }
    return disponible;
});
const postPrestamo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { fecha_prestamo, id_muestra } = req.body;
    if (!fecha_prestamo || !id_muestra) {
        return res.status(400).json({
            ok: false,
            msg: 'Los parámetros fecha_prestamo y id_muestra son obligatorios'
        });
    }
    if (!(yield disp(id_muestra))) {
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
        const prestamo = prestamo_mdl_1.default.build({
            fecha_prestamo,
            id_muestra,
            id_usuario: (_a = req.usuario) === null || _a === void 0 ? void 0 : _a.id
        });
        yield prestamo.save();
        return res.status(200).json({
            ok: true,
            msg: 'Prestamo creado',
            prestamo
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
exports.postPrestamo = postPrestamo;
const getDisponible = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const disponible = yield disp(id);
    return res.status(200).json({
        ok: true,
        msg: 'getDisponible',
        disponible
    });
});
exports.getDisponible = getDisponible;
const putPrestamo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fecha_devolucion } = req.body;
    const { id } = req.params;
    if (!fecha_devolucion) {
        return res.status(400).json({
            ok: false,
            msg: 'El parámetro fecha_devolucion es obligatorio'
        });
    }
    //Verificamos la fecha
    if (!regexFecha.test(fecha_devolucion)) {
        return res.status(400).json({
            ok: false,
            msg: 'El parámetro fecha_recoleccion tiene un formato incorrecto, debe ser yyyy-mm-dd'
        });
    }
    try {
        const prestamo = yield prestamo_mdl_1.default.findByPk(id);
        if (!prestamo) {
            return res.status(400).json({
                ok: false,
                msg: 'No se encontró un préstamo con el id especificado'
            });
        }
        yield prestamo.update(fecha_devolucion);
        return res.status(200).json({
            ok: true,
            msg: 'Prestamo editado',
            prestamo
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
exports.putPrestamo = putPrestamo;
//# sourceMappingURL=prestamo.ctrl.js.map