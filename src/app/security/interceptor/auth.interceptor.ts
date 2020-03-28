import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { retry, catchError, finalize } from "rxjs/operators";
import { AlertService } from "ngx-alerts";
import { LoaderService } from "../../core/services/loader/loader.service";
import { SharedService } from "../../core/services/shared/shared.service";
import { ComumComponente } from "src/app/core/comum.component";

@Injectable()
export class AuthInterceptor extends ComumComponente
  implements HttpInterceptor {
  shared: SharedService;

  constructor(
    public alertService: AlertService,
    public loaderService: LoaderService
  ) {
    super(alertService);
    this.shared = SharedService.getInstance();
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loaderService.show();
    let authRequest: any;
    if (this.shared.isLoggeIn) {
      authRequest = req.clone({
        setHeaders: {
          Authorization: sessionStorage.getItem("token")
        }
      });
      return next.handle(authRequest).pipe(
        finalize(() => this.loaderService.hide()),
        retry(1),
        catchError((error: HttpErrorResponse) => {
          let errorMessage = "";
          if (error.status === 401) {
            if (error.error instanceof ErrorEvent) {
              errorMessage = `Error: ${error.error.message}`;
            } else {
              errorMessage = "Sem autorização para esta ação !";
            }
            this.mensagemTela("ERROR", errorMessage);
            return throwError(errorMessage);
          } else if (error.status === 403) {
            errorMessage = "Sem permissão para acessa a página !";
            this.mensagemTela("WARNING", errorMessage);
            return throwError(errorMessage);
          } else if (error.status === 0) {
            errorMessage = "Favor contactar o administrador do sistema !";
            this.mensagemTela("ERROR", errorMessage);
            return throwError(errorMessage);
          }
          return throwError(error);
        })
      );
    } else {
      return next.handle(req).pipe(finalize(() => this.loaderService.hide()));
    }
  }
}
