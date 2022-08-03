"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
class Municipio extends sequelize_1.Model {
}
Municipio.init({
    id_municipio: {
        primaryKey: true,
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    id_departamento: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
}, {
    timestamps: false,
    sequelize: connection_1.default,
    tableName: 'municipios',
});
exports.default = Municipio;
//# sourceMappingURL=municipio.mdl.js.map