import { DataTypes, Model } from "sequelize";
import db from "../db/connection";

export interface UbicacionInterface {
    id_ubicacion?: number,
    descripcion?: string
}

class Ubicacion extends Model<UbicacionInterface> implements UbicacionInterface {
    id_ubicacion?: number;
    descripcion?: string;
}

Ubicacion.init({
    id_ubicacion: {
        primaryKey: true,
        type: DataTypes.NUMBER,
        autoIncrement: true,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false,
    sequelize: db,
    tableName: 'ubicaciones',
  });

export default Ubicacion;
