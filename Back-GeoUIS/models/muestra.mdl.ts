import { DataTypes, Model } from "sequelize";
import db from "../db/connection";

export interface MuestraInterface {
    id_muestra?: number,
    textura?: string,
    fecha_recoleccion?: Date,
    fecha_ingreso?: Date,
    id_ubicacion?: number,
    nombre?: string,
    id_localizacion?: number,
    id_tipo_muestra?: number,
    edad?: number,
    composicion?: string,
    codigo?: string,
    formacion?: string,
    recolector?: string,
    color?: string,
    clasificacion?: string,
    seccion_delgada?: boolean,
    docente?: string,
    asignatura?: string,
    estructura?: string,
    descripcion_seccion_delgada?: string,
    size?: string
}

class Muestra extends Model<MuestraInterface> implements MuestraInterface {
    id_muestra?: number;
    textura?: string;
    fecha_recoleccion?: Date;
    fecha_ingreso?: Date;
    id_ubicacion?: number;
    nombre?: string;
    id_localizacion?: number;
    id_tipo_muestra?: number;
    edad?: number;
    composicion?: string;
    codigo?: string;
    formacion?: string;
    recolector?: string;
    color?: string;
    clasificacion?: string;
    seccion_delgada?: boolean;
    docente?: string;
    asignatura?: string;
    estructura?: string;
    descripcion_seccion_delgada?: string;
    size?: string;
}

Muestra.init({
    id_muestra: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false
    },
    textura : {
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
        allowNull: false
    }, 
    nombre : {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    id_localizacion : {
        type: DataTypes.NUMBER,
        allowNull: false
    }, 
    id_tipo_muestra : {
        type: DataTypes.NUMBER,
        allowNull: false
    }, 
    edad : {
        type: DataTypes.NUMBER,
        allowNull: true
    }, 
    composicion : {
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
    recolector: {
        type: DataTypes.STRING,
        allowNull: true
    },
    color: {
        type: DataTypes.STRING,
        allowNull: true
    },
    clasificacion: {
        type: DataTypes.STRING,
        allowNull: true
    },
    seccion_delgada: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    docente: {
        type: DataTypes.STRING,
        allowNull: true
    },
    asignatura: {
        type: DataTypes.STRING,
        allowNull: true
    },
    estructura: {
        type: DataTypes.STRING,
        allowNull: true
    },
    descripcion_seccion_delgada: {
        type: DataTypes.STRING,
        allowNull: true
    },
    size: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    timestamps: false,
    sequelize: db,
    tableName: 'muestras',
  });

export default Muestra;
