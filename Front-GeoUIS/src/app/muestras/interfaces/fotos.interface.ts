export interface Fotos {
    id_foto?: number;
    id_muestra: number;
    foto: string;
}

export interface FotosResponse {
    ok: boolean; 
    msg: string | {}; 
    fotos?: Fotos[];

}