"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generarJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generarJWT = (id) => {
    const token = jsonwebtoken_1.default.sign({ id }, process.env.SECRETORPRIVATEKEY, { expiresIn: '6h' });
    return token;
};
exports.generarJWT = generarJWT;
//# sourceMappingURL=generarJWT.js.map