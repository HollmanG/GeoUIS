import { DataTypes, Model } from "sequelize";
import db from "../db/connection";

export interface FotoInterface {
    id_foto?: number,
    id_muestra?: number,
    foto?: string,
    descripcion?: string
}

class Foto extends Model<FotoInterface> implements FotoInterface {
    id_foto?: number;
    id_muestra?: number;
    foto?: string;
    descripcion?: string;
}

Foto.init({
    id_foto: {
        primaryKey: true,
        type: DataTypes.NUMBER,
        autoIncrement: true,
        allowNull: false
    },  
    id_muestra: {
        type: DataTypes.NUMBER,
        allowNull: false
    },  
    foto: {
        type: DataTypes.STRING,
        allowNull: false
    },  
    descripcion: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    timestamps: false,
    sequelize: db,
    tableName: 'fotos',
  });

export default Foto;
