export interface Municipio{
    id_municipio:   string;
    nombre:         string;
}

export interface MunicipioResponse{
    ok: boolean;
    msg: string | {};
    municipios: Municipio[];
}