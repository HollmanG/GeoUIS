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
exports.deleteUsuario = exports.putUsuario = exports.postUsuario = exports.getUsuario = exports.getUsuarios = void 0;
const usuario_mdl_1 = __importDefault(require("../models/usuario.mdl"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarios = yield usuario_mdl_1.default.findAll();
    return res.json({
        msg: 'getUsuarios',
        usuarios
    });
});
exports.getUsuarios = getUsuarios;
const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield usuario_mdl_1.default.findByPk(id);
    return res.json({
        msg: 'getUsuario',
        usuario
    });
});
exports.getUsuario = getUsuario;
const postUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { correo, nombre, password, rol } = req.body;
    //Encriptar la contraseña
    const salt = bcryptjs_1.default.genSaltSync();
    const criptPass = bcryptjs_1.default.hashSync(password, salt);
    try {
        const usuario = usuario_mdl_1.default.build({ correo, nombre, password: criptPass, rol });
        yield usuario.save();
        const { password, nombre: nombre1, correo: correo1 } = usuario;
        return res.status(200).json({ nombre1, correo1 });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.postUsuario = postUsuario;
const putUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const _a = req.body, { correo, password } = _a, resto = __rest(_a, ["correo", "password"]);
    if (password) {
        //Encriptar la contraseña
        const salt = bcryptjs_1.default.genSaltSync();
        resto.password = bcryptjs_1.default.hashSync(password, salt);
    }
    try {
        const usuario = yield usuario_mdl_1.default.findByPk(id);
        yield (usuario === null || usuario === void 0 ? void 0 : usuario.update(resto));
        const { correo, nombre } = usuario;
        return res.status(200).json({ correo, nombre });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.putUsuario = putUsuario;
const deleteUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.id;
    try {
        const usuario = yield usuario_mdl_1.default.findByPk(id);
        yield (usuario === null || usuario === void 0 ? void 0 : usuario.update({ estado: 0 }));
        return res.status(200).json({ usuario, id });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.deleteUsuario = deleteUsuario;
//# sourceMappingURL=usuario.ctrl.js.map