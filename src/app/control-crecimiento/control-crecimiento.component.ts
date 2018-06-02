import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ControlCrecimiento } from './control-crecimiento.model';
import { ControlCrecimientoService } from './control-crecimiento.service';
import { MatSnackBar, MatTableDataSource } from '@angular/material';
import { PercentilOmsComponent } from '../percentil-oms/percentil-oms.component';
import { Persona } from '../persona/persona.model';
import { PersonaService } from '../persona/persona.service';
import { AuthService } from '../servicios/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-control-crecimiento',
  templateUrl: './control-crecimiento.component.html',
  styleUrls: ['./control-crecimiento.component.css']
})
export class ControlCrecimientoComponent implements OnInit {
  tipo: any;
  userSession: any;
  dataSourceControles: MatTableDataSource<ControlCrecimiento>;
  displayedColumns = ['fecha', 'edad', 'peso', 'talla', 'actionsColumn'];
  selectedPersona: Persona;
  personas: Persona[];
  controlForm: FormGroup;
  idPersona: number;
  controlesCrecimiento: ControlCrecimiento[];
  tipos = [
    { value: 'P', viewValue: 'Peso', checked: 'true' },
    { value: 'T', viewValue: 'Talla', checked: 'false' }
  ];
  @ViewChild(PercentilOmsComponent) percentilOms: PercentilOmsComponent;
  constructor(private formBuilder: FormBuilder,
    private controlCrecimientoService: ControlCrecimientoService,
    private personaService: PersonaService,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router) {

    this.selectedPersona = { nombre: '', apellido: '', genero: '', grupoSanguineo: '', idUsuario: 0 }
  }
  ngOnInit() {


    this.userSession = JSON.parse(localStorage.getItem(AuthService.tokenKey));
    //TODO:Pendiente de mejorar la parte control de la session
    if (this.userSession !== null) {
      this.authService.loggedIn.next(true);
    } else {
      this.authService.logout();
    }

    this.getPersonas();
    this.createForm();

  }

  sincronizarData() {
    this.getControlesCrecimiento();
  }
  getControlesCrecimiento() {
    if (this.tipo === undefined) {
      this.tipo = { value: 'P', viewValue: 'Peso', checked: 'true' }
    }
    this.controlCrecimientoService.getControlesCrecimiento(this.selectedPersona.id).subscribe(
      controles => {
        this.dataSourceControles = new MatTableDataSource<ControlCrecimiento>(controles);
        this.percentilOms.sincronizarData(controles, this.selectedPersona, this.tipo);
      }
    );
  }
  getPersonas() {
    this.personaService.getListaPersonas(this.userSession.id).subscribe(
      persona => this.personas = persona
    );
  }
  createForm() {
    this.controlForm = this.formBuilder.group({
      peso: ['', Validators.required],
      talla: ['', Validators.required]
    });
  }


  private controlMapData(): ControlCrecimiento {
    const formModel = this.controlForm.value;
    const controlMap: ControlCrecimiento = {
      peso: formModel.peso,
      talla: formModel.talla,
      idPersona: this.selectedPersona.id
    };
    return controlMap;
  }

  public onSubmit() {
    if (this.selectedPersona.nombre) {
      if (!this.controlForm.invalid) {
        this.controlCrecimientoService.crear(this.controlMapData()).subscribe(
          () => {
            this.openSnackBar('OK.!', 'Control agregado correctamente');
            this.sincronizarData();
          },
          error => {
            this.openSnackBar('UPS!!!', 'Intentelo mas tarde');
          }
        );
      }

    } else {
      this.openSnackBar('Selecionar:!!!', 'Debe seleccionar un niño de su lista');
    }

  }

  openSnackBar(title: string, message: string) {
    this.snackBar.open(title, message, {
      duration: 8000,
    });
  }

  onSelectionChange(tipo) {
    this.tipo = tipo;
    this.sincronizarData();

  }
}




