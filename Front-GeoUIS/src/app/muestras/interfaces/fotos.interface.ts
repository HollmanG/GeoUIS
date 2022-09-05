// interface structure picture
export interface Fotos {
    id_foto?: number;
    id_muestra: number;
    foto: string;
}

// interface response picture
export interface FotosResponse {
    ok: boolean; 
    msg: string | {}; 
    fotos: Fotos[];

}