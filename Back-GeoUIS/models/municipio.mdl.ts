import { DataTypes, Model } from "sequelize";
import db from "../db/connection";

export interface MunicipioInterface {
    id_municipio: string,
    nombre: string,
    id_departamento: number
}

class Municipio extends Model<MunicipioInterface> implements MunicipioInterface {
    id_municipio!: string;
    nombre!: string;
    id_departamento!: number;
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
    },
    id_departamento: {
        type: DataTypes.INTEGER,
        allowNull: false
    },   
}, {
    timestamps: false,
    sequelize: db,
    tableName: 'municipios',
  });

export default Municipio;
