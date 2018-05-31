import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpService } from '../core/http.service';
import { Usuario} from './usuario.model';

@Injectable()
export class UsuarioService {
  static USUARIOS = '/usuarios';

  constructor(private httpService: HttpService) { }

  crear(usuario: Usuario): Observable<any> {
    return this.httpService.post(UsuarioService.USUARIOS, usuario);
  }

  getUsuario(username: string): Observable<Usuario> {
    return this.httpService.get(UsuarioService.USUARIOS  + '/' + username);
  }

}
