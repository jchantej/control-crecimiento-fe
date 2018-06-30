export interface Persona {
    id?: number;
    nombre: string;
    apellido: string;
    fechaNacimiento?: Date;
    edadDias?: number;
    periodoEdad?: string;
    genero: string;
    grupoSanguineo: string;
    foto?: string;
    activo?: boolean;
    idUsuario: number;
}
