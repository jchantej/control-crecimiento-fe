export interface ControlCrecimiento {
    id?: number;
    peso: number;
    talla: number;
    idPersona: number;
    edad?: number;
    observacionPeso?: string;
    observacionTalla?: string;
    fechaRegistro?: Date;
    edadPeriodo?: string;
}
