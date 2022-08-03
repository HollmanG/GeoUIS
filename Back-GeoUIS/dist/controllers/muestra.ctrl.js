"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMuestra = exports.getMuestras = void 0;
const muestra_mdl_1 = __importDefault(require("../models/muestra.mdl"));
const getMuestras = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const muestras = yield muestra_mdl_1.default.findAll();
    return res.json({
        ok: true,
        msg: 'getMuestras',
        muestras
    });
});
exports.getMuestras = getMuestras;
const getMuestra = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const muestra = yield muestra_mdl_1.default.findByPk(id);
    return res.json({
        ok: true,
        msg: 'getMuestra',
        muestra
    });
});
exports.getMuestra = getMuestra;
//# sourceMappingURL=muestra.ctrl.js.map