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
exports.revalidarToken = exports.login = void 0;
const usuario_mdl_1 = __importDefault(require("../models/usuario.mdl"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const generarJWT_1 = require("../helpers/generarJWT");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { correo, password } = req.body;
    if (!correo) {
        return res.status(400).json({
            ok: false,
            msg: 'No existe el correo'
        });
    }
    try {
        //Verificar si el correo existe
        const usuario = yield usuario_mdl_1.default.findOne({ where: { correo } });
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ingresado no es correcto'
            });
        }
        //Verificar si el usuario está activo
        if (usuario.estado == 0) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario se encuentra inactivo'
            });
        }
        //Verificar la contraseña
        const validarPassword = bcryptjs_1.default.compareSync(password, usuario.password);
        if (!validarPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'La contraseña es incorrecta'
            });
        }
        //Generar el JWT
        const token = yield (0, generarJWT_1.generarJWT)(usuario.id);
        return res.status(200).json({
            ok: true,
            id: usuario.id,
            msg: 'login',
            correo,
            token
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el admin'
        });
    }
});
exports.login = login;
const revalidarToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { usuario } = req;
    //Generar el JWT
    const token = yield (0, generarJWT_1.generarJWT)(usuario === null || usuario === void 0 ? void 0 : usuario.id);
    return res.json({
        ok: true,
        msg: "Renew",
        id: usuario === null || usuario === void 0 ? void 0 : usuario.id,
        nombre: usuario === null || usuario === void 0 ? void 0 : usuario.nombre,
        token
    });
});
exports.revalidarToken = revalidarToken;
//# sourceMappingURL=auth.ctrl.js.map