import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { Usuario } from '../usuario/usuario.model';
import { UsuarioService } from '../usuario/usuario.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  userSession: any;
  usuario: Usuario;
  usuarioForm: FormGroup;
  constructor(private authService: AuthService,
    private usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar) {
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
      correo: formModel.correo
    };
    return controlMap;
  }

  openSnackBar(title: string, message: string) {
    this.snackBar.open(title, message, {
      duration: 8000,
    });
  }

}
