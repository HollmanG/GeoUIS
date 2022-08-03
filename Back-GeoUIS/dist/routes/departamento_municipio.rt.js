"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const departamento_municipio_ctrl_1 = require("../controllers/departamento_municipio.ctrl");
const router = (0, express_1.Router)();
router.get('/departamentos', departamento_municipio_ctrl_1.getDepartamentos);
router.get('/municipios', departamento_municipio_ctrl_1.getMunicipios);
router.get('/municipios/:id_departamento', departamento_municipio_ctrl_1.getMunicipiosPorDpto);
exports.default = router;
//# sourceMappingURL=departamento_municipio.rt.js.map