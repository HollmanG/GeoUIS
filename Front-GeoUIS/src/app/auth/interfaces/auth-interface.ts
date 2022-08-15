

export interface AuthResponse {
    ok: boolean; 
    msg: string | {}; 
    id?: number;
    correo?: string;
    nombre?: string;
    token?: string;
    rol?:number;
}

export interface Usuario {
    id: number;
    correo: string;
    nombre: string;
    rol: number;
}

