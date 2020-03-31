import { Component } from "@angular/core";
import { PrincipalComponente } from "../../principal.componente";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { AlertService } from "ngx-alerts";
import { MatDialog } from "@angular/material/dialog";
import { TranslateService } from "@ngx-translate/core";
import { EspecialidadeModel } from "../../especialidade/model/especialidade.model";
import { UsuarioService } from "../service/usuario.service";

@Component({
  selector: "app-usuario-pesquisar",
  templateUrl: "./usuario-pesquisar.component.html",
  styleUrls: ["./usuario-pesquisar.component.css"]
})
export class UsuarioPesquisarComponent extends PrincipalComponente {
  public usuarioPesquisarFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    public service: UsuarioService,
    public alertService: AlertService,
    public dialog: MatDialog,
    public routaAtual: ActivatedRoute,
    public translate: TranslateService
  ) {
    super(
      new EspecialidadeModel(),
      "usuarios",
      "usuarios",
      service,
      router,
      alertService,
      dialog,
      routaAtual,
      translate
    );
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.criarFormGroup();
  }

  criarFormGroup() {
    this.usuarioPesquisarFormGroup = this.formBuilder.group({
      nome: [],
      login: [],
      role: []
    });
  }
  public pesquisarBaseDados() {
    super.pesquisar(true, this.usuarioPesquisarFormGroup);
  }

  public limpar() {
    this.mostrarPesquisa = false;
    this.usuarioPesquisarFormGroup.reset();
  }
}
