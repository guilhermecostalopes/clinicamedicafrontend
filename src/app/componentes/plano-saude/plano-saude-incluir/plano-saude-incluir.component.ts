import { Component } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { AlertService } from "ngx-alerts";
import { MatDialog } from "@angular/material/dialog";
import { PrincipalComponente } from "src/app/componentes/principal.componente";
import { PlanoSaudeService } from "../service/plano-saude.service";
import { PlanoSaudeModel } from "../model/plano-saude.model";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: "app-plano-saude-incluir",
  templateUrl: "./plano-saude-incluir.component.html",
  styleUrls: ["./plano-saude-incluir.component.css"]
})
export class PlanoSaudeIncluirComponent extends PrincipalComponente {
  public planoSaudeIncluirFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    public service: PlanoSaudeService,
    public alertService: AlertService,
    public dialog: MatDialog,
    public routaAtual: ActivatedRoute,
    public translate: TranslateService
  ) {
    super(
      new PlanoSaudeModel(),
      "planos-saude",
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

  public criarFormGroup() {
    this.planoSaudeIncluirFormGroup = this.formBuilder.group({
      nome: new FormControl(
        { value: "" },
        Validators.compose([
          Validators.maxLength(255),
          Validators.minLength(5),
          Validators.required
        ])
      )
    });
  }

  public salvarForm() {
    if (this.planoSaudeIncluirFormGroup.invalid) {
      if (this.planoSaudeIncluirFormGroup.get("nome").errors != null) {
        if (this.planoSaudeIncluirFormGroup.get("nome").errors.required) {
          super.mensagemTela("ERROR", "Nome do plano de saúde é obrigatório !");
        } else if (
          this.planoSaudeIncluirFormGroup.get("nome").errors.minlength
        ) {
          super.mensagemTela(
            "ERROR",
            "Nome do plano de saúde deve ter no mínimo de 5 caracteres !"
          );
        } else if (
          this.planoSaudeIncluirFormGroup.get("nome").errors.maxlength
        ) {
          super.mensagemTela(
            "ERROR",
            "Nome do plano de saúde deve ter no máximo de 255 caracteres !"
          );
        }
      }
      return;
    }
    super.salvar(this.planoSaudeIncluirFormGroup.value);
  }

  public limpar() {
    this.mostrarPesquisa = false;
    this.planoSaudeIncluirFormGroup.reset();
  }
}
