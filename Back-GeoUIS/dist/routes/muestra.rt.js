"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const muestra_ctrl_1 = require("../controllers/muestra.ctrl");
const validar_roles_1 = require("../middlewares/validar-roles");
const validarCampos_1 = require("../middlewares/validarCampos");
const validarJWT_1 = require("../middlewares/validarJWT");
const router = (0, express_1.Router)();
router.get('/', muestra_ctrl_1.getMuestras);
router.get('/:id', muestra_ctrl_1.getMuestra);
router.post('/', [
    validarJWT_1.validarJWT,
    validar_roles_1.esAdmin,
    validarCampos_1.validarCampos
], muestra_ctrl_1.crearMuestra);
router.put('/:id', [
    validarJWT_1.validarJWT,
    validar_roles_1.esAdmin,
    validarCampos_1.validarCampos
], muestra_ctrl_1.editarMuestra);
router.delete('/:id', [
    validarJWT_1.validarJWT,
    validar_roles_1.esAdmin,
    validarCampos_1.validarCampos
], muestra_ctrl_1.eliminarMuestra);
router.get('/fotos/:id', muestra_ctrl_1.getFotos);
router.post('/fotos', [
    validarJWT_1.validarJWT,
    validar_roles_1.esAdmin,
    validarCampos_1.validarCampos
], muestra_ctrl_1.agregarFoto);
router.delete('/fotos', [
    validarJWT_1.validarJWT,
    validar_roles_1.esAdmin,
    validarCampos_1.validarCampos
], muestra_ctrl_1.eliminarFoto);
exports.default = router;
//# sourceMappingURL=muestra.rt.js.map