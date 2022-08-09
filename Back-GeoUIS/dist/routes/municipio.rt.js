"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const municipio_ctrl_1 = require("../controllers/municipio.ctrl");
const router = (0, express_1.Router)();
router.get('/', municipio_ctrl_1.getMunicipios);
router.get('/:id', municipio_ctrl_1.getMunicipio);
exports.default = router;
//# sourceMappingURL=municipio.rt.js.map