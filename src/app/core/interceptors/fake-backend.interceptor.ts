import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
  HttpClient
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';


@Injectable()
export class FakeBackendHttpInterceptor implements HttpInterceptor {
  private employeeJsonPath = '/assets/employees.json';

  constructor(private http: HttpClient) {
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.handleRequests(req, next);
  }

  handleRequests(req: HttpRequest<any>, next: HttpHandler): any {
    const { url, method } = req;
    if (url.endsWith('/employees') && method === 'GET') {
      req = req.clone({
        url: this.employeeJsonPath,
      });
      return next.handle(req).pipe(delay(1000));
    }

    return next.handle(req);
  }
}

export const FakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendHttpInterceptor,
  multi: true,
};
