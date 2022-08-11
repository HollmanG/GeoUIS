export interface Muestra {
    id_muestra?:                number;
    caracteristicas_fisicas:    string;
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
}

export interface MuestrasResponse {
    ok: boolean; 
    msg: string | {}; 
    muestras: Muestra[];

}

export interface MuestraResponse {
    ok: boolean; 
    msg: string | {}; 
    muestra: Muestra;

}