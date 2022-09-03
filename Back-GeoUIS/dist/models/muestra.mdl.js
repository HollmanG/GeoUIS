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
    textura: {
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
        allowNull: false
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    id_localizacion: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false
    },
    id_tipo_muestra: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false
    },
    edad: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: true
    },
    composicion: {
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
    recolector: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    color: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    clasificacion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    seccion_delgada: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true
    },
    docente: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    asignatura: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    estructura: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    descripcion_seccion_delgada: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    size: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    }
}, {
    timestamps: false,
    sequelize: connection_1.default,
    tableName: 'muestras',
});
exports.default = Muestra;
//# sourceMappingURL=muestra.mdl.js.map