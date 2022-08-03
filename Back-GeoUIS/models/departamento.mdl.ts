import { DataTypes, Model } from "sequelize";
import db from "../db/connection";

export interface DepartamentoInterface {
    id_departamento: number,
    nombre: String
}

class Departamento extends Model<DepartamentoInterface> implements DepartamentoInterface {
    id_departamento!: number;
    nombre!: String;
}

Departamento.init({
    id_departamento: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },    
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false,
    sequelize: db,
    tableName: 'departamentos',
  });

export default Departamento;
