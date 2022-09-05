// location interface
export interface Ubicacion{
    id_ubicacion: number;
    descripcion: string;
}

// location interface response
export interface UbicacionResponse{
    ok:     boolean;
    msg:    string;
    ubicaciones: Ubicacion[];
}