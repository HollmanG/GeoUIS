"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
class Foto extends sequelize_1.Model {
}
Foto.init({
    id_foto: {
        primaryKey: true,
        type: sequelize_1.DataTypes.NUMBER,
        autoIncrement: true,
        allowNull: false
    },
    id_muestra: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false
    },
    foto: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    }
}, {
    timestamps: false,
    sequelize: connection_1.default,
    tableName: 'fotos',
});
exports.default = Foto;
//# sourceMappingURL=foto.mdl.js.map