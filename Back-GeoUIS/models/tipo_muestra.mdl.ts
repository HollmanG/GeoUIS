import { DataTypes, Model } from "sequelize";
import db from "../db/connection";

export interface TipoMuestraInterface {
    id_tipo_muestra?: number,
    descripcion?: string
}

class TipoMuestra extends Model<TipoMuestraInterface> implements TipoMuestraInterface {
    id_tipo_muestra?: number;
    descripcion?: string;
}

TipoMuestra.init({
    id_tipo_muestra: {
        primaryKey: true,
        type: DataTypes.NUMBER,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false,
    sequelize: db,
    tableName: 'tipos_muestras',
  });

export default TipoMuestra;
