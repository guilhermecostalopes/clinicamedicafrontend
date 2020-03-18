import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicePrincipalService } from 'src/app/core/services/service-principal.service';
import { FichaPacienteModel } from '../model/ficha-paciente.model';

@Injectable({
  providedIn: 'root'
})
export class FichaPacienteService extends ServicePrincipalService<FichaPacienteModel, string> {

  constructor(
    public httpClient: HttpClient,
    public activatedRoute: ActivatedRoute,
    public router: Router
  ) {
    super(
      httpClient,
      activatedRoute,
      router,
      'fichasPaciente'
    );
  }
}
