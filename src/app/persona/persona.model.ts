export interface Persona {
    id?: number;
    nombre: string;
    apellido: string;
    fechaNacimiento: Date;
    genero: string;
    grupoSanguineo: string;
    foto?: string;
    activo?: boolean;
    idUsuario: number;
}