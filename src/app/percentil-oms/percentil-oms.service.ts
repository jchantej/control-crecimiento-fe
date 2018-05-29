import { Injectable } from '@angular/core';
import { PercentilOms } from './percentil-oms.model';
import { Observable } from 'rxjs/Observable';
import { HttpService } from '../core/http.service';
@Injectable()
export class PercentilOmsService {
  static PERCENTILES = '/percentiles';
  static GENEROTIPO = '/generotipo';
  constructor(private httpService: HttpService) {
  }

  getListaPercentilesOms(genero: string, tipo: string, edad: string): Observable<PercentilOms[]> {
    return this.httpService.param('genero', genero).param('tipo', tipo).param('edad', edad)
      .get(PercentilOmsService.PERCENTILES + PercentilOmsService.GENEROTIPO);
  }

}
