export interface Muestra {
    id_muestra?:                number;
    nombre:                     string;
    id_tipo_muestra:            number;
    codigo:                     string;
    caracteristicas_fisicas?:    string;
    fecha_recoleccion?:         Date;
    fecha_ingreso?:             Date;
    id_ubicacion?:              number;
    id_localizacion?:           number;
    edad?:                      number;
    mineralogia?:               string;
    formacion?:                 string;
    ubicacion?:                 string;
    localizacion_geografica?:   string;
    localizacion_geologica?:    string;
    id_municipio?:              string;
    tipo_muestra?:              string;
    lng?:                       number;
    lat?:                       number;

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

export interface MuestraResponses {
    ok: boolean; 
    msg: string | {}; 
    muestra?: Muestra[]

}

export interface MuestraResponse {
    ok: boolean; 
    msg: string | {}; 
    muestra?: Muestra

}

export interface TipoMuestra {
    id_tipo_muestra: number;
    nombre:          string;
}


export interface TipoMuestraResponse {
    ok: boolean;
    msg: string | {};
    tiposMuestra: TipoMuestra[]
}
