"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
class TipoMuestra extends sequelize_1.Model {
}
TipoMuestra.init({
    id_tipo_muestra: {
        primaryKey: true,
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false,
    sequelize: connection_1.default,
    tableName: 'tipos_muestras',
});
exports.default = TipoMuestra;
//# sourceMappingURL=tipo_muestra.mdl.js.map