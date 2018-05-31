import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Usuario } from '../usuario/usuario.model';
import { UsuarioService } from '../usuario/usuario.service';
import { MatSnackBar } from '@angular/material';
import { isNull } from 'util';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  usuario: Usuario;
  correo = new FormControl('', [Validators.required, Validators.email]);
  registroForm: FormGroup;
  constructor(private usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar) { }

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


  registrar() {

    if (this.registroForm.valid) {

      this.usuarioService.getUsuario(this.registroForm.value.username).subscribe(
        u => {
          if (u.username === null || u.username === '' || u.username === undefined) {
            this.usuarioService.crear(this.registroMapData()).subscribe(
              () => {
                this.openSnackBar('OK.!', 'Usuario registrado correctamente');
                // this.sincronizarData();
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
