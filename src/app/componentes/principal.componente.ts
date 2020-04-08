import { OnInit, ViewChild } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { ComumComponente } from "../core/comum.component";
import { DialogComponent } from "../core/dialog/dialog.component";
import { SnackBarComponent } from '../core/snack-bar/snack-bar.component';

export abstract class PrincipalComponente extends ComumComponente
  implements OnInit {
  protected alteracao: boolean;
  protected tituloMenu: string;
  protected bread: string;

  protected antesDeletarAlterar: boolean;
  protected selecaoBusca: any;
  protected id: number;

  protected displayedColumns: string[];
  public entidadePesquisa: any[];
  protected dataSource: MatTableDataSource<any> = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  /**
   * Variáveis da paginação
   */
  public pageIndex = 0;
  public resultsLength = 0;
  public isLoadingResults = false;
  public isRateLimitReached = false;
  public paginaAtual: number;
  public quantidadeRegistros: number;
  public campo: string;
  public direcao: string;
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
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.alteracao = false;
    this.breadcrumb();
  }

  private breadcrumb() {
    const rotaAtalMomento = this.routaAtual.snapshot.url[1].path;
    if (String(rotaAtalMomento) === "incluir") {
      this.bread = "Pesquisar >> ";
      this.tituloMenu = " Incluir ";
    } else if (String(rotaAtalMomento) === "pesquisar") {
      this.tituloMenu = " Pesquisar ";
    } else {
      const rota = this.routaAtual.snapshot.url[0].path;
      if (String(rota) === "visualizar") {
        this.tituloMenu = " Visualizar ";
      }
      this.bread = "Pesquisar >> ";
      this.alteracao = true;
      this.limparAlterar();
    }
  }

  public novo() {
    this.router.navigate(["/" + this.pagina + "/incluir"]);
  }

  public voltar() {
    this.router.navigate(["/" + this.pagina + "/pesquisar"]);
  }

  public alterar(id: string) {
    this.router.navigate(["/" + this.pagina + "/" + id + "/alterar"]);
  }

  public pesquisar(mostrarMensagem: boolean, modelo: any) {
    this.modelo = modelo;
    this.mostrarPesquisa = false;
    this.servico.pesquisar(modelo.value).subscribe(
      (data: any) => {
        this.entidadePesquisa = data.lista;
        if (mostrarMensagem) {
          this.mensagemTela(data.mensagem.type, data.mensagem.texto);
        }
        if (this.entidadePesquisa.length > 0) {
          this.mostrarPesquisa = true;
        }
      },
      (err: any) => {
        this.mensagemTela("ERROR", []);
      }
    );
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
        this.mensagemTela(data.mensagem.type, data.mensagem.texto);
        this.redirecionamentoAposMensagem(data, false);
      },
      (error: any) => {
        super.mensagemTela('ERROR', error);
      }
    );
  }

  private alterarBanco(formBuilder: any) {
    this.servico.alterar(formBuilder).subscribe(
      (data: any) => {
        this.mensagemTela(data.mensagem.type, data.mensagem.texto);
        this.redirecionamentoAposMensagem(data, false);
      },
      (error: any) => {
        super.mensagemTela('ERROR', error);
      }
    );
  }

  protected alterarRegistro(formBuilder: FormBuilder) {
    this.servico.alterar(formBuilder).subscribe(
      (data: any) => {
        this.mensagemTela(data.mensagem.type, data.mensagem.texto);
        this.redirecionamentoAposMensagem(data, false);
      },
      (error: any) => {
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
      },
      (error: any) => { }
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
      super.mensagemTela('ERROR', [mensagem]);
      this.antesDeletarAlterar = true;
      return true;
    }
    return false;
  }

  protected redirecionamentoAposMensagem(type: string, mesmaPagina: boolean) {
    if (type !== "ERROR") {
      setTimeout(() => {
        mesmaPagina
          ? this.pesquisar(false, this.modelo)
          : this.router.navigate([this.pagina + "/pesquisar"]);
      }, 3600);
    }
  }

  private aposBloquearDesbloquearInativarDeletar(data: any) {
    this.mensagemTela(data.mensagem.type, data.mensagem.texto);
    this.redirecionamentoAposMensagem(data, true);
    this.selecaoBusca = null;
  }

  private escolhendoNao() {
    this.pesquisar(false, this.modelo);
    this.selecaoBusca = null;
  }
}
