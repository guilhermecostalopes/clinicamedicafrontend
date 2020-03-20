import { Injectable } from '@angular/core';
import {
 HttpEvent,
 HttpInterceptor,
 HttpHandler,
 HttpRequest,
 HttpResponse,
 HttpErrorResponse
} from '@angular/common/http';
import {
    Observable,
    throwError
} from 'rxjs';
import {
    retry,
    catchError,
    finalize
} from 'rxjs/operators';
import { AlertService } from 'ngx-alerts';
import { LoaderService } from '../core/services/loader/loader.service';
import { SharedService } from '../core/services/shared/shared.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    shared: SharedService;

    constructor(
        private alertService: AlertService,
        private loaderService: LoaderService
    ) {
        this.shared = SharedService.getInstance();
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loaderService.show();
        let authRequest: any;
        if (this.shared.isLoggeIn) {
            authRequest = req.clone({
                setHeaders: {
                    Authorization : sessionStorage.getItem('token')
                }
            });
            return next.handle(authRequest)
            .pipe(
                finalize(() => this.loaderService.hide()),
                retry(1),
                catchError((error: HttpErrorResponse) => {
                    let errorMessage = '';
                    if (error.status === 401) {
                        if (error.error instanceof ErrorEvent) {
                            errorMessage = `Error: ${error.error.message}`;
                        } else {
                            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
                        }
                        this.mensagemTela('ERROR', errorMessage);
                        return throwError(errorMessage);
                    } else if (error.status === 0) {
                        errorMessage = 'Favor contactar o administrador do sistema !';
                        this.mensagemTela('ERROR', errorMessage);
                        return throwError(errorMessage);
                    }
                    return throwError(error);
                })
            );
        } else {
            return next.handle(req).pipe(finalize(() => this.loaderService.hide()));
        }
    }

    private mensagemTela(tipoMensagem: string, mensagem: string) {
        if (tipoMensagem === 'ERROR') {
          this.alertService.danger({html: mensagem});
        } else if (tipoMensagem === 'SUCCESS') {
          this.alertService.success({html: mensagem});
        } else if (tipoMensagem === 'WARNING') {
          this.alertService.warning({html: mensagem});
        } else {
          this.alertService.info({html: mensagem});
        }
      }
}
