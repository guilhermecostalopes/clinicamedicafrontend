import "rxjs/add/operator/map";

export interface CrudOperations<T, ID> {
  incluir(t: T);
  alterar(t: T);
  excluir(id: ID);
  pesquisar(p: T);
  buscarPeloId(id: ID);
  buscarTodos();
}
