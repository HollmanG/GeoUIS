"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
class Rol extends sequelize_1.Model {
}
Rol.init({
    id_rol: {
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    nombre_rol: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false,
    sequelize: connection_1.default,
    tableName: 'roles',
});
exports.default = Rol;
//# sourceMappingURL=rol.mdl.js.map