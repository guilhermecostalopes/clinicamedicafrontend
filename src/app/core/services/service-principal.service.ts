import { CrudOperations } from './crudoperations.interface';
import { HttpClient } from '@angular/common/http';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { Injectable } from '@angular/core';
import { CLINICA_MEDICA_API } from './clinicamedica.api';
import pickBy from 'lodash/pickBy';
import isArray from 'lodash/isArray';
import isEmpty from 'lodash/isEmpty';
import isUndefined from 'lodash/isUndefined';
import isNull from 'lodash/isNull';
import trim from 'lodash/trim';

@Injectable({
  providedIn: 'root'
})
export class ServicePrincipalService<T, ID> implements CrudOperations<T, ID> {

  constructor(
    public httpClient: HttpClient,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public base: String
  ) {}

  public incluir(t: T) {
    return this.httpClient.post(`${CLINICA_MEDICA_API}` + this.base + '/incluir', t);
  }

  public alterar(t: T) {
    return this.httpClient.put(`${CLINICA_MEDICA_API}` + this.base + '/alterar', t);
  }

  public excluir(id: ID) {
    return this.httpClient.delete(`${CLINICA_MEDICA_API}` + this.base + '/excluir/' + id);
  }

  public pesquisar(p: T) {
    const params: any = this.removerUndefinedEmptyNull(p);
    this.updateURLComParametrosDePesquisa(p);
    return this.httpClient.get(`${CLINICA_MEDICA_API}` + this.base + '/pesquisar', { params });
  }

  public buscarPeloId(id: ID) {
    return this.httpClient.get(`${CLINICA_MEDICA_API}` + this.base + '/buscarPeloId/' + id);
  }

  public buscarTodos(){
    return this.httpClient.get(`${CLINICA_MEDICA_API}` + this.base + '/buscarTodos');
  }

  private removerUndefinedEmptyNull(parameters: any) {
    const res = pickBy(parameters,
      // tslint:disable-next-line:only-arrow-functions
      function(value: any) {
          let definido: boolean;
          if (isArray(value)) {
            definido = !isEmpty(value);
          } else {
            definido = !isUndefined(value) && !isNull(value) && !isEmpty(trim(value));
          }
          return definido;
      }
    );
    return res;
  }

  private updateURLComParametrosDePesquisa(parametros: any) {
    this.router.navigate([], { relativeTo: this.activatedRoute, queryParams: parametros });
  }
}
