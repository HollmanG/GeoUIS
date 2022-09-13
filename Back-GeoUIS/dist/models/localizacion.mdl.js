"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
class Localizacion extends sequelize_1.Model {
}
Localizacion.init({
    id_localizacion: {
        primaryKey: true,
        type: sequelize_1.DataTypes.NUMBER,
        autoIncrement: true,
        allowNull: false
    },
    punto: {
        type: sequelize_1.DataTypes.GEOMETRY,
        allowNull: true
    },
    localizacion_geografica: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    localizacion_geologica: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    id_municipio: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    }
}, {
    timestamps: false,
    sequelize: connection_1.default,
    tableName: 'localizaciones',
});
exports.default = Localizacion;
//# sourceMappingURL=localizacion.mdl.js.map