"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validarJWT = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ msg: 'No hay token en la petición' });
    }
    try {
        const payload = jsonwebtoken_1.default.verify(token, process.env.SECRETORPRIVATEKEY);
        const decoded = typeof payload === 'string'
            ? JSON.parse(payload)
            : payload;
        req.id = decoded.id;
        console.log(req.id);
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(401).json({ msg: 'Token no válido' });
    }
};
exports.validarJWT = validarJWT;
//# sourceMappingURL=validarJWT.js.map