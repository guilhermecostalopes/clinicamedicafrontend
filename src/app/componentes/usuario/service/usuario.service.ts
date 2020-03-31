import { Injectable } from '@angular/core';
import { ServicePrincipalService } from 'src/app/core/services/service-principal.service';
import { UsuarioModel } from 'src/app/security/model/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends ServicePrincipalService<UsuarioModel,number>

  constructor() { }
}
