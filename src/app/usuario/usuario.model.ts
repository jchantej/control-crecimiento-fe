export interface Usuario {
    id?: number;
    username: string;
    password: string;
    correo: string;
    nombre?: string;
    apellido?: string;
    foto?: string;
    activo?: boolean;
}