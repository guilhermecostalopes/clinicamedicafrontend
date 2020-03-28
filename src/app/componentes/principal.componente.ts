import { OnInit, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AlertService } from "ngx-alerts";
import { MatDialogConfig, MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { DialogComponent } from "../core/dialog/dialog.component";
import { FormBuilder } from "@angular/forms";
import { ComumComponente } from "../core/comum.component";

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
    public label: string,
    public pagina: string,
    public servico: any,
    public router: Router,
    public alertService: AlertService,
    public dialog: MatDialog,
    public routaAtual: ActivatedRoute
  ) {
    super(alertService);
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.alteracao = false;
    this.breadcrumb();
  }

  private breadcrumb() {
    const rotaAtalMomento = this.routaAtual.snapshot.url[1];
    if (String(rotaAtalMomento) === "incluir") {
      this.bread = "Pesquisar >> ";
      this.tituloMenu = " Incluir ";
    } else if (String(rotaAtalMomento) === "pesquisar") {
      this.tituloMenu = " Pesquisar ";
    } else {
      const rota = this.routaAtual.snapshot.url[2];
      if (String(rota) === "visualizar") {
        this.tituloMenu = " Visualizar ";
      } else {
        this.tituloMenu = " Alterar ";
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
        this.mensagemTela("ERROR", "");
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
        this.mensagemErro(error);
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
        this.mensagemErro(error);
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
        this.mensagemErro(error);
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
      (error: any) => {}
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
                this.mensagemErro(error);
              }
            );
          } else {
            this.escolhendoNao();
          }
        },
        (error: any) => {
          this.mensagemErro(error);
        }
      );
    }
  }

  protected antesAlterarDeletar(selecao: any, mensagem: string) {
    this.antesDeletarAlterar = false;
    if (selecao === undefined || selecao == null) {
      this.mensagemTela("ERROR", mensagem);
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

  private mensagemErro(erroServidor: any) {
    this.mensagemTela(erroServidor.error.type, erroServidor.error.texto);
  }

  private escolhendoNao() {
    this.pesquisar(false, this.modelo);
    this.selecaoBusca = null;
  }
}
