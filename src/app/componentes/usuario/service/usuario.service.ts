import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
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
}
