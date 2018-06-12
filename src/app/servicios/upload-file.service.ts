import {Injectable} from '@angular/core';
import {HttpClient, HttpRequest, HttpEvent} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { Constantes } from '../core/constantes';

@Injectable()
export class UploadFileService {
  static urlBase = 'http://localhost:8080/api/v0/file';
  static UPLOAD = '/upload';
  constructor(private http: HttpClient) {}

  pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest('POST', UploadFileService.urlBase + UploadFileService.UPLOAD , formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }


}
