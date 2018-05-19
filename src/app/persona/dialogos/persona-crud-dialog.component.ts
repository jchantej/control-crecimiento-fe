
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
    styleUrls: ['./persona-crud-dialog.component.css'],
    templateUrl: './persona-crud-dialog.component.html'
})
export class PersonaCrudDialogComponent implements OnInit {
    form: FormGroup;
    readonlyElementId = false;
    readonlyElement = false;
    hiddenElement = false;
    hiddenElementButton = false;
    buttonNameOk: string;
    buttonNameCancel: string;
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
        private formBuilder: FormBuilder,
        private dialogRef: MatDialogRef<PersonaCrudDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data
    ) { }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            id: this.data ? this.data.id : '',
            name: this.data ? this.data.name : '',
            description: this.data ? this.data.description : ''
        });
        this.buttonNameCancel = 'Cancelar';
        this.changeStateControls();

    }

    submit(form) {
        this.dialogRef.close(`${form.value.id}`);
        this.dialogRef.close(`${form.value.name}`);
        this.dialogRef.close(`${form.value.description}`);
    }

    changeStateControls() {
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

    }
}


