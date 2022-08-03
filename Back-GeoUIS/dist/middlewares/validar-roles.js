"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.esAdmin = void 0;
const esAdmin = (req, res, next) => {
    if (!req.usuario) {
        return res.status(500).json({
            ok: false,
            msg: 'Se quiere validar el rol sin verificar antes el token'
        });
    }
    const { rol, nombre } = req.usuario;
    if (rol !== 2 && rol !== 4) {
        return res.status(401).json({
            ok: false,
            msg: `${nombre} no es administrador - No puede realizar esta acción`
        });
    }
    next();
};
exports.esAdmin = esAdmin;
//# sourceMappingURL=validar-roles.js.map