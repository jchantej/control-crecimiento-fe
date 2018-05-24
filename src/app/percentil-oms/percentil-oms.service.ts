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

  getListaPercentilesOms(genero: string, tipo: string): Observable<PercentilOms[]> {
    return this.httpService.param('genero', genero).param('tipo', tipo)
      .get(PercentilOmsService.PERCENTILES + PercentilOmsService.GENEROTIPO);
  }

}
