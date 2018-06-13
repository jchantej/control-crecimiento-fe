import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Usuario } from '../usuario/usuario.model';
import { UsuarioService } from '../usuario/usuario.service';
import { AuthService } from '../servicios/auth.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Constantes } from '../core/constantes';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  userName: string;
  userPassword: string;
  usuario: Usuario;
  correo = new FormControl('', [Validators.required]);
  registroForm: FormGroup;
  constructor(private usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    if (!this.usuario) {
      this.usuario = { username: '', password: '', correo: '' };
    }
    this.createForm();
  }

  createForm() {
    this.registroForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      correo: ['', Validators.required]
    });
  }
  get correoActual() {
    return this.registroForm.get('correo');
  }

  autenticar() {
    if (this.userName && this.userPassword) {
      this.authService.login(this.userName, this.userPassword);
    } else {
      this.openSnackBar('Faltan datos', 'debe ingresar usuario y password');
    }

  }
  registrar() {

    if (this.registroForm.valid) {

      this.usuarioService.getUsuario(this.registroForm.value.username).subscribe(
        u => {
          if (u.username === null || u.username === '' || u.username === undefined) {
            this.usuarioService.crear(this.registroMapData()).subscribe(
              () => {
                this.openSnackBar('OK.!', 'Usuario registrado correctamente');
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

  private registroMapData(): Usuario {
    const formModel = this.registroForm.value;
    const controlMap: Usuario = {
      username: formModel.username,
      password: formModel.password,
      correo: formModel.correo,
      foto: Constantes.perfilDefault
    };
    return controlMap;
  }

  openSnackBar(title: string, message: string) {
    this.snackBar.open(title, message, {
      duration: 8000,
    });
  }

}
