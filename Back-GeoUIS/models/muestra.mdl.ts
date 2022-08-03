import { DataTypes, Model } from "sequelize";
import db from "../db/connection";

export interface MuestraInterface {
    id_muestra?: number,
    foto: string,
    lon: number,
    lat: number,
    descripcion: string,
    fecha_recoleccion: Date,
    fecha_ingreso: Date,
    id_municipio: string,
    id_departamento: number,
    id_ubicacion: number
}

class Muestra extends Model<MuestraInterface> implements MuestraInterface {
    id_muestra?: number;
    foto!: string;
    lon!: number;
    lat!: number;
    descripcion!: string;
    fecha_recoleccion!: Date;
    fecha_ingreso!: Date;
    id_municipio!: string;
    id_departamento!: number;
    id_ubicacion!: number;
}

Muestra.init({
    id_muestra: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },   
    foto: {
        type: DataTypes.STRING,
        allowNull: true
    }, 
    lon: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    lat: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    descripcion: {
        primaryKey: true,
        type: DataTypes.STRING,
        allowNull: false
    },
    fecha_recoleccion: {
        primaryKey: true,
        type: DataTypes.DATE,
        allowNull: false
    },
    fecha_ingreso: {
        primaryKey: true,
        type: DataTypes.DATE,
        allowNull: false
    },
    id_municipio: {
        primaryKey: true,
        type: DataTypes.STRING,
        allowNull: false
    },
    id_departamento: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_ubicacion: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false,
    sequelize: db,
    tableName: 'muestras',
  });

export default Muestra;
