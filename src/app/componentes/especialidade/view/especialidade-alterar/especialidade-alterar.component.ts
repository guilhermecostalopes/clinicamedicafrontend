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
import { SnackBarComponent } from 'src/app/core/snack-bar/snack-bar.component';
import { MensagemModel } from 'src/app/security/model/error.model';
import { EspecialidadeModel } from '../../model/especialidade.model';
import { EpecialidadeService } from '../../service/epecialidade.service';

@Component({
  selector: "app-especialidade-alterar",
  templateUrl: "./especialidade-alterar.component.html",
  styleUrls: ["./especialidade-alterar.component.scss"]
})
export class EspecialidadeAlterarComponent extends PrincipalComponente {
  public especialidadeAlterarFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    public service: EpecialidadeService,
    public dialog: MatDialog,
    public routaAtual: ActivatedRoute,
    public translate: TranslateService,
    public snackBar: SnackBarComponent
  ) {
    super(
      new EspecialidadeModel(),
      "especialidades",
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
    this.especialidadeAlterarFormGroup = this.formBuilder.group({
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
    if (this.especialidadeAlterarFormGroup.invalid) {
      let errorMessage = new MensagemModel();
      let errorMessages: Array<MensagemModel> = [];
      const nome = this.especialidadeAlterarFormGroup.get("nome");
      if (nome.errors != null) {
        const nomeError = nome.errors;
        if (nomeError.required) {
          errorMessage.texto = "Nome é obrigatório !";
        } else if (nomeError.minlength) {
          errorMessage.texto = "Nome deve ter no mínimo de " +
            nomeError.minlength.requiredLength
            + " caracteres !";
        } else if (nomeError.maxlength) {
          errorMessage.texto = "Nome deve ter no máximo de " +
            nomeError.maxlength.requiredLength
            + " caracteres !";
        }
      }
      errorMessages.push(errorMessage);
      super.mensagemTela("ERROR", errorMessages);
      return;
    }
    super.salvar(this.especialidadeAlterarFormGroup.value);
  }

  public limpar() {
    this.mostrarPesquisa = false;
    this.especialidadeAlterarFormGroup.reset();
  }
}
