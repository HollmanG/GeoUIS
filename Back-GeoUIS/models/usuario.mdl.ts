import { DataTypes, Model } from "sequelize";
import db from "../db/connection";

export interface UsuarioInterface {
    id?: number,
    nombre: string,
    correo: string,
    password: string,
    estado?: number,
    rol: number 
}

class Usuario extends Model<UsuarioInterface> implements UsuarioInterface {
    id?: number;
    nombre!: string;
    correo!: string;
    password!: string;
    estado?: number;
    rol!: number;

}

Usuario.init({
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },    
    correo: {
        type: DataTypes.STRING,
        allowNull: false
    },  
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },  
    estado: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    rol: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    timestamps: true,
    sequelize: db,
    tableName: 'usuarios',
  });

export default Usuario;
