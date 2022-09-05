// interface structure sample
export interface Muestra {
    id_muestra?:                number;
    textura?:                   string;
    nombre:                     string;
    id_tipo_muestra:            number;
    codigo:                     string;
    fecha_recoleccion?:         Date;
    fecha_ingreso?:             Date;
    id_ubicacion:              number;
    id_localizacion:           number;
    edad?:                      number;
    composicion?:               string;
    formacion?:                 string;
    recolector?:                string;
    color?:                     string;
    clasificacion?:             string;
    seccion_delgada:           boolean;
    docente?:                   string;
    asignatura?:                string;
    estructura?:                string;
    descripcion_seccion_delgada?:   string;
    size?:                      string;
    ubicacion?:                 string;
    localizacion_geografica?:   string;
    localizacion_geologica?:    string;
    id_municipio?:              string;
    tipo_muestra?:              string;
    x?:                       number;
    y?:                       number;
    z?:                       number;

}

// interface structure point
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
// interface response sample
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
