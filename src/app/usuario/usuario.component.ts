import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { Usuario } from '../usuario/usuario.model';
import { UsuarioService } from '../usuario/usuario.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

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
    private formBuilder: FormBuilder) {
    this.usuario = { username: '', password: '', correo: '' };
  }

  ngOnInit() {
    this.userSession = JSON.parse(localStorage.getItem(AuthService.tokenKey));
    //TODO:Pendiente de mejorar la parte control de la session
    if (this.userSession !== null) {
      this.authService.loggedIn.next(true);
      this.getUsuario();
      this.createForm();
    } else {
      this.authService.logout();
    }

  }


  createForm() {
    console.log(this.usuario);
    this.usuarioForm = this.formBuilder.group({
      username: this.usuario.username ? this.usuario.username : '',
      password: this.usuario.password ? this.usuario.password : '',
      nombre: this.usuario.nombre ? this.usuario.nombre : '',
      apellido: this.usuario.apellido ? this.usuario.apellido : '',
      correo: this.usuario.correo ? this.usuario.correo : '',
    });
  }

  tabActual(value) {
    if (value.index === 1) {
      this.createForm();
    }

  }
  getUsuario() {
    this.usuarioService.getUsuario(this.userSession.usuario).subscribe(
      u => {
        this.usuario = u;
        console.log(this.usuario);
      }
    );
  }


}
