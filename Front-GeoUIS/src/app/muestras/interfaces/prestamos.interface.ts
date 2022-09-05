// loan interface
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
// loan interface avaliable response 
export interface PrestamoDisponibleResponse {
    ok: boolean; 
    msg: string | {}; 
    disponible: boolean;

}
// loan interface response
export interface PrestamoResponse {
    ok: boolean; 
    msg: string | {}; 
    prestamo: Prestamo;

}

export interface PrestamosResponse {
    ok: boolean; 
    msg: string | {}; 
    prestamos: Prestamo[];

}

export interface PrestamosUsuarioResponse {
    ok: boolean; 
    msg: string | {}; 
    prestamo: Prestamo[];

}