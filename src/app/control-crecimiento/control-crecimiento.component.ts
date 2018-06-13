import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ControlCrecimiento } from './control-crecimiento.model';
import { ControlCrecimientoService } from './control-crecimiento.service';
import { MatSnackBar, MatTableDataSource, MatPaginator } from '@angular/material';
import { PercentilOmsComponent } from '../percentil-oms/percentil-oms.component';
import { Persona } from '../persona/persona.model';
import { PersonaService } from '../persona/persona.service';
import { AuthService } from '../servicios/auth.service';
import { HttpResponse, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { Constantes } from '../core/constantes';
import { UploadFileService } from '../servicios/upload-file.service';

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
  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };
  disable = true;
  tipos = [
    { value: 'P', viewValue: 'Peso', checked: 'true' },
    { value: 'T', viewValue: 'Talla', checked: 'false' }
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(PercentilOmsComponent) percentilOms: PercentilOmsComponent;
  constructor(private formBuilder: FormBuilder,
    private controlCrecimientoService: ControlCrecimientoService,
    private personaService: PersonaService,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private uploadFileService: UploadFileService
  ) {

    this.selectedPersona = { nombre: '', apellido: '', genero: '', foto: Constantes.fotoDefaultNN, grupoSanguineo: '', idUsuario: 0 }
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
        this.dataSourceControles = new MatTableDataSource<ControlCrecimiento>(controles);
        this.dataSourceControles.paginator = this.paginator;
        this.percentilOms.sincronizarData(controles, this.selectedPersona, this.tipo);
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




