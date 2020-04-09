import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { PrincipalComponente } from 'src/app/componentes/principal.componente';
import { PaginacaoEnvioModel } from 'src/app/core/model/paginacao-envio.model';
import { SnackBarComponent } from 'src/app/core/snack-bar/snack-bar.component';
import { UsuarioService } from '../../service/usuario.service';

@Component({
  selector: "app-usuario-pesquisa",
  templateUrl: "./usuario-pesquisa.component.html",
  styleUrls: ["./usuario-pesquisa.component.scss"]
})
export class UsuarioPesquisaComponent extends PrincipalComponente {
  public usuarioPesquisarFormGroup: FormGroup;
  displayedColumns: string[] = ["select", "nome", "login", "role"];

  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    public service: UsuarioService,
    public dialog: MatDialog,
    public routaAtual: ActivatedRoute,
    public translate: TranslateService,
    public snackBar: SnackBarComponent
  ) {
    super(
      new PaginacaoEnvioModel(),
      "usuarios",
      service,
      router,
      dialog,
      routaAtual,
      translate,
      snackBar
    );
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.criarFormGroup();
    this.iniciando();
  }

  public pesquisarBaseDados() {
    this.modelo.nome = this.usuarioPesquisarFormGroup.value.nome;
    this.modelo.login = this.usuarioPesquisarFormGroup.value.login;
    this.modelo.role = this.usuarioPesquisarFormGroup.value.role;
    super.pesquisarBanco(true);
  }

  public limpar() {
    this.mostrarPesquisa = false;
    this.usuarioPesquisarFormGroup.reset();
  }

  private criarFormGroup() {
    this.usuarioPesquisarFormGroup = this.formBuilder.group({
      nome: [],
      login: [],
      role: []
    });
  }

  private iniciando() {
    this.modelo.paginaAtual = 0;
    this.modelo.quantidadeRegistros = 10;
    this.modelo.direcao = 'asc';
    this.modelo.campo = 'nome';
  }
}
