import { DataTypes, Model } from 'sequelize';
import db from "../db/connection";

export interface LocalizacionInterface {
    id_localizacion?: number,
    punto?: object,
    localizacion_geografica?: string,
    localizacion_geologica?: string,
    id_municipio?: string
}

class Localizacion extends Model<LocalizacionInterface> implements LocalizacionInterface {
    id_localizacion?: number;
    punto?: object;
    localizacion_geografica?: string;
    localizacion_geologica?: string;
    id_municipio?: string
}

Localizacion.init({
    id_localizacion: {
        primaryKey: true,
        type: DataTypes.NUMBER,
        autoIncrement: true,
        allowNull: false
    },
    punto: {
        type: DataTypes.GEOMETRY,
        allowNull: true
    },
    localizacion_geografica: {
        type: DataTypes.STRING,
        allowNull: true
    },  
    localizacion_geologica: {
        type: DataTypes.STRING,
        allowNull: true
    },  
    id_municipio: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    timestamps: false,
    sequelize: db,
    tableName: 'localizaciones',
  });

export default Localizacion;
