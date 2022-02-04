import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpHeaders,
} from '@angular/common/http';

import { from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Storage } from '@ionic/storage-angular';

@Injectable()
export class Interceptor implements HttpInterceptor {
  basicRoutes = ['/login', '/signup', '/token'];
  loggedRoute = ['/me'];

  accessToken: string = '';

  baseHeader: HttpHeaders = new HttpHeaders({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Accept: 'application/json',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'Content-Type': 'application/json; charset=utf-8',
  });

  constructor(private storage: Storage) {}

  intercept(
    httpRequest: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      this.basicRoutes.some((endpoint) => httpRequest.url.includes(endpoint))
    ) {
      httpRequest = httpRequest.clone({
        headers: this.baseHeader.set(
          'Authorization',
          'Basic d2ViLXN0YWdlLmVhdHNyZWFkeS5jb206WTVTMEpWdDV4WGFCdDhZaA=='
        ),
      });
      return next.handle(httpRequest);
    } else if (
      this.loggedRoute.some((endpoint) => httpRequest.url.includes(endpoint))
    ) {
      return from(this.storage.get('accessToken')).pipe(
        switchMap((accessToken) => {
          httpRequest = httpRequest.clone({
            headers: this.baseHeader.set(
              'Authorization',
              `Bearer ${accessToken}`
            ),
          });

          return next.handle(httpRequest);
        })
      );
    } else {
      return next.handle(httpRequest);
    }
  }
}
