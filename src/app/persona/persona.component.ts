import { Component, OnInit, ViewChild } from '@angular/core';
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
  displayedColumns = ['id', 'nombre', 'apellido', 'genero', 'fechaNacimiento', 'actionsColumn'];

  personaDialogRef: MatDialogRef<PersonaCrudDialogComponent>;
  constructor(private personaService: PersonaService,
    private personaDialogMat: MatDialog) {
    this.persona = { id: 0, nombre: '', apellido: '', fechaNacimiento: new Date(), grupoSanguineo: '', genero: '' };
  }

  ngOnInit() {
    this.personas = this.personaService.getPersonas();
    // this.personaService.getListaPersonas().subscribe(p => this.personas = p);
    this.sincronizarData();

  }

  sincronizarData() {
    this.dataSourcePersonas = new MatTableDataSource(this.personas);
  }

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

    this.personaDialogRef.afterClosed().subscribe(
      () => this.sincronizarData());

    /*   this.personaDialogRef.afterClosed()
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
                this.create();
  }
}
        });*/
  }

}
