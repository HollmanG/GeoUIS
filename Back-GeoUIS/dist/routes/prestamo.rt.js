"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validar_roles_1 = require("../middlewares/validar-roles");
const validarCampos_1 = require("../middlewares/validarCampos");
const prestamo_ctrl_1 = require("../controllers/prestamo.ctrl");
const validarJWT_1 = require("../middlewares/validarJWT");
const router = (0, express_1.Router)();
router.post('/', [
    validarJWT_1.validarJWT,
    validar_roles_1.puedePrestar,
    validarCampos_1.validarCampos
], prestamo_ctrl_1.postPrestamo);
router.post('/:id', [
    validarJWT_1.validarJWT,
    validar_roles_1.esAdmin,
    validarCampos_1.validarCampos
], prestamo_ctrl_1.putPrestamo);
router.get('/:id', prestamo_ctrl_1.getDisponible);
exports.default = router;
//# sourceMappingURL=prestamo.rt.js.map