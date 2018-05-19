import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Persona } from './persona.model';
import { PersonaService } from './persona.service';
import { MatTableDataSource, MatDialogRef, MatDialog } from '@angular/material';
import { PersonaCrudDialogComponent } from './dialogos/persona-crud-dialog.component';
@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {
  personas: Persona[];
  persona: Persona;
  dataSourcePersonas: MatTableDataSource<Persona>;
  registerForm: FormGroup;
  displayedColumns = ['id', 'nombre', 'apellido', 'genero', 'actionsColumn'];

  personaDialogRef: MatDialogRef<PersonaCrudDialogComponent>;
  constructor(private personaService: PersonaService,
    private formBuilder: FormBuilder,
    private personaDialogMat: MatDialog) {
    this.createForm();
    this.persona = { id: 0, nombre: '', apellido: '', fechaNacimiento: new Date(), grupoSanguineo: '', genero: '' };
  }

  ngOnInit() {
    this.personas = this.personaService.getPersonas();
    console.log(this.personas);
    // this.personaService.getListaPersonas().subscribe(p => this.personas = p);
    this.dataSourcePersonas = new MatTableDataSource(this.personas);

  }

  createForm() {
    this.registerForm = this.formBuilder.group({
      nombre: '',
      apellido: '',
      fechaNacimiento: '',
      genero: '',
      grupoSanguineo: '',
      foto: ''
    });
  }

  private prepareCreate1(): Persona {
    const formModel = this.registerForm.value;
    const personaMap: Persona = {
      nombre: formModel.nombre,
      apellido: formModel.apellido,
      fechaNacimiento: new Date(formModel.fechaNacimiento),
      grupoSanguineo: formModel.grupoSanguineo,
      foto: formModel.foto
    };
    return personaMap;
  }
  /* crear() {
 
     this.personaService.crear(persona);
   }*/

  /* public onSubmit() {
     //this.persona.id = 3;
     this.personaService.crear(this.prepareCreate());
 
   }*/

  prepareCreate() {
    this.openDialog('', 'CREATE');
  }

  openDialog(persona?, action?) {
    this.personaDialogRef = this.personaDialogMat.open(PersonaCrudDialogComponent, {
      data: {
        id: persona.id,
        name: persona.nombre,
        description: persona.apellido,
        action: action
      }
    });

    /*    this.personaDialogRef.afterClosed()
          .subscribe(result => {
            if (result) {
              const index = this.items.findIndex(f => f.id === item.id);
              if (index !== -1) {
                this.updateItem.id = result.id;
                this.updateItem.name = result.name;
                this.updateItem.description = result.description;
                this.save();
    
              } else {
               /* this.creationItem.id = result.id;
                this.creationItem.name = result.name;
                this.creationItem.description = result.description;
                this.create();*/
  }
}
        });
  }

}
