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
  dataSourcePersonas: MatTableDataSource<Persona>;
  displayedColumns = ['id', 'nombre', 'apellido', 'genero', 'fechaNacimiento', 'actionsColumn'];
  personaDialogRef: MatDialogRef<PersonaCrudDialogComponent>;
  constructor(private personaService: PersonaService,
    private personaDialogMat: MatDialog) {

  }

  ngOnInit() {
    this.sincronizarData();

  }

  sincronizarData() {
    this.personaService.getListaPersonas().subscribe(
      persona => this.dataSourcePersonas = new MatTableDataSource<Persona>(persona)
    );

  }

  prepareCreate() {
    this.openDialog(0, 'CREATE');
  }

  openDialog(idPersona?: number, action?: string) {
    this.personaDialogRef = this.personaDialogMat.open(PersonaCrudDialogComponent, {
      data: {
        idPersona: idPersona,
        action: action
      }
    });

    this.personaDialogRef.afterClosed().subscribe(
      () => this.sincronizarData());

  }

}
