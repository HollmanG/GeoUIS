import { DataTypes, Model } from "sequelize";
import db from "../db/connection";

export interface RolInterface {
    id_rol: number,
    nombre_rol: String
}

class Rol extends Model<RolInterface> implements RolInterface {
    id_rol!: number;
    nombre_rol!: String;
}

Rol.init({
    id_rol: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },    
    nombre_rol: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false,
    sequelize: db,
    tableName: 'roles',
  });

export default Rol;
