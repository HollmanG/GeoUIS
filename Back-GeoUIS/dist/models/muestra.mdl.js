"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
class Muestra extends sequelize_1.Model {
}
Muestra.init({
    id_muestra: {
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    foto: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    lon: {
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    lat: {
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    descripcion: {
        primaryKey: true,
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    fecha_recoleccion: {
        primaryKey: true,
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    fecha_ingreso: {
        primaryKey: true,
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    id_municipio: {
        primaryKey: true,
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    id_departamento: {
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    id_ubicacion: {
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false,
    sequelize: connection_1.default,
    tableName: 'muestras',
});
exports.default = Muestra;
//# sourceMappingURL=muestra.mdl.js.map