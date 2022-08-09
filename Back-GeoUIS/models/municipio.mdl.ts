import { DataTypes, Model } from "sequelize";
import db from "../db/connection";

export interface MunicipioInterface {
    id_municipio: string,
    nombre: string
}

class Municipio extends Model<MunicipioInterface> implements MunicipioInterface {
    id_municipio!: string;
    nombre!: string;
}

Municipio.init({
    id_municipio: {
        primaryKey: true,
        type: DataTypes.STRING,
        allowNull: false
    },    
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    }  
}, {
    timestamps: false,
    sequelize: db,
    tableName: 'municipios',
  });

export default Municipio;
