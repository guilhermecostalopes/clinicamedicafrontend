import { PaginacaoEnvioModel } from 'src/app/core/model/paginacao-envio.model';

export class UsuarioPesquisarModel extends PaginacaoEnvioModel {
  public nome: string;
  public login: string;
  public role: string;
}
