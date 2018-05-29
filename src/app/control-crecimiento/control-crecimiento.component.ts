import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ControlCrecimiento } from './control-crecimiento.model';
import { ControlCrecimientoService } from './control-crecimiento.service';
import { MatSnackBar, MatTableDataSource } from '@angular/material';
import { PercentilOmsComponent } from '../percentil-oms/percentil-oms.component';
import { Persona } from '../persona/persona.model';
import { PersonaService } from '../persona/persona.service';

@Component({
  selector: 'app-control-crecimiento',
  templateUrl: './control-crecimiento.component.html',
  styleUrls: ['./control-crecimiento.component.css']
})
export class ControlCrecimientoComponent implements OnInit {

  dataSourceControles: MatTableDataSource<ControlCrecimiento>;
  displayedColumns = ['fecha', 'edad', 'edadPeriodo', 'peso', 'talla', 'actionsColumn'];
  selectedPersona: Persona;
  personas: Persona[];
  controlForm: FormGroup;
  idPersona: number;
  controlesCrecimiento: ControlCrecimiento[];

  @ViewChild(PercentilOmsComponent) percentilOms: PercentilOmsComponent;
  constructor(private formBuilder: FormBuilder,
    private controlCrecimientoService: ControlCrecimientoService,
    private personaService: PersonaService,
    private snackBar: MatSnackBar) {
  }
  ngOnInit() {
    this.getPersonas();
    this.createForm();

  }

  sincronizarData() {
    this.getControlesCrecimiento();
  }
  getControlesCrecimiento() {
    this.controlCrecimientoService.getControlesCrecimiento(this.selectedPersona.id).subscribe(
      controles => {
        this.dataSourceControles = new MatTableDataSource<ControlCrecimiento>(controles);
        this.percentilOms.sincronizarData(controles, this.selectedPersona);
      }
    );
  }
  getPersonas() {
    //TODO: se debe pasar el id usuario
    this.personaService.getListaPersonas(1).subscribe(
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
  }

  openSnackBar(title: string, message: string) {
    this.snackBar.open(title, message, {
      duration: 8000,
    });
  }
}


