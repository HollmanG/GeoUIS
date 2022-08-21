export interface Ubicacion{
    id_ubicacion: number;
    descripcion: string;
}

export interface UbicacionResponse{
    ok:     boolean;
    msg:    string;
    ubicaciones: Ubicacion[];
}