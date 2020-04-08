import { Component } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { TranslateService } from "@ngx-translate/core";
import { PrincipalComponente } from 'src/app/componentes/principal.componente';
import { UsuarioService } from '../../service/usuario.service';
import { UsuarioPesquisarModel } from '../../model/usuarioPesquisar.model';
import { SnackBarComponent } from 'src/app/core/snack-bar/snack-bar.component';

@Component({
  selector: "app-usuario-pesquisar",
  templateUrl: "./usuario-pesquisar.component.html",
  styleUrls: ["./usuario-pesquisar.component.scss"]
})
export class UsuarioPesquisarComponent extends PrincipalComponente {
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
      new UsuarioPesquisarModel(),
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
  }

  criarFormGroup() {
    this.usuarioPesquisarFormGroup = this.formBuilder.group({
      nome: [],
      login: [],
      role: []
    });
  }

  public pesquisarBaseDados() {
    //super.pesquisar(true, this.usuarioPesquisarFormGroup);
  }

  public limpar() {
    this.mostrarPesquisa = false;
    this.usuarioPesquisarFormGroup.reset();
  }
}
