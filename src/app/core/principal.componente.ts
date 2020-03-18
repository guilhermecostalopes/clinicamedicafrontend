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
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
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
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

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
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
        merge(this.sort.sortChange, this.paginator.page)
        .pipe(
            startWith({}),
            switchMap(() => {
                this.isLoadingResults = true;
                this.modelo.paginaAtual = this.paginator.pageIndex;
                this.modelo.campo = this.sort.active;
                this.modelo.direcao = this.sort.direction;
                return this.servico.pesquisar(this.modelo);
                }
        ),
        map((data: any) => {
            this.isLoadingResults = false;
            this.isRateLimitReached = false;
            this.resultsLength = data.page.totalElementos;

            this.paginaAtual = data.page.numeroPagina;
            this.quantidadeRegistros = data.page.totalRegistros;
            this.campo = data.page.campoOrdenado.campo;
            this.direcao = data.page.campoOrdenado.direcao;

            this.mostrarPesquisa = true;
            if (mostrarMensagem) {
                this.mensagemTela(data.page.mensagens[0].type,
                data.page.mensagens[0].texto);
            }
            return data.lista;
            }
        ),
        catchError(() => {
            this.isLoadingResults = false;
            this.isRateLimitReached = true;
            return observableOf([]);
            }
        )
        ).subscribe((data: any) => this.entidadePesquisa = data);
    }

    protected salvar(formBuilder: FormBuilder) {
        this.servico.incluir(formBuilder).subscribe(
        (data: any) => {
            this.mensagemTela(data.mensagens[0].type, data.mensagens[0].texto);
            this.redirecionamentoAposMensagem(data, false);
        }, (error: any) => {
            this.mensagemErro(error);
        }
        );
    }

    protected alterarRegistro(formBuilder: FormBuilder) {
        this.servico.alterar(formBuilder).subscribe(
        (data: any) => {
            this.mensagemTela(data.mensagens[0].type, data.mensagens[0].texto);
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
        if (erroServidor.error.length === 1) {
            this.mensagemTela(erroServidor.error[0].type, erroServidor.error[0].texto);
        } else {
            let mensagens = '';
            erroServidor.error.forEach((mensagem: any) => {
                mensagens = mensagens + mensagem.texto + '<br>';
            });
            this.mensagemTela(erroServidor.error[0].type, mensagens);
        }
    }

    private escolhendoNao() {
        this.pesquisar(false);
        this.selecaoBusca = null;
    }
}