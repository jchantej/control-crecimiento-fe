import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpProgressEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class UploadFileService {
  static urlBase = 'http://localhost:8080/api/v0/file';
  static UPLOAD = '/upload';
  constructor(private http: HttpClient) { }

  pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest('POST', UploadFileService.urlBase + UploadFileService.UPLOAD, formdata, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(req);
  }

  calcProgressPercent(event: HttpProgressEvent) {
    return Math.round(100 * event.loaded / event.total);
  }
}
