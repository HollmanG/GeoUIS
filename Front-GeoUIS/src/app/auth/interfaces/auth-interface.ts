

export interface AuthResponse {
    ok: boolean; 
    msg: string | {}; 
    id?: number;
    correo?: string;
    nombre?: string;
    token?: string;
}

export interface Usuario {
    id: number;
    correo: string;
    nombre: string;

}

