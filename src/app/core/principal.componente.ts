import {
    OnInit,
    ViewChild
} from '@angular/core';
import {
    Router,
    ActivatedRoute
} from '@angular/router';
import { AlertService } from 'ngx-alerts';
import {
    MatDialogConfig,
    MatDialog
} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table'
import { DialogComponent } from './dialog/dialog.component';
import {
    startWith,
    switchMap,
    map,
    catchError
  } from 'rxjs/operators';
  import {
    merge,
    of as observableOf
  } from 'rxjs';
import {
    FormGroup,
    FormBuilder
} from '@angular/forms';

export abstract class PrincipalComponente implements OnInit {

    protected tituloMenu: string;
    protected bread: string;

    protected antesDeletarAlterar: boolean;
    protected selecaoBusca: any;
    protected id: number;

    protected displayedColumns: string[];
    public entidadePesquisa: any[];
    protected dataSource: MatTableDataSource<any> = new MatTableDataSource();

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

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
        public routaAtual: ActivatedRoute,
    ){}

    ngOnInit(): void {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    public novo() {
        this.router.navigate(['/' + this.pagina + '/incluir']);
    }

    public voltar() {
        this.router.navigate(['/' + this.pagina + '/pesquisar']);
    }

    public alterar(id: string) {
        this.router.navigate(['/' + this.pagina + '/' + id + '/alterar']);
    }

    public pesquisar(mostrarMensagem: boolean) {
        this.servico.pesquisar(this.modelo).subscribe(
          (data :any) => { 
            this.entidadePesquisa = data.lista;
            if(mostrarMensagem){
                //this.mensagemTela(data.tipoMensagem.tipo, data.tipoMensagem.sumario, data.tipoMensagem.mensagem);
            }
            if(this.entidadePesquisa.length > 0){
                this.mostrarPesquisa = true;
            }
        }, (err: any) => {
          //this.mensagemTela('error', 'Mensagem de erro', 'Erro no servidor !');
        }
      );
    }

    protected salvar(formBuilder: FormBuilder) {
        this.servico.incluir(formBuilder).subscribe(
        (data: any) => {
            this.mensagemTela(data.mensagem.type, data.mensagem.texto);
            this.redirecionamentoAposMensagem(data, false);
        }, (error: any) => {
            this.mensagemErro(error);
        }
        );
    }

    protected alterarRegistro(formBuilder: FormBuilder) {
        this.servico.alterar(formBuilder).subscribe(
        (data: any) => {
            this.mensagemTela(data.mensagem.type, data.mensagem.texto);
            this.redirecionamentoAposMensagem(data, false);
        }, (error: any) => {
            this.mensagemErro(error);
        }
        );
    }

    protected limparAlterar() {
        this.id = Number(this.routaAtual.snapshot.url[1].path);
        this.preencherAlteracao();
    }

    protected preencherAlteracao() {
        this.servico.buscar(this.id).subscribe(
          (data: any) => {
            this.modelo = data;
          }, (error: any) => {
    
          }
        );
    }

    public preencherId(id: any) {
        this.selecaoBusca = id;
    }

    public excluir() {
        this.antesAlterarDeletar(this.selecaoBusca, 'Deve selecionar uma linha da grade para deletar !');
        if (!this.antesDeletarAlterar) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {
            id:  this.selecaoBusca,
            title: 'Deseja deletar o registro ?'
        };
        const dialogRef = this.dialog.open(DialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(
            (excluir: any) => {
            if (excluir !== 'close') {
                this.servico.excluir(this.selecaoBusca).subscribe(
                (data: any) => {
                    this.aposBloquearDesbloquearInativarDeletar(data);
                }, (error: any) => {
                    this.mensagemErro(error);
                }
                );
            } else {
                this.escolhendoNao();
            }
            }, (error: any) => {
            this.mensagemErro(error);
            }
        );
        }
    }

    protected antesAlterarDeletar(selecao: any, mensagem: string) {
        this.antesDeletarAlterar = false;
        if (selecao === undefined || selecao == null) {
            this.mensagemTela('ERROR', mensagem);
            this.antesDeletarAlterar = true;
            return true;
        }
        return false;
    }

    protected mensagemTela(tipoMensagem: string, mensagem: string) {
        if (tipoMensagem === 'ERROR') {
            this.alertService.danger({html: mensagem});
        } else if (tipoMensagem === 'SUCCESS') {
            this.alertService.success({html: mensagem});
        } else if (tipoMensagem === 'WARNING') {
            this.alertService.warning({html: mensagem});
        } else {
            this.alertService.info({html: mensagem});
        }
    }

    protected redirecionamentoAposMensagem(type: string, mesmaPagina: boolean) {
        if (type !== 'ERROR') {
        setTimeout(
            () => {
            mesmaPagina ?
            this.pesquisar(false) :
            this.router.navigate([this.pagina + '/pesquisar']);
            },
        );
        }
    }

    private aposBloquearDesbloquearInativarDeletar(data: any) {
        this.mensagemTela(data[0].type, data[0].texto);
        this.redirecionamentoAposMensagem(data, true);
        this.selecaoBusca = null;
    }

    private mensagemErro(erroServidor: any) {
        this.mensagemTela(erroServidor.error.type, erroServidor.error.texto);
    }

    private escolhendoNao() {
        this.pesquisar(false);
        this.selecaoBusca = null;
    }
}