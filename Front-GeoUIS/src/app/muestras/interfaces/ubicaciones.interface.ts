export interface Ubicacion{
    id_ubicacion: string;
    descripcion: string;
}

export interface UbicacionResponse{
    ok:     boolean;
    msg:    string;
    ubicaciones: Ubicacion[];
}