import { Component } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { PrincipalComponente } from "src/app/componentes/principal.componente";
import { TranslateService } from "@ngx-translate/core";
import { PlanoSaudeService } from '../../service/plano-saude.service';
import { PlanoSaudeModel } from '../../model/plano-saude.model';

@Component({
  selector: "app-plano-saude-pesquisa",
  templateUrl: "./plano-saude-pesquisa.component.html",
  styleUrls: ["./plano-saude-pesquisa.component.scss"]
})
export class PlanoSaudePesquisaComponent extends PrincipalComponente {
  public planoSaudePesquisarFormGroup: FormGroup;

  displayedColumns: string[] = ["select", "nome"];

  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    public service: PlanoSaudeService,
    public dialog: MatDialog,
    public routaAtual: ActivatedRoute,
    public translate: TranslateService
  ) {
    super(
      new PlanoSaudeModel(),
      "planos-saude",
      service,
      router,
      dialog,
      routaAtual,
      translate
    );
  }

  ngOnInit() {
    super.ngOnInit();
    this.criarFormGroup();
  }

  criarFormGroup() {
    this.planoSaudePesquisarFormGroup = this.formBuilder.group({
      nome: []
    });
  }

  public pesquisarBaseDados() {
    super.pesquisar(true, this.planoSaudePesquisarFormGroup);
  }

  public limpar() {
    this.mostrarPesquisa = false;
    this.planoSaudePesquisarFormGroup.reset();
  }
}
