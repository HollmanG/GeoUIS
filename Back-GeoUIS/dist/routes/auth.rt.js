"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_ctrl_1 = require("../controllers/auth.ctrl");
const validarCampos_1 = require("../middlewares/validarCampos");
const validarJWT_1 = require("../middlewares/validarJWT");
const router = (0, express_1.Router)();
router.post('/login', [
    (0, express_validator_1.check)('correo', 'El correo no es válido').isEmail(),
    (0, express_validator_1.check)('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos_1.validarCampos
], auth_ctrl_1.login);
router.get('/renew', validarJWT_1.validarJWT, auth_ctrl_1.revalidarToken);
exports.default = router;
//# sourceMappingURL=auth.rt.js.map