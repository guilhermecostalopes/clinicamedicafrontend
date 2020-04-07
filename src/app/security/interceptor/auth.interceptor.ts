import {
  HttpErrorResponse, HttpEvent,
  HttpHandler, HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, finalize, retry } from "rxjs/operators";
import { ComumComponente } from "src/app/core/comum.component";
import { LoaderService } from "../../core/services/loader/loader.service";
import { SharedService } from "../../core/services/shared/shared.service";
import { SnackBarComponent } from 'src/app/core/snack-bar/snack-bar.component';

@Injectable()
export class AuthInterceptor extends ComumComponente
  implements HttpInterceptor {
  shared: SharedService;

  constructor(
    public loaderService: LoaderService,
    public snackBar: SnackBarComponent
  ) {
    super(snackBar);
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
          Authorization: sessionStorage.getItem("token"),
          Languagem: sessionStorage.getItem("language")
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
          } else if (error.status === 409) {
            errorMessage = error.error[0].texto;
            this.mensagemTela("ERROR", errorMessage);
            return throwError(errorMessage);
          } else if (error.status === 0 || error.status === 400) {
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
