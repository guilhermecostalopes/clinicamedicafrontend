import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CLINICA_MEDICA_API } from "src/app/core/services/clinicamedica.api";
import { ServicePrincipalService } from "src/app/core/services/service-principal.service";
import { UsuarioModel } from "../model/usuario.model";

@Injectable({
  providedIn: "root"
})
export class UsuarioService extends ServicePrincipalService<
  UsuarioModel,
  number
> {
  constructor(
    public httpClient: HttpClient,
    public activatedRoute: ActivatedRoute,
    public router: Router
  ) {
    super(httpClient, activatedRoute, router, "usuarios");
  }

  public buscarRoles() {
    return this.httpClient.get(
      `${CLINICA_MEDICA_API}` + "usuarios/buscarRoles/"
    );
  }
}
