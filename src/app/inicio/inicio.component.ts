import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';
import { Usuario } from '../usuario/usuario.model';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  usuario: Usuario;
  correo = new FormControl('', [Validators.required, Validators.email]);
  registroForm: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

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
      console.log(this.registroForm.value);
      console.log('llamar el servicio de creacion de usuario');
    } else {
      console.log(this.usuario);
      console.log('Mostrar toast con falta de datos');
    }

  }

}
