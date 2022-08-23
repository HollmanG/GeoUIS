import { DataTypes, Model } from "sequelize";
import db from "../db/connection";

export interface PrestamoInterface {
    id_prestamo?: number,
    fecha_prestamo?: Date,
    fecha_devolucion?: Date,
    id_usuario?: number,
    id_muestra?: number
}

class Prestamo extends Model<PrestamoInterface> implements PrestamoInterface {
    id_prestamo?: number;
    fecha_prestamo?: Date;
    fecha_devolucion?: Date;
    id_usuario?: number;
    id_muestra?: number;
}

Prestamo.init({
    id_prestamo: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false
    },
    fecha_prestamo : {
        type: DataTypes.DATE,
        allowNull: false
    },
    fecha_devolucion : {
        type: DataTypes.DATE,
        allowNull: true
    },
    id_usuario : {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_muestra : {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false,
    sequelize: db,
    tableName: 'prestamos',
  });

export default Prestamo;
