import { Injectable } from "@angular/core";
import {
  CLINICA_MEDICA_API_LOGIN,
  CLINICA_MEDICA_API_REFRESH
} from "src/app/core/services/clinicamedica.api";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { HandleError } from "src/app/core/services/httperror/http-error-handler.service";
import { UsuarioModel } from "src/app/componentes/usuario/model/usuario.model";

@Injectable({
  providedIn: "root"
})
export class LoginService {
  private handleError: HandleError;

  private login: string;
  private nome: string;
  private role: any[];
  private token: string;

  private constToken = "token";
  private constLogin = "login";
  private constNome = "nome";
  private constRole = "role";
  constructor(public httpClient: HttpClient) {}

  public logar(t: UsuarioModel) {
    return this.httpClient.post(`${CLINICA_MEDICA_API_LOGIN}`, t);
  }

  refreshToken(): Observable<{}> {
    return this.httpClient
      .post<UsuarioModel>(`${CLINICA_MEDICA_API_REFRESH}`, null)
      .pipe(
        tap(
          data => data,
          error => catchError(this.handleError(this.constLogin, null))
        )
      );
  }

  guardarUsuario(login: string, nome: string): void {
    /*const dadosServidor = this.obterDadosToken(accessToken);*/
    this.login = login;
    this.nome = nome;
    /*this.usuario = new UsuarioModel();
    this.usuario.id = dadosServeidor.id;
    this.usuario.login = dadosServeidor.login;
    this.usuario.nome = dadosServeidor.nome;
    this.usuario.autorizacoes = dadosServeidor.autorizacoes;*/
    sessionStorage.setItem(this.constLogin, JSON.stringify(this.login));
    sessionStorage.setItem(this.constNome, JSON.stringify(this.nome));
  }

  guardarToken(dadosToken: string): void {
    this.token = dadosToken;
    sessionStorage.setItem(this.constToken, dadosToken);
  }

  guardarRole(role: any[]) {
    this.role = role;
    sessionStorage.setItem(this.constRole, JSON.stringify(this.role));
    /*if (this.usuario.autorizacoes.includes(role)) {
      return true;
    }
    return false;*/
  }

  isAuthenticated(): boolean {
    this.token = this.obterDadosToken(sessionStorage.getItem("token"));
    this.nome = this.obterDadosToken(sessionStorage.getItem("nome"));
    this.login = this.obterDadosToken(sessionStorage.getItem("login"));
    this.role = this.obterDadosToken(sessionStorage.getItem("role"));
    if (
      this.token != null &&
      this.nome != null &&
      this.login != null &&
      this.role != null
    ) {
      return true;
    }
    return false;
  }

  logout(): void {
    this.token = null;
    /*this.usuario = null;*/
    sessionStorage.clear();
    sessionStorage.removeItem(this.constToken);
    sessionStorage.removeItem(this.constLogin);
    sessionStorage.removeItem(this.constNome);
    sessionStorage.removeItem(this.constRole);
  }

  private obterDadosToken(dadosToken: string): any {
    if (dadosToken != null) {
      return dadosToken;
    }
    return null;
  }
}
