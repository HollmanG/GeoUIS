"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const usuario_ctrl_1 = require("../controllers/usuario.ctrl");
const dbValidators_1 = require("../helpers/dbValidators");
const putPassword_1 = require("../middlewares/putPassword");
const validarCampos_1 = require("../middlewares/validarCampos");
const validarJWT_1 = require("../middlewares/validarJWT");
const router = (0, express_1.Router)();
router.get('/', usuario_ctrl_1.getUsuarios);
router.get('/:id', [
    (0, express_validator_1.check)('id').custom(dbValidators_1.existeUsuarioPorID),
    validarCampos_1.validarCampos
], usuario_ctrl_1.getUsuario);
router.post('/', [
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('correo', 'El correo no es válido').isEmail(),
    (0, express_validator_1.check)('password', 'La contraseña es obligatoria y debe tener una longitud de más de 6 caracteres').isLength({ min: 6 }),
    (0, express_validator_1.check)('correo').custom(dbValidators_1.validarCorreoExiste),
    (0, express_validator_1.check)('rol').custom(dbValidators_1.validarRol),
    validarCampos_1.validarCampos
], usuario_ctrl_1.postUsuario);
router.put('/:id', [
    (0, express_validator_1.check)('id').custom(dbValidators_1.existeUsuarioPorID),
    (0, express_validator_1.check)('correo', 'El correo no es válido').isEmail(),
    putPassword_1.putPassword,
    validarCampos_1.validarCampos
], usuario_ctrl_1.putUsuario);
router.delete('/:id', [
    validarJWT_1.validarJWT,
    (0, express_validator_1.check)('id').custom(dbValidators_1.existeUsuarioPorID),
    validarCampos_1.validarCampos
], usuario_ctrl_1.deleteUsuario);
exports.default = router;
//# sourceMappingURL=usuario.rt.js.map