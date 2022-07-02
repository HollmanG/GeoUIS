"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.putPassword = void 0;
const putPassword = (req, res, next) => {
    const password = req.body.password;
    if (!password) {
    }
    else if (password.split('').length < 6) {
        return res.status(400).json({ msg: 'La contraseña debe ser mayor a 6 caracteres' });
    }
    next();
};
exports.putPassword = putPassword;
//# sourceMappingURL=putPassword.js.map