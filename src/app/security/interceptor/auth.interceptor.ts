import {
  HttpErrorResponse, HttpEvent,
  HttpHandler, HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, finalize, retry } from "rxjs/operators";
import { ComumComponente } from "src/app/core/comum.component";
import { SnackBarComponent } from 'src/app/core/snack-bar/snack-bar.component';
import { LoaderService } from "../../core/services/loader/loader.service";
import { SharedService } from "../../core/services/shared/shared.service";
import { MensagemModel } from '../model/error.model';

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
          let errorMessage = new MensagemModel();
          let errorMessages: Array<MensagemModel> = [];
          if (error.status === 401) {
            if (error.error instanceof ErrorEvent) {
              errorMessage.texto = `Error: ${error.error.message}`;
            } else {
              errorMessage.texto = "Sem autorização para esta ação !";
            }
            errorMessages.push(errorMessage);
            this.mensagemTela("ERROR", errorMessages);
            return throwError(errorMessages);
          } else if (error.status === 403) {
            errorMessage.texto = "Sem permissão para acessa a página !";
            errorMessages.push(errorMessage);
            this.mensagemTela("WARNING", errorMessages);
            return throwError(errorMessages);
          } else if (error.status === 409) {
            this.mensagemTela("WARNING", error.error);
            return throwError(error.error);
          } else if (error.status === 0 || error.status === 400) {
            errorMessage.texto = "Favor contactar o administrador do sistema !";
            errorMessages.push(errorMessage);
            this.mensagemTela("WARNING", errorMessages);
            return throwError(errorMessages);
          }
          return throwError(error);
        })
      );
    } else {
      return next.handle(req).pipe(finalize(() => this.loaderService.hide()));
    }
  }
}
