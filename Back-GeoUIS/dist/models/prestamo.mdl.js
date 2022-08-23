"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
class Prestamo extends sequelize_1.Model {
}
Prestamo.init({
    id_prestamo: {
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false
    },
    fecha_prestamo: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    fecha_devolucion: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    id_usuario: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    id_muestra: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false,
    sequelize: connection_1.default,
    tableName: 'prestamos',
});
exports.default = Prestamo;
//# sourceMappingURL=prestamo.mdl.js.map