import { Component } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { PrincipalComponente } from "src/app/componentes/principal.componente";
import { PlanoSaudeService } from '../../service/plano-saude.service';
import { PlanoSaudeModel } from '../../model/plano-saude.model';
import { SnackBarComponent } from 'src/app/core/snack-bar/snack-bar.component';

@Component({
  selector: "app-plano-saude-alterar",
  templateUrl: "./plano-saude-alterar.component.html",
  styleUrls: ["./plano-saude-alterar.component.scss"]
})
export class PlanoSaudeAlterarComponent extends PrincipalComponente {
  public planoSaudeAlterarFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    public service: PlanoSaudeService,
    public dialog: MatDialog,
    public routaAtual: ActivatedRoute,
    public translate: TranslateService,
    public snackBar: SnackBarComponent
  ) {
    super(
      new PlanoSaudeModel(),
      "planos-saude",
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

  public criarFormGroup() {
    this.planoSaudeAlterarFormGroup = this.formBuilder.group({
      id: new FormControl(
        { value: "" },
        Validators.compose([Validators.required])
      ),
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
    if (this.planoSaudeAlterarFormGroup.invalid) {
      if (this.planoSaudeAlterarFormGroup.get("nome").errors != null) {
        if (this.planoSaudeAlterarFormGroup.get("nome").errors.required) {
          super.mensagemTela("ERROR", "Nome do plano de saúde é obrigatório !");
        } else if (
          this.planoSaudeAlterarFormGroup.get("nome").errors.minlength
        ) {
          super.mensagemTela(
            "ERROR",
            "Nome do plano de saúde deve ter no mínimo de 5 caracteres !"
          );
        } else if (
          this.planoSaudeAlterarFormGroup.get("nome").errors.maxlength
        ) {
          super.mensagemTela(
            "ERROR",
            "Nome do plano de saúde deve ter no máximo de 255 caracteres !"
          );
        }
      }
      return;
    }
    super.salvar(this.planoSaudeAlterarFormGroup.value);
  }

  public limpar() {
    this.mostrarPesquisa = false;
    this.planoSaudeAlterarFormGroup.reset();
  }
}
