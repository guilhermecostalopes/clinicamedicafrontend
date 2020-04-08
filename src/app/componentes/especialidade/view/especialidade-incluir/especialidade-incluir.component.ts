import { Component } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { PrincipalComponente } from "src/app/componentes/principal.componente";
import { TranslateService } from "@ngx-translate/core";
import { EpecialidadeService } from '../../service/epecialidade.service';
import { EspecialidadeModel } from '../../model/especialidade.model';
import { SnackBarComponent } from 'src/app/core/snack-bar/snack-bar.component';

@Component({
  selector: "app-especialidade-incluir",
  templateUrl: "./especialidade-incluir.component.html",
  styleUrls: ["./especialidade-incluir.component.scss"]
})
export class EspecialidadeIncluirComponent extends PrincipalComponente {
  public especialidadeIncluirFormGroup: FormGroup;

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
    this.especialidadeIncluirFormGroup = this.formBuilder.group({
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
    if (this.especialidadeIncluirFormGroup.invalid) {
      if (this.especialidadeIncluirFormGroup.get("nome").errors != null) {
        if (this.especialidadeIncluirFormGroup.get("nome").errors.required) {
          //super.mensagemTela("ERROR", ["Nome é obrigatório !"]);
        } else if (
          this.especialidadeIncluirFormGroup.get("nome").errors.minlength
        ) {
          /*super.mensagemTela(
            "ERROR",
            ["Nome deve ter no mínimo de 5 caracteres !"]
          );*/
        } else if (
          this.especialidadeIncluirFormGroup.get("nome").errors.maxlength
        ) {
          /*super.mensagemTela(
            "ERROR",
            ["Nome deve ter no máximo de 255 caracteres !"]
          );*/
        }
      }
      return;
    }
    super.salvar(this.especialidadeIncluirFormGroup.value);
  }

  public limpar() {
    this.mostrarPesquisa = false;
    this.especialidadeIncluirFormGroup.reset();
  }
}
