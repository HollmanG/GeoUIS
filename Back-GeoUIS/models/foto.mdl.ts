import { DataTypes, Model } from "sequelize";
import db from "../db/connection";

export interface FotoInterface {
    id_foto?: number,
    id_muestra?: number,
    foto?: string
}

class Foto extends Model<FotoInterface> implements FotoInterface {
    id_foto?: number;
    id_muestra?: number;
    foto?: string;
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
    }
}, {
    timestamps: false,
    sequelize: db,
    tableName: 'fotos',
  });

export default Foto;
