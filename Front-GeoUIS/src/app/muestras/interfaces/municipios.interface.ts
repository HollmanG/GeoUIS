// interface structure township
export interface Municipio{
    id_municipio:   string;
    nombre:         string;
}
// interface response township
export interface MunicipioResponse{
    ok: boolean;
    msg: string | {};
    municipios: Municipio[];
}