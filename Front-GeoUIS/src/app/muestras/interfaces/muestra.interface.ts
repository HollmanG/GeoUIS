export interface Muestra {
    id_muestra?:                number;
    caracteristicas_fisicas?:    string;
    fecha_recoleccion?:         Date;
    fecha_ingreso?:             Date;
    id_ubicacion?:              number;
    nombre:                     string;
    id_localizacion?:           number;
    id_tipo_muestra:            number;
    edad?:                      number;
    mineralogia?:               string;
    codigo:                     string;
    formacion?:                 string;
    ubicacion?:                 string;
    punto?:                     Punto;
    localizacion_geografica?:   string;
    localizacion_geologica?:    string;
    id_municipio?:              string;

}

export interface Punto {
    crs:{
        type:   string;
        properties: {
            name:   string;
        }
    }
    type: string;
    coordinates: number[];

}

export interface MuestrasResponse {
    ok: boolean; 
    msg: string | {}; 
    muestras?: Muestra[];

}

export interface MuestraResponse {
    ok: boolean; 
    msg: string | {}; 
    muestra?: Muestra;

}