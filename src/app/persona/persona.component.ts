import { Component, OnInit, ViewChild } from '@angular/core';
import { Persona } from './persona.model';
import { PersonaService } from './persona.service';
import { MatTableDataSource, MatDialogRef, MatDialog } from '@angular/material';
import { PersonaCrudDialogComponent } from './dialogos/persona-crud-dialog.component';
import { AuthService } from '../servicios/auth.service';
@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {
  userSession: any;
  dataSourcePersonas: MatTableDataSource<Persona>;
  displayedColumns = ['id', 'nombre', 'apellido', 'genero', 'fechaNacimiento', 'actionsColumn'];
  personaDialogRef: MatDialogRef<PersonaCrudDialogComponent>;
  constructor(private personaService: PersonaService,
    private personaDialogMat: MatDialog,
    private authService: AuthService) {


  }

  ngOnInit() {
   this.userSession = JSON.parse(localStorage.getItem(AuthService.tokenKey));
    //TODO:Pendiente de mejorar la parte control de la session
    if (this.userSession !== null) {
      this.authService.loggedIn.next(true);
    } else {
      this.authService.logout();
    }

    this.sincronizarData();

  }

  sincronizarData() {
    this.personaService.getListaPersonas(this.userSession.id).subscribe(
      persona => this.dataSourcePersonas = new MatTableDataSource<Persona>(persona)
    );

  }

  prepareCreate() {
    this.openDialog(0, 'CREATE');
  }

  prepareUpdate(item) {
    this.openDialog( item, 'UPDATE');
  }

  prepareDelete(item) {
    this.openDialog( item, 'DELETE');
  }

  openDialog(item?: number, action?: string) {
    this.personaDialogRef = this.personaDialogMat.open(PersonaCrudDialogComponent, {
      data: {
        persona: item,
        action: action
      }
    });

    this.personaDialogRef.afterClosed().subscribe(
      () => this.sincronizarData());

  }

}
