import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ControlCrecimiento } from './control-crecimiento.model';
import { ControlCrecimientoService } from './control-crecimiento.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-control-crecimiento',
  templateUrl: './control-crecimiento.component.html',
  styleUrls: ['./control-crecimiento.component.css']
})
export class ControlCrecimientoComponent implements OnInit {

  controlForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private controlCrecimientoService: ControlCrecimientoService,
    private snackBar: MatSnackBar) { }
  ngOnInit() {
    this.createForm();
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
      idPersona: 203 //TODO:  Aqui se deb setear el valor del id de la perona
    };

    return controlMap;
  }

  public onSubmit() {
    this.controlCrecimientoService.crear(this.controlMapData()).subscribe(
      () => {
        this.openSnackBar('OK.!', 'Control agregado correctamente');
      },
      error => {
        this.openSnackBar('UPS!!!', 'Intentelo mas tarde');
      }
    );
  }

  openSnackBar(title: string, message: string) {
    this.snackBar.open(title, message, {
      duration: 8000,
    });
  }
}


