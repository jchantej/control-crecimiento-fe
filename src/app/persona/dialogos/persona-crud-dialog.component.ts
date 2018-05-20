
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatSnackBar } from '@angular/material';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { PersonaService } from '../../persona/persona.service';
import { Persona } from '../../persona/persona.model';
@Component({
    styleUrls: ['./persona-crud-dialog.component.css'],
    templateUrl: './persona-crud-dialog.component.html'
})
export class PersonaCrudDialogComponent implements OnInit {
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
        @Inject(MAT_DIALOG_DATA) private data,
    ) {
        this.createForm();
    }

    ngOnInit(): void {
        this.changeStateControls();
    }

    createForm() {
        this.personaForm = this.formBuilder.group({
            nombre: '',
            apellido: '',
            fechaNacimiento: '',
            genero: '',
            grupoSanguineo: '',
            foto: ''
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
            idUsuario: 1 //TODO:  Aqui se deb setear el valor del id del usauario en sesion
        };
        return personaMap;
    }
    public onSubmit() {
        this.personaService.crear(this.personaMapData()).subscribe(
            () => {
                this.dialogRef.close();
                if (this.data.action === 'CREATE') {
                    this.openSnackBar('OK.!', 'Datos almacenados correctamente');
                } else if (this.data.action === 'UPDATE') {
                   //TODO: para update
                }
            },
            error => {
                this.dialogRef.close();
                this.openSnackBar('UPS!!!', 'Intentelo mas tarde');
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