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
exports.existeUsuarioPorID = exports.validarCorreoExiste = exports.validarRol = void 0;
const rol_mdl_1 = __importDefault(require("../models/rol.mdl"));
const usuario_mdl_1 = __importDefault(require("../models/usuario.mdl"));
const validarRol = (rol = '') => __awaiter(void 0, void 0, void 0, function* () {
    const existeRol = yield rol_mdl_1.default.findByPk(rol);
    if (!existeRol) {
        throw new Error(`El rol ${rol} no está registrado en la BD`);
    }
});
exports.validarRol = validarRol;
const validarCorreoExiste = (correo = '') => __awaiter(void 0, void 0, void 0, function* () {
    const correoExiste = yield usuario_mdl_1.default.findOne({ where: { correo } });
    if (correoExiste) {
        throw new Error(`El correo ${correo} ya está registrado en la BD`);
    }
});
exports.validarCorreoExiste = validarCorreoExiste;
const existeUsuarioPorID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const usuario = yield usuario_mdl_1.default.findByPk(id);
    if (!usuario) {
        throw new Error('No existe un usuario con ese ID' + id);
    }
});
exports.existeUsuarioPorID = existeUsuarioPorID;
//# sourceMappingURL=dbValidators.js.map