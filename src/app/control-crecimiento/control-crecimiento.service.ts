import { Injectable } from '@angular/core';
import { ControlCrecimiento } from './control-crecimiento.model';
import { Observable } from 'rxjs/Observable';
import { HttpService } from '../core/http.service';
@Injectable()
export class ControlCrecimientoService {
  static CONTROLES = '/controles';
  constructor(private httpService: HttpService) {
  }


  crear(controlCrecimiento: ControlCrecimiento): Observable<any> {
    return this.httpService.post(ControlCrecimientoService.CONTROLES, controlCrecimiento);
  }

}
