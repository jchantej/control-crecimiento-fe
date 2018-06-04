
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatSnackBar } from '@angular/material';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { PersonaService } from '../../persona/persona.service';
import { Persona } from '../../persona/persona.model';
import { AuthService } from '../../servicios/auth.service';

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
    buttonNameOKCancel = 'Cancelar';
    title: string;
    generos = [
        { value: 'M', viewValue: 'Masculino' },
        { value: 'F', viewValue: 'Feminino' }
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
        private authService: AuthService,
        @Inject(MAT_DIALOG_DATA) private data
    ) {
        this.persona = { nombre: '', apellido: '', genero: '', grupoSanguineo: '', foto: '', idUsuario: 0 };
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
            foto: this.data.persona ? this.data.persona.foto : ''
        });
    }

    private personaMapData(): Persona {
        const formModel = this.personaForm.value;
        const personaMap: Persona = {
            nombre: formModel.nombre,
            apellido: formModel.apellido,
            fechaNacimiento: new Date(formModel.fechaNacimiento),
            genero: formModel.genero,
            grupoSanguineo: formModel.grupoSanguineo,
            foto: formModel.foto,
            idUsuario: this.userSession.id
        };
        return personaMap;
    }
    public onSubmit() {
        if (!this.personaForm.invalid) {
            if (this.data.action === 'CREATE') {
                this.crearPersona(this.personaMapData());
            } else if (this.data.action === 'UPDATE') {
                this.editarPersona(this.data.persona.id, this.personaMapData());
            }
        }
    }
    crearPersona(persona: Persona) {

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

    editarPersona(id: number, persona: Persona) {
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

    changeStateControls() {
        if (this.data.action === 'CREATE') {
            this.title = 'Crear Niño';
            this.visibleButtonCreate = true;
            this.visibleButtonUpdate = false;
            this.buttonNameOKCancel = 'Cancelar';
        } else if (this.data.action === 'READ') {
            this.title = 'Información Niñ@';
            this.visibleButtonCreate = false;
            this.visibleButtonUpdate = false;
            this.buttonNameOKCancel = 'Aceptar';
        } else if (this.data.action === 'UPDATE') {
            this.title = 'Editar Nin@';
            this.visibleButtonCreate = false;
            this.visibleButtonUpdate = true;
            this.buttonNameOKCancel = 'Cancelar';
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