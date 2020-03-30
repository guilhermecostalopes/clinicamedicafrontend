import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CLINICA_MEDICA_API } from "src/app/core/services/clinicamedica.api";

@Injectable({
  providedIn: "root"
})
export class DashboardService {
  constructor(private httpClient: HttpClient) {}

  montarGrafico() {
    return this.httpClient.get(
      `${CLINICA_MEDICA_API}` + "/"
    );
  }
}
