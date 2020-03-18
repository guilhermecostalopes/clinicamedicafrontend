import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicePrincipalService } from 'src/app/core/services/service-principal.service';
import { EspecialidadeModel } from '../model/especialidade.model';

@Injectable({
  providedIn: 'root'
})
export class EpecialidadeService extends ServicePrincipalService<EspecialidadeModel, string> {

  constructor(
    public httpClient: HttpClient,
    public activatedRoute: ActivatedRoute,
    public router: Router
  ) {
    super(
      httpClient,
      activatedRoute,
      router,
      'especialidades'
    );
  }
}
