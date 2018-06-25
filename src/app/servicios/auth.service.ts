import { Injectable } from '@angular/core';
import { HttpService } from '../core/http.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthService {
  static USUARIOS = '/usuarios';
  static tokenKey = 'tokenKey';
  private tokenValue = { id: 0, usuario: null, loginIn: 'false', rol: null };
  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private httpService: HttpService,
    private router: Router,
    private snackBar: MatSnackBar, ) { }

  login(username: string, password: string) {

    //TODO: se debe capturar el JWT desde el servidor
    this.httpService.get(AuthService.USUARIOS + '/' + username).subscribe(
      u => {
        if (u.username === username && u.password === password) {
          this.tokenValue.id = u.id;
          this.tokenValue.usuario = username;
          this.tokenValue.loginIn = 'true';
          this.tokenValue.rol = 'CUSTOMER'; //TODO: mapear el rol
          localStorage.setItem(AuthService.tokenKey, JSON.stringify(this.tokenValue));
          this.loggedIn.next(true);
          this.router.navigate(['/control']);

        } else if (u.username === undefined) {
          this.loggedIn.next(false);
          this.router.navigate(['/inicio']);
          this.openSnackBar('ERROR!!!', 'El usuario no existe, debe registrarse');
        } else {
          this.loggedIn.next(false);
          this.router.navigate(['/inicio']);
          this.openSnackBar('ERROR!!!', 'usuario o contraseña incorrecto');


        }
      }
    );
  }

  openSnackBar(title: string, message: string) {
    this.snackBar.open(title, message, {
      duration: 8000,
    });
  }

  logout() {
    localStorage.removeItem(AuthService.tokenKey);
    console.log(localStorage.getItem('token'));
    this.loggedIn.next(false);
    this.router.navigate(['/inicio']);
  }

}
