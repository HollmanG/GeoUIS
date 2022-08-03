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
exports.getMunicipiosPorDpto = exports.getMunicipios = exports.getDepartamentos = void 0;
const departamento_mdl_1 = __importDefault(require("../models/departamento.mdl"));
const municipio_mdl_1 = __importDefault(require("../models/municipio.mdl"));
const getDepartamentos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const departamentos = yield departamento_mdl_1.default.findAll();
    return res.status(200).json(departamentos);
});
exports.getDepartamentos = getDepartamentos;
const getMunicipios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const municipios = yield municipio_mdl_1.default.findAll();
    return res.status(200).json(municipios);
});
exports.getMunicipios = getMunicipios;
const getMunicipiosPorDpto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_departamento } = req.params;
    if (!id_departamento) {
        return res.status(400).json({
            ok: false,
            msg: 'Debe especificar un departamento'
        });
    }
    ;
    const dpto = yield departamento_mdl_1.default.findByPk(id_departamento);
    if (!dpto) {
        return res.status(400).json({
            ok: false,
            msg: 'Debe especificar un departamento válido'
        });
    }
    ;
    const municipios = yield municipio_mdl_1.default.findAll({
        where: { id_departamento },
    });
    return res.status(200).json(municipios);
});
exports.getMunicipiosPorDpto = getMunicipiosPorDpto;
//# sourceMappingURL=departamento_municipio.ctrl.js.map