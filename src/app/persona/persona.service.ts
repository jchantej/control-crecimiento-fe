import { Injectable } from '@angular/core';
import { Persona } from './persona.model';
import { Observable } from 'rxjs/Observable';
import { HttpService } from '../core/http.service';
@Injectable()
export class PersonaService {
  static PERSONAS = '/personas';
  constructor(private httpService: HttpService) {
  }

  getListaPersonas(): Observable<Persona[]> {
    return this.httpService.get(PersonaService.PERSONAS);
  }

  crear(persona: Persona): Observable<any> {
    return this.httpService.post(PersonaService.PERSONAS, persona);
  }

}
