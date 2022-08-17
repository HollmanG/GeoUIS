"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
class Ubicacion extends sequelize_1.Model {
}
Ubicacion.init({
    id_ubicacion: {
        primaryKey: true,
        type: sequelize_1.DataTypes.NUMBER,
        autoIncrement: true,
        allowNull: false
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false,
    sequelize: connection_1.default,
    tableName: 'ubicaciones',
});
exports.default = Ubicacion;
//# sourceMappingURL=ubicacion.mdl.js.map