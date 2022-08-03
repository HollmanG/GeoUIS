"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const muestra_ctrl_1 = require("../controllers/muestra.ctrl");
const router = (0, express_1.Router)();
router.get('/', muestra_ctrl_1.getMuestras);
router.get('/:id', muestra_ctrl_1.getMuestra);
exports.default = router;
//# sourceMappingURL=muestra.rt.js.map