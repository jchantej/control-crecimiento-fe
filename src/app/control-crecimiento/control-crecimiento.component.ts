import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ControlCrecimiento } from './control-crecimiento.model';
import { ControlCrecimientoService } from './control-crecimiento.service';
import { MatSnackBar, MatDialogRef, MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { PercentilOmsComponent } from '../percentil-oms/percentil-oms.component';
import { Persona } from '../persona/persona.model';
import { PersonaService } from '../persona/persona.service';
import { AuthService } from '../servicios/auth.service';
import { HttpResponse, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { Constantes } from '../core/constantes';
import { UploadFileService } from '../servicios/upload-file.service';
import { ControlUpdateDialogComponent } from './dialogos/control-update-dialog/control-update-dialog.component';


@Component({
  selector: 'app-control-crecimiento',
  templateUrl: './control-crecimiento.component.html',
  styleUrls: ['./control-crecimiento.component.css']
})
export class ControlCrecimientoComponent implements OnInit {
  tipo: any;
  userSession: any;
  dataSourceControles: MatTableDataSource<ControlCrecimiento>;
  displayedColumns = ['fecha', 'edad', 'peso', 'talla', 'observacionPeso', 'observacionTalla'];
  selectedPersona: Persona;
  personas: Persona[];
  controlForm: FormGroup;
  idPersona: number;
  controlesCrecimiento: ControlCrecimiento[];
  controlCrecimiento: ControlCrecimiento;
  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };
  disable = true;
  tipos = [
    { value: 'P', viewValue: 'Peso', checked: 'true' },
    { value: 'T', viewValue: 'Talla', checked: 'false' }
  ];

  controlDialogRef: MatDialogRef<ControlUpdateDialogComponent>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(PercentilOmsComponent) percentilOms: PercentilOmsComponent;
  constructor(private formBuilder: FormBuilder,
    private controlCrecimientoService: ControlCrecimientoService,
    private personaService: PersonaService,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private uploadFileService: UploadFileService,
    private controlDialogMat: MatDialog
  ) {

    this.selectedPersona = { nombre: '', apellido: '', genero: '', foto: Constantes.fotoDefaultNN, grupoSanguineo: '', idUsuario: 0 };
    this.controlCrecimiento = { peso: 0.0, talla: 0.0, idPersona: 0, edad: 0 };
  }
  ngOnInit() {

    this.userSession = JSON.parse(localStorage.getItem(AuthService.tokenKey));
    if (this.userSession !== null) {
      this.authService.loggedIn.next(true);
    } else {
      this.authService.logout();
    }
    this.getPersonas();
    this.createForm();
    this.controlForm.disable();

  }

  habilitarPanelControlCrecimiento(persona) {
    this.selectedPersona = persona;
    this.sincronizarData();
    this.disable = false;
    this.controlForm.enable();
    this.controlForm.reset();
    this.currentFileUpload = null;

  }

  sincronizarData() {
    this.getControlesCrecimiento();
  }
  getControlesCrecimiento() {
    if (this.tipo === undefined) {
      this.tipo = { value: 'P', viewValue: 'Peso', checked: 'true' };
    }
    this.controlCrecimientoService.getControlesCrecimiento(this.selectedPersona.id).subscribe(
      controles => {
        this.percentilOms.sincronizarData(controles, this.selectedPersona, this.tipo);
        controles.sort((a, b) => {
          return b.id - a.id;
        });
        this.dataSourceControles = new MatTableDataSource<ControlCrecimiento>(controles);
        this.dataSourceControles.paginator = this.paginator;
        this.dataSourceControles.sort = this.sort;
        this.controlesCrecimiento = controles;
      }
    );
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSourceControles.filter = filterValue;
  }
  getPersonas() {
    this.personaService.getListaPersonas(this.userSession.id).subscribe(
      persona => {
        persona.forEach(p => {
          p.foto = Constantes.URIFILE + p.foto;
        });
        this.personas = persona;
      }
    );
  }
  createForm() {
    this.controlForm = this.formBuilder.group({
      peso: [''],
      talla: ['']
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

      const value = this.controlesCrecimiento.find(item =>
        this.formatDate(new Date(item.fechaRegistro)) === this.formatDate(new Date()));
      if (!value) {
        this.controlCrecimientoService.crear(this.controlMapData()).subscribe(
          () => {
            this.openSnackBar('OK.!', 'Control agregado correctamente');
            this.controlForm.reset();
            this.sincronizarData();
          },
          error => {
            this.openSnackBar('UPS!!!', 'Intentelo mas tarde');
          }
        );
      } else {
        this.controlCrecimiento.id = value.id;
        this.controlCrecimiento.edad = value.edad;
        this.controlCrecimiento.peso = this.controlForm.value.peso;
        this.controlCrecimiento.talla = this.controlForm.value.talla;
        this.openDialog(this.controlCrecimiento);
      }
    } else {
      this.openSnackBar('Datos Obligatorios', 'Debe ingresar Peso y Talla');
    }

  }
  onSelectFile(event) {

    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event: any) => { // called once readAsDataURL is completed
        this.selectedPersona.foto = event.target.result;
      }

      this.selectedFiles = event.target.files;
    }
  }

  onUpload() {
    this.progress.percentage = 0;
    this.currentFileUpload = this.selectedFiles.item(0);
    this.uploadFileService.pushFileToStorage(this.currentFileUpload).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress.percentage = this.uploadFileService.calcProgressPercent(event);
        } else if (event instanceof HttpResponse) {
          this.selectedPersona.foto = this.currentFileUpload.name;
          this.personaService.editar(this.selectedPersona.id, this.selectedPersona).subscribe(
            () => {
              this.openSnackBar('OK.!', 'Foto actualizada correctamente');
              this.getPersonas();
              this.sincronizarData();
            },
            error => {
              this.openSnackBar('UPS!!!', 'Intentelo más tarde');
              console.log(error);
            }
          );
          this.selectedPersona.foto = Constantes.URIFILE + this.selectedPersona.foto;
        } else if (event instanceof HttpErrorResponse) {
          this.openSnackBar('UPS!!!', 'Intentelo más tarde');
        }
      });

    this.selectedFiles = undefined;
  }

  private formatDate(fecha: Date): string {

    const dia = fecha.getDay();
    const mes = fecha.getMonth();
    const anio = fecha.getFullYear();
    return `${dia}-${mes}-${anio}`;

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

  openDialog(controlCrecimiento: ControlCrecimiento) {
    this.controlDialogRef = this.controlDialogMat.open(ControlUpdateDialogComponent, {
      data: {
        controlCrecimiento: controlCrecimiento
      }
    });

    this.controlDialogRef.afterClosed().subscribe(
      () => {
        this.controlForm.reset();
        this.sincronizarData();
      });
  }

}




