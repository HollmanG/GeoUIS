import { DataTypes, Model } from "sequelize";
import db from "../db/connection";

export interface MuestraInterface {
    id_muestra?: number,
    caracteristicas_fisicas?: string,
    fecha_recoleccion?: Date,
    fecha_ingreso?: Date,
    id_ubicacion?: number,
    nombre?: string,
    id_localizacion?: number,
    id_tipo_muestra?: number,
    edad?: number,
    mineralogia?: string,
    codigo?: string,
    formacion?: string
}

class Muestra extends Model<MuestraInterface> implements MuestraInterface {
    id_muestra?: number;
    caracteristicas_fisicas?: string;
    fecha_recoleccion?: Date;
    fecha_ingreso?: Date;
    id_ubicacion?: number;
    nombre?: string;
    id_localizacion?: number;
    id_tipo_muestra?: number;
    edad?: number;
    mineralogia?: string;
    codigo?: string;
    formacion?: string;
}

Muestra.init({
    id_muestra: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false
    },
    caracteristicas_fisicas : {
        type: DataTypes.STRING,
        allowNull: true
    }, 
    fecha_recoleccion : {
        type: DataTypes.DATE,
        allowNull: true
    }, 
    fecha_ingreso : {
        type: DataTypes.DATE,
        allowNull: true
    }, 
    id_ubicacion : {
        type: DataTypes.NUMBER,
        allowNull: true
    }, 
    nombre : {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    id_localizacion : {
        type: DataTypes.NUMBER,
        allowNull: true
    }, 
    id_tipo_muestra : {
        type: DataTypes.NUMBER,
        allowNull: false
    }, 
    edad : {
        type: DataTypes.NUMBER,
        allowNull: true
    }, 
    mineralogia : {
        type: DataTypes.STRING,
        allowNull: true
    }, 
    codigo : {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    formacion : {
        type: DataTypes.STRING,
        allowNull: true
    },    
}, {
    timestamps: false,
    sequelize: db,
    tableName: 'muestras',
  });

export default Muestra;
