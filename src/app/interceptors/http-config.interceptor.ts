import {Injectable} from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import {UsuarioService} from '../services/service.index';
// import {ToastsManager} from 'ng6-toastr';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  constructor(
    // private toasterService: ToastsManager,
    private usuarioService: UsuarioService,
  ) {}
  intercept(request: HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>> {
    var token = this.usuarioService.token;
    debugger
    if (token && !request.url.includes('login')) {
      request = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + token)
      });
    }
    if (request.url.includes('Upload')) {
      request = request.clone({
        headers: request.headers.set('Accept', 'application/json')
      });
    } else {
      request = request.clone({
        headers: request.headers.set('Content-Type', 'application/json')
      });
    }
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log('error', error)
        const data = {
          reason: error ? error.error.reason + ' ' + error.message : '',
          status: error.status
        };
        // this.toasterService.error('Error en la peticion', 'Error!');
        console.error(error);
        return throwError('error');
      })
    );
  }
}
