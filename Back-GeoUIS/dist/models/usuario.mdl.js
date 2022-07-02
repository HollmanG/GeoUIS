"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
class Usuario extends sequelize_1.Model {
}
Usuario.init({
    id: {
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    correo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    estado: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    rol: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    }
}, {
    timestamps: true,
    sequelize: connection_1.default,
    tableName: 'usuarios',
});
exports.default = Usuario;
//# sourceMappingURL=usuario.mdl.js.map