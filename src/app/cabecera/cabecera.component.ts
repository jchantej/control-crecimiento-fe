import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {

  // loginIn: Observable<boolean>;
  tokenValue: any;
  loginIn = false;
  rol: string;

  //token = JSON.parse(localStorage.getItem(AuthService.tokenKey));
  constructor(private authService: AuthService,
    private router: Router) {
  }

  ngOnInit() {
    //TODO: pendiente de enviar todo el toquen
    this.authService.loggedIn.subscribe(token => {
      this.tokenValue = JSON.parse(localStorage.getItem(AuthService.tokenKey));
      if (this.tokenValue === null) {
        this.router.navigate(['/inicio']);
      }
      this.loginIn = token;
    });
  }

  salir() {
    this.authService.logout();
  }

}
