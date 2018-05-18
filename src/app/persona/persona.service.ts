import { Injectable } from '@angular/core';
import { Persona } from './persona.model';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class PersonaService {
  private listaPersonas: Subject<Persona[]> = new Subject();
  private personas: Persona[];
  constructor() {
    this.personas = [
      {
        id: 1, nombre: 'Pablo Antonio', apellido: 'Jimenez', fechaNacimiento: new Date(),
        genero: 'M', grupoSanguineo: 'ORH+', foto: 'toni.jpg', fechaRegistro: new Date(),
        activo: true, idUsuario: 1
      },

      {
        id: 2, nombre: 'Jostyn Joel', apellido: 'Riofrio', fechaNacimiento: new Date('20/03/2014'),
        genero: 'M', grupoSanguineo: 'ORH+', foto: 'guasuso.jpg', fechaRegistro: new Date('20/03/2014'),
        activo: true, idUsuario: 1
      },

    ];
  }



  getListaPersonas(): Observable<Persona[]> {
    this.getPersonas();
    return this.listaPersonas.asObservable();
  }
  //TODO: Metodos Observables para llamar al servicio Http

  crear(persona: Persona) {
    // TODO: llamar al servicio http para crear POST
    console.log(persona);
    this.personas.push(persona);
  }

  public getPersonas() {
   // this.listaPersonas.next(this.personas);
    return this.personas;
  }

}
