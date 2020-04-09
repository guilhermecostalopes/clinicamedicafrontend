import { ViewChild } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import {
  merge,
  of as observableOf
} from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { ComumComponente } from "../core/comum.component";
import { DialogComponent } from "../core/dialog/dialog.component";
import { SnackBarComponent } from '../core/snack-bar/snack-bar.component';
import { MensagemModel } from '../security/model/error.model';

export abstract class PrincipalComponente extends ComumComponente {
  protected alteracao: boolean;
  public bread: string;

  protected antesDeletarAlterar: boolean;
  protected selecaoBusca: any;
  protected id: number;

  /**
   * Páginas d pesquisas
   */
  public entidadePesquisa: any[];
  protected dataSource: MatTableDataSource<any> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  /**
   * Variáveis da paginação
   */
  public resultsLength = 0;
  public isLoadingResults = false;
  public isRateLimitReached = false;
  public mostrarPesquisa: boolean;

  constructor(
    public modelo: any,
    public pagina: string,
    public servico: any,
    public router: Router,
    public dialog: MatDialog,
    public routaAtual: ActivatedRoute,
    public translate: TranslateService,
    public snackBar: SnackBarComponent
  ) {
    super(snackBar);
  }

  ngOnInit(): void {
    this.alteracao = false;
    this.breadcrumb();
  }

  private breadcrumb() {
    const rotaAtalMomento = this.routaAtual.snapshot.url[1].path;
    if (String(rotaAtalMomento) === "incluir") {
      this.bread = "Pesquisar >> ";
    } else if (String(rotaAtalMomento) === "pesquisar") {
    } else {
      this.bread = "Pesquisar >> ";
      this.alteracao = true;
      this.limparAlterar();
    }
  }

  public novo() {
    this.router.navigate(["/" + this.pagina + "/incluir"]);
  }

  public pesquisar() {
    this.router.navigate(["/" + this.pagina + "/pesquisar"]);
  }

  public alterar(id: string) {
    this.router.navigate(["/" + this.pagina + "/" + id + "/alterar"]);
  }

  getServerData(event?: PageEvent) {
    this.modelo.paginaAtual = event.pageIndex;
    this.modelo.quantidadeRegistros = event.pageSize;
    this.pesquisarBanco(false);
  }

  pesquisarBanco(mostrarMensagem: boolean) {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          this.modelo.direcao = this.sort.direction;
          this.modelo.campo = this.sort.active;
          return this.servico.pesquisar(this.modelo);
        }),
        map((data: any) => {
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.totalRegistros;
          this.mostrarPesquisa = true;
          if (mostrarMensagem) {
            let errorMessage = new MensagemModel();
            let errorMessages: Array<MensagemModel> = [];
            errorMessage.texto = data.mensagem.texto;
            errorMessages.push(errorMessage);
            this.mensagemTela(data.mensagem.type,
              errorMessages);
          }
          return data.lista;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe((data: any) => this.entidadePesquisa = data);

  }

  protected salvar(formBuilder: any) {
    if (formBuilder.id !== null && formBuilder.id != undefined) {
      this.alterarBanco(formBuilder);
    } else {
      this.incluirBanco(formBuilder);
    }
  }

  private incluirBanco(formBuilder: any) {
    this.servico.incluir(formBuilder).subscribe(
      (data: any) => {
        let errorMessage = new MensagemModel();
        let errorMessages: Array<MensagemModel> = [];
        errorMessage.texto = data.mensagem.texto;
        errorMessages.push(errorMessage);
        this.mensagemTela(data.mensagem.type, errorMessages);
        this.redirecionamentoAposMensagem(data, false);
      },
      (error: any) => {
        console.log(error);
        super.mensagemTela('ERROR', error);
      }
    );
  }

  private alterarBanco(formBuilder: any) {
    this.servico.alterar(formBuilder).subscribe(
      (data: any) => {
        let errorMessage = new MensagemModel();
        let errorMessages: Array<MensagemModel> = [];
        errorMessage.texto = data.mensagem.texto;
        errorMessages.push(errorMessage);
        this.mensagemTela(data.mensagem.type, errorMessages);
        this.redirecionamentoAposMensagem(data, false);
      },
      (error: any) => {
        console.log(error);
        super.mensagemTela('ERROR', error);
      }
    );
  }

  public limparAlterar() {
    this.id = Number(this.routaAtual.snapshot.url[1].path);
    this.preenchendoCampoAlteracao();
  }

  public preencherId(id: any) {
    this.selecaoBusca = id;
  }

  private preenchendoCampoAlteracao() {
    this.servico.buscarPeloId(this.id).subscribe(
      (data: any) => {
        this.modelo = data;
      }
    );
  }

  public preencherAlteracao() {
    this.antesAlterarDeletar(
      this.selecaoBusca,
      "Deve selecionar uma linha da grade para alterar !"
    );
    if (!this.antesDeletarAlterar) {
      this.router.navigate([
        "/" + this.pagina + "/" + this.selecaoBusca + "/alterar"
      ]);
    }
  }

  public excluir() {
    this.antesAlterarDeletar(
      this.selecaoBusca,
      "Deve selecionar uma linha da grade para deletar !"
    );
    if (!this.antesDeletarAlterar) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = {
        id: this.selecaoBusca,
        title: "Deseja deletar o registro ?"
      };
      const dialogRef = this.dialog.open(DialogComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(
        (excluir: any) => {
          if (excluir !== "close") {
            this.servico.excluir(this.selecaoBusca).subscribe(
              (data: any) => {
                this.aposBloquearDesbloquearInativarDeletar(data);
              },
              (error: any) => {
                super.mensagemTela('ERROR', error);
              }
            );
          } else {
            this.escolhendoNao();
          }
        },
        (error: any) => {
          super.mensagemTela('ERROR', error);
        }
      );
    }
  }

  protected antesAlterarDeletar(selecao: any, mensagem: string) {
    this.antesDeletarAlterar = false;
    if (selecao === undefined || selecao == null) {
      let errorMessage = new MensagemModel();
      let errorMessages: Array<MensagemModel> = [];
      errorMessage.texto = mensagem;
      errorMessages.push(errorMessage);
      super.mensagemTela("ERROR", errorMessages);
      this.antesDeletarAlterar = true;
      return true;
    }
    return false;
  }

  protected redirecionamentoAposMensagem(type: string, mesmaPagina: boolean) {
    if (type !== "ERROR") {
      setTimeout(() => {
        mesmaPagina
          ? this.pesquisarBanco(false)
          : this.router.navigate([this.pagina + "/pesquisar"]);
        null
      }, 3600);
    }
  }

  private aposBloquearDesbloquearInativarDeletar(data: any) {
    let errorMessage = new MensagemModel();
    let errorMessages: Array<MensagemModel> = [];
    errorMessage.texto = data.mensagem.texto;
    errorMessages.push(errorMessage);
    super.mensagemTela(data.mensagem.type, errorMessages);
    this.redirecionamentoAposMensagem(data, true);
    this.selecaoBusca = null;
  }

  private escolhendoNao() {
    this.pesquisarBanco(false);
    this.selecaoBusca = null;
  }
}
