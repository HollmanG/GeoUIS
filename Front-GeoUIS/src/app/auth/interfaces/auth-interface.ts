
// Interface response auth
export interface AuthResponse {
    ok: boolean; 
    msg: string | {}; 
    id?: number;
    correo?: string;
    nombre?: string;
    token?: string;
    rol?:number;
}

// Interface user
export interface Usuario {
    id: number;
    correo: string;
    nombre: string;
    rol: number;
}

// Interface response auth validar
export interface AuthResponseValidar{
    ok: boolean;
}

