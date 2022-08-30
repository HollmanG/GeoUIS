export interface Prestamo {
    id_prestamo?:       number;
    fecha_prestamo?:     Date;
    fecha_devolucion?:   Date;
    id_usuario?:         number;
    id_muestra?:         number;
    nombre_muestra?:    string;
    nombre_usuario?:    string;
    correo?:            string;
    tipo_muestra?:       string;
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