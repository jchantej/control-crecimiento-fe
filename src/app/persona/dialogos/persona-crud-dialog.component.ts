
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { PersonaService } from '../../persona/persona.service';
import { Persona } from '../../persona/persona.model';
@Component({
    styleUrls: ['./persona-crud-dialog.component.css'],
    templateUrl: './persona-crud-dialog.component.html'
})
export class PersonaCrudDialogComponent implements OnInit {
    personaForm: FormGroup;
    readonlyElementId = false;
    readonlyElement = false;
    hiddenElement = false;
    hiddenElementButton = false;
    buttonNameOk: string;
    buttonNameCancel = 'Cancelar';
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
        private dialog: MatDialog,
        private personaService: PersonaService,
        private formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) private data
    ) {
        this.createForm();
    }

    ngOnInit(): void {

        this.buttonNameCancel = 'Cancelar';
        // this.changeStateControls();

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
        console.log(formModel);
        const personaMap: Persona = {
            nombre: formModel.nombre,
            apellido: formModel.apellido,
            fechaNacimiento: new Date(formModel.fechaNacimiento),
            genero: formModel.genero,
            grupoSanguineo: formModel.grupoSanguineo,
            foto: formModel.foto
        };
        return personaMap;
    }
    public onSubmit() {
        //this.persona.id = 3;
        this.personaService.crear(this.personaMapData());
        this.dialog.closeAll();
    }
    /* changeStateControls() {
         if (this.data.action === 'CREATE') {
             this.title = 'Crear Niñ@';
             this.buttonNameOk = 'Crear';
             this.hiddenElementButton = true;
         } else if (this.data.action === 'READ') {
             this.title = 'Información Niñ@';
             this.buttonNameCancel = 'Cerrar';
             this.readonlyElement = true;
             this.readonlyElementId = true;
             this.hiddenElement = true;
         } else if (this.data.action === 'UPDATE') {
             this.title = 'Editar Nin@';
             this.buttonNameOk = 'Editar';
             this.readonlyElementId = true;
             this.hiddenElement = true;
             this.hiddenElementButton = true;
         } else {
             console.log('Opciones no contempladas');
         }
 
     }*/
}


