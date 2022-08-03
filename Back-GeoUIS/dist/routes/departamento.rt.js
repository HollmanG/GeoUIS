"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const departamento_ctrl_1 = require("../controllers/departamento.ctrl");
const router = (0, express_1.Router)();
router.get('/departamentos', departamento_ctrl_1.getDepartamentos);
//# sourceMappingURL=departamento.rt.js.map