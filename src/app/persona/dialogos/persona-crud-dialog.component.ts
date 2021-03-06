
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatSnackBar } from '@angular/material';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { PersonaService } from '../../persona/persona.service';
import { Persona } from '../../persona/persona.model';
import { AuthService } from '../../servicios/auth.service';
import { Constantes } from '../../core/constantes';

@Component({
    styleUrls: ['./persona-crud-dialog.component.css'],
    templateUrl: './persona-crud-dialog.component.html'
})
export class PersonaCrudDialogComponent implements OnInit {
    userSession: any;
    persona: Persona;
    personaForm: FormGroup;
    visibleButtonCreate = false;
    visibleButtonUpdate = false;
    visibleButtonDelete = false;
    buttonNameOKCancel = 'Cancelar';
    title: string;
    message: string;
    generos = [
        { value: 'M', viewValue: 'Masculino' },
        { value: 'F', viewValue: 'Femenino' }
    ];

    grupoSanguineos = [
        { value: 'AP', viewValue: 'A+' },
        { value: 'BP', viewValue: 'B+' },
        { value: 'ABP', viewValue: 'AB+ ' },
        { value: 'OP', viewValue: 'O+' },
        { value: 'AN', viewValue: 'A-' },
        { value: 'BN', viewValue: 'B-' },
        { value: 'ABN', viewValue: 'AB- ' },
        { value: 'ON', viewValue: 'O-' }

    ];
    constructor(
        private personaService: PersonaService,
        private formBuilder: FormBuilder,
        private dialogRef: MatDialogRef<PersonaCrudDialogComponent>,
        private snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) private data
    ) {
        this.persona = { nombre: '', apellido: '', genero: '', grupoSanguineo: '', idUsuario: 0 };
    }

    ngOnInit(): void {
        this.userSession = JSON.parse(localStorage.getItem(AuthService.tokenKey));
        this.createForm();
        this.changeStateControls();
    }

    createForm() {
        this.personaForm = this.formBuilder.group({
            nombre: this.data.persona ? this.data.persona.nombre : '',
            apellido: this.data.persona ? this.data.persona.apellido : '',
            fechaNacimiento: this.data.persona ? new Date(this.data.persona.fechaNacimiento) : '',
            genero: this.data.persona ? this.data.persona.genero : '',
            grupoSanguineo: this.data.persona ? this.data.persona.grupoSanguineo : '',
        });

        if (this.data.action === 'DELETE' || this.data.action === 'READ') {
            this.personaForm.disable();
        }
    }

    private personaMapData(): Persona {
        const formModel = this.personaForm.value;
        const personaMap: Persona = {
            nombre: formModel.nombre,
            apellido: formModel.apellido,
            fechaNacimiento: new Date(formModel.fechaNacimiento),
            genero: formModel.genero,
            grupoSanguineo: formModel.grupoSanguineo,
            foto: this.data.persona.foto,
            idUsuario: this.userSession.id
        };
        return personaMap;
    }
    public onSubmit() {
        if (!this.personaForm.invalid) {
            if (this.data.action === 'CREATE') {
                this.crearPersona(this.personaMapData());
            } else if (this.data.action === 'UPDATE') {
                this.data.persona.foto = (this.data.persona.foto).substring(Constantes.URIFILE.length),
                    this.editarPersona(this.data.persona.id, this.personaMapData());
            } else if (this.data.action === 'DELETE') {
                this.eliminarPersona(this.data.persona.id);
            }
        }
    }
    private crearPersona(persona: Persona) {
        if (persona.foto === '' || persona.foto === null) {
            if (persona.genero === Constantes.generoMasculino) {
                persona.foto = Constantes.fotoDefaultNinio;
            } else if (persona.genero === Constantes.generoFemenino) {
                persona.foto = Constantes.fotoDefaultNinia;
            }
        }
        this.personaService.crear(persona).subscribe(
            () => {
                this.dialogRef.close();
                this.openSnackBar('OK.!', 'Datos almacenados correctamente');
            },
            error => {
                this.dialogRef.close();
                this.openSnackBar('UPS!!!', 'Intentelo mas tarde');
            }
        );

    }

    private editarPersona(id: number, persona: Persona) {
        this.personaService.editar(id, persona).subscribe(
            () => {
                this.dialogRef.close();
                this.openSnackBar('OK.!', 'Datos actualizados correctamente');
            },
            error => {
                this.dialogRef.close();
                this.openSnackBar('UPS!!!', 'Intentelo más tarde');
            }
        );

    }

    private eliminarPersona(id: number) {
        this.personaService.eliminar(id).subscribe(
            () => {
                this.dialogRef.close();
                this.openSnackBar('OK.!', 'Datos eliminados correctamente');
            },
            error => {
                this.dialogRef.close();
                this.openSnackBar('UPS!!!', 'Intentelo más tarde');
            }
        );

    }

    private changeStateControls() {
        if (this.data.action === 'CREATE') {
            this.title = 'Crear Niño';
            this.visibleButtonCreate = true;
            this.visibleButtonUpdate = false;
            this.visibleButtonDelete = false;
            this.buttonNameOKCancel = 'Cancelar';
        } else if (this.data.action === 'READ') {
            this.title = 'Información Niñ@';
            this.visibleButtonCreate = false;
            this.visibleButtonUpdate = false;
            this.visibleButtonDelete = false;
            this.buttonNameOKCancel = 'Aceptar';
        } else if (this.data.action === 'UPDATE') {
            this.title = 'Editar Nin@';
            this.visibleButtonUpdate = true;
            this.visibleButtonCreate = false;
            this.visibleButtonDelete = false;
            this.buttonNameOKCancel = 'Cancelar';
        } else if (this.data.action === 'DELETE') {
            this.title = 'Dar de baja Nin@';
            this.visibleButtonDelete = true;
            this.visibleButtonUpdate = false;
            this.visibleButtonCreate = false;
            this.buttonNameOKCancel = 'Cancelar';
            this.message = 'Seguro que desea Eliminar al Nin@...?';
        } else {
            console.log('Opciones no contempladas');
        }
    }
    openSnackBar(title: string, message: string) {
        this.snackBar.open(title, message, {
            duration: 8000,
        });
    }
}
