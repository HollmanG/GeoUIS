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
        autoIncrement: true,
        allowNull: false
    },
    caracteristicas_fisicas: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    fecha_recoleccion: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    fecha_ingreso: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    id_ubicacion: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: true
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    id_localizacion: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: true
    },
    id_tipo_muestra: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false
    },
    edad: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: true
    },
    mineralogia: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    codigo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    formacion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
}, {
    timestamps: false,
    sequelize: connection_1.default,
    tableName: 'muestras',
});
exports.default = Muestra;
//# sourceMappingURL=muestra.mdl.js.map