import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpService } from '../core/http.service';
import { Usuario } from './usuario.model';

@Injectable()
export class UsuarioService {
  static USUARIOS = '/usuarios';

  constructor(private httpService: HttpService) { }

  crear(usuario: Usuario): Observable<any> {
    return this.httpService.authBasic().post(UsuarioService.USUARIOS, usuario);
  }

  editar(username: string, usuario: Usuario): Observable<any> {
    return this.httpService.authBasic().put(UsuarioService.USUARIOS + '/' + username , usuario);
  }

  eliminar(username: string): Observable<any> {
    return this.httpService.authBasic().delete(UsuarioService.USUARIOS + '/' + username);
  }

  getUsuario(username: string): Observable<Usuario> {
    return this.httpService.authBasic().get(UsuarioService.USUARIOS + '/' + username);
  }

}
