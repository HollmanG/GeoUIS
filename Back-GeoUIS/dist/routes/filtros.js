"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const filtros_ctrl_1 = require("../controllers/filtros.ctrl");
const router = (0, express_1.Router)();
router.get('/municipios', filtros_ctrl_1.getMunicipios);
router.get('/municipios/:id', filtros_ctrl_1.getMunicipio);
router.get('/tiposMuestra', filtros_ctrl_1.getTipoMuestra);
router.get('/ubicaciones', filtros_ctrl_1.getUbicaciones);
exports.default = router;
//# sourceMappingURL=filtros.js.map