import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { Usuario } from '../usuario/usuario.model';
import { UsuarioService } from '../usuario/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  userSession: any;
  usuario: Usuario;
  constructor(private authService: AuthService,
    private usuarioService: UsuarioService) { 
      this.usuario = { username: '', password: '', correo: '' };
    }

  ngOnInit() {
    this.userSession = JSON.parse(localStorage.getItem(AuthService.tokenKey));
    //TODO:Pendiente de mejorar la parte control de la session
    if (this.userSession !== null) {
      this.authService.loggedIn.next(true);
      this.getUsuario();
    } else {
      this.authService.logout();
    }

  }

  getUsuario() {
    this.usuarioService.getUsuario(this.userSession.usuario).subscribe(
      u => {
        this.usuario = u;
        console.log(this.usuario );
      }
    );
  }


}
