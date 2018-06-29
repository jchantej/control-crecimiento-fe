import { Injectable } from '@angular/core';
import { Persona } from './persona.model';
import { Observable } from 'rxjs/Observable';
import { HttpService } from '../core/http.service';
@Injectable()
export class PersonaService {
  static PERSONAS = '/personas';
  static USUARIO = '/usuario';

  constructor(private httpService: HttpService) {
  }

  getListaPersonas(id: number): Observable<Persona[]> {
    return this.httpService.authBasic().get(PersonaService.PERSONAS + PersonaService.USUARIO + '/' + id);
  }

  crear(persona: Persona): Observable<any> {
    return this.httpService.authBasic().post(PersonaService.PERSONAS, persona);
  }

  editar(id: number, persona: Persona): Observable<any> {
    return this.httpService.authBasic().put(PersonaService.PERSONAS + '/' + id, persona);
  }

  eliminar(id: number): Observable<any> {
    return this.httpService.authBasic().delete(PersonaService.PERSONAS + '/' + id);
  }


}
