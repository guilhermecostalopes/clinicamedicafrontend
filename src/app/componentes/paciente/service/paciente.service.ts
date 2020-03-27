import { Injectable } from "@angular/core";
import { ServicePrincipalService } from "src/app/core/services/service-principal.service";
import { PacienteModel } from "../model/paciente.model";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class PacienteService extends ServicePrincipalService<
  PacienteModel,
  number
> {
  constructor(
    public httpClient: HttpClient,
    public activatedRoute: ActivatedRoute,
    public router: Router
  ) {
    super(httpClient, activatedRoute, router, "pacientes");
  }
}
