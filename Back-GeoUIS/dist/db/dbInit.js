"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const usuario_mdl_1 = __importDefault(require("../models/usuario.mdl"));
const rol_mdl_1 = __importDefault(require("../models/rol.mdl"));
const dbInit = () => {
    usuario_mdl_1.default.sync(),
        rol_mdl_1.default.sync();
};
exports.default = dbInit;
//# sourceMappingURL=dbInit.js.map