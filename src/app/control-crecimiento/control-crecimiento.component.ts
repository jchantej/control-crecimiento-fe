import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ControlCrecimiento } from './control-crecimiento.model';
import { ControlCrecimientoService } from './control-crecimiento.service';
import { MatSnackBar } from '@angular/material';

import { Persona } from '../persona/persona.model';
import { PersonaService } from '../persona/persona.service';

@Component({
  selector: 'app-control-crecimiento',
  templateUrl: './control-crecimiento.component.html',
  styleUrls: ['./control-crecimiento.component.css']
})
export class ControlCrecimientoComponent implements OnInit {

  selectedPersona: Persona;
  personas[]: Persona;
  controlForm: FormGroup;
  idPersona: number;

  constructor(private formBuilder: FormBuilder,
    private controlCrecimientoService: ControlCrecimientoService,
    private personaService: PersonaService,
    private snackBar: MatSnackBar) {
  }
  ngOnInit() {
    this.getPersonas();
    this.createForm();

  }

  getPersonas() {
    this.personaService.getListaPersonas().subscribe(
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
      idPersona: this.selectedPersona.id //TODO:  Aqui se deb setear el valor del id de la perona
    };
    return controlMap;
  }

  public onSubmit() {
    if !(this.controlForm.invalid){
      this.controlCrecimientoService.crear(this.controlMapData()).subscribe(
        () => {
          this.openSnackBar('OK.!', 'Control agregado correctamente');
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


