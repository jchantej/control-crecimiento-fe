import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { Usuario } from '../usuario/usuario.model';
import { UsuarioService } from '../usuario/usuario.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { MatTableDataSource, MatDialog, } from '@angular/material';
import { UsuarioDeleteDialogComponent } from './dialogos/usuario-delete-dialog.component';
import { HttpResponse, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { Constantes } from '../core/constantes';
import { UploadFileService } from '../servicios/upload-file.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  userSession: any;
  usuario: Usuario;
  usuarioForm: FormGroup;
  fotoTemp = '';
  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };
  constructor(private authService: AuthService,
    private usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private usuarioDeleteDialog: MatDialog,
    private uploadFileService: UploadFileService) {
    this.usuario = { username: '', password: '', correo: '' };
  }

  ngOnInit() {
    this.userSession = JSON.parse(localStorage.getItem(AuthService.tokenKey));
    //TODO:Pendiente de mejorar la parte control de la session
    if (this.userSession !== null) {
      this.authService.loggedIn.next(true);
      this.sincronizarData();
      this.createForm();
    } else {
      this.authService.logout();
    }

  }

  sincronizarData() {
    this.getUsuario();
  }

  createForm() {
    this.usuarioForm = this.formBuilder.group({
      username: this.usuario.username ? this.usuario.username : '',
      password: this.usuario.password ? this.usuario.password : '',
      nombre: this.usuario.nombre ? this.usuario.nombre : '',
      apellido: this.usuario.apellido ? this.usuario.apellido : '',
      correo: this.usuario.correo ? this.usuario.correo : '',
    });
  }

  tabActual(value) {
    this.currentFileUpload = null;
    this.createForm();
  }

  onSubmit() {

    if (this.usuarioForm.valid) {

      if (this.userSession.usuario === this.usuarioForm.value.username) {
        this.usuarioService.editar(this.userSession.usuario, this.usuarioMapData()).subscribe(
          () => {
            this.openSnackBar('OK.!', 'Usuario actualizado correctamente');
            this.sincronizarData();
          },
          error => {
            this.openSnackBar('UPS!!!', 'Intentelo mas tarde');
          }
        );

      } else {
        this.usuarioService.getUsuario(this.usuarioForm.value.username).subscribe(
          u => {
            if (u.username === null || u.username === '' || u.username === undefined) {
              this.usuarioService.editar(this.userSession.usuario, this.usuarioMapData()).subscribe(
                () => {
                  if (this.userSession.usuario !== this.usuarioForm.value.username) {
                    this.authService.logout();
                  }
                  this.openSnackBar('OK.!', 'Usuario actualizado correctamente');
                },
                error => {
                  this.openSnackBar('UPS!!!', 'Intentelo mas tarde');
                }
              );
            } else {
              this.openSnackBar('UPS!!!', 'El usuario ' + u.username + ' ya existe, intente con otro usuario');
            }
          }
        );
      }
    }
  }

  getUsuario() {
    this.usuarioService.getUsuario(this.userSession.usuario).subscribe(
      u => {
        this.usuario = u;
        this.fotoTemp = u.foto;
        this.usuario.foto = Constantes.URIFILE + this.usuario.foto;
      }
    );
  }

  private usuarioMapData(): Usuario {
    const formModel = this.usuarioForm.value;
    const controlMap: Usuario = {
      username: formModel.username,
      password: formModel.password,
      nombre: formModel.nombre,
      apellido: formModel.apellido,
      correo: formModel.correo,
      foto: this.fotoTemp
    };
    return controlMap;
  }


  onSelectFile(event) {

    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event: any) => { // called once readAsDataURL is completed
        this.usuario.foto = event.target.result;
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
          this.usuario.foto = this.currentFileUpload.name;
          this.usuarioService.editar(this.userSession.usuario, this.usuario).subscribe(
            () => {
              this.openSnackBar('OK.!', 'Foto actualizada correctamente');
              this.sincronizarData();
            },
            error => {
              this.openSnackBar('UPS!!!', 'Intentelo más tarde');
              console.log(error);
            }
          );
          this.usuario.foto = Constantes.URIFILE + this.usuario.foto;
        } else if (event instanceof HttpErrorResponse) {
          this.openSnackBar('UPS!!!', 'Intentelo más tarde');
        }
      });

    this.selectedFiles = undefined;
  }



  openDialog(): void {
    this.usuarioDeleteDialog.open(UsuarioDeleteDialogComponent);
  }

  openSnackBar(title: string, message: string) {
    this.snackBar.open(title, message, {
      duration: 8000,
    });
  }

}
