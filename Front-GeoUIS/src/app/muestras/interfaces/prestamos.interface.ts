export interface Prestamo {
    id_prestamo?:       number;
    fecha_prestamo?:     Date;
    fecha_devolucion?:   Date;
    id_usuario?:         number;
    id_muestra?:         number;
}

export interface PrestamoDisponibleResponse {
    ok: boolean; 
    msg: string | {}; 
    disponible: boolean;

}

export interface PrestamoResponse {
    ok: boolean; 
    msg: string | {}; 
    prestamo: Prestamo;

}