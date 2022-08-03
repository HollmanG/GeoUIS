"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
class Departamento extends sequelize_1.Model {
}
Departamento.init({
    id_departamento: {
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false,
    sequelize: connection_1.default,
    tableName: 'departamentos',
});
exports.default = Departamento;
//# sourceMappingURL=departamento.mdl.js.map