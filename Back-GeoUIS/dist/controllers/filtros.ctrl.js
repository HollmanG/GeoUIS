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
exports.getUbicaciones = exports.getTipoMuestra = exports.getMunicipio = exports.getMunicipios = void 0;
const municipio_mdl_1 = __importDefault(require("../models/municipio.mdl"));
const tipo_muestra_mdl_1 = __importDefault(require("../models/tipo_muestra.mdl"));
const ubicacion_mdl_1 = __importDefault(require("../models/ubicacion.mdl"));
const getMunicipios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const municipios = yield municipio_mdl_1.default.findAll({
        order: [
            ['nombre', 'ASC']
        ]
    });
    return res.status(200).json({
        ok: true,
        msg: 'getMunicipios',
        municipios
    });
});
exports.getMunicipios = getMunicipios;
const getMunicipio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({
            ok: false,
            msg: 'Debe especificar un id'
        });
    }
    const municipio = yield municipio_mdl_1.default.findByPk(id);
    if (!municipio) {
        return res.status(400).json({
            ok: false,
            msg: 'Debe especificar un municipio válido'
        });
    }
    const municipios = yield municipio_mdl_1.default.findAll({
        where: { id_municipio: id },
    });
    return res.status(200).json({
        ok: true,
        msg: 'getMunicipio',
        municipios
    });
});
exports.getMunicipio = getMunicipio;
const getTipoMuestra = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tiposMuestra = yield tipo_muestra_mdl_1.default.findAll();
    return res.status(200).json({
        ok: true,
        msg: 'getTipoMuestra',
        tiposMuestra
    });
});
exports.getTipoMuestra = getTipoMuestra;
const getUbicaciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ubicaciones = yield ubicacion_mdl_1.default.findAll({
        order: [
            ['id_ubicacion', 'ASC']
        ]
    });
    return res.status(200).json({
        ok: true,
        msg: 'getUbicaciones',
        ubicaciones
    });
});
exports.getUbicaciones = getUbicaciones;
//# sourceMappingURL=filtros.ctrl.js.map