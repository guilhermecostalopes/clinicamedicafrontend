import { Component, OnInit } from "@angular/core";
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
import { FichaPacienteService } from "../service/ficha-paciente.service";
import { FichaPacienteModel } from "../model/ficha-paciente.model";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-ficha-paciente-alterar",
  templateUrl: "./ficha-paciente-alterar.component.html",
  styleUrls: ["./ficha-paciente-alterar.component.scss"]
})
export class FichaPacienteAlterarComponent extends PrincipalComponente {
  public fichaPacienteAlterarFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    public service: FichaPacienteService,
    public alertService: AlertService,
    public dialog: MatDialog,
    public routaAtual: ActivatedRoute,
    public translate: TranslateService
  ) {
    super(
      new FichaPacienteModel(),
      "fichas-paciente",
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
    this.fichaPacienteAlterarFormGroup = this.formBuilder.group({
      id: new FormControl(
        { value: "" },
        Validators.compose([Validators.required])
      ),
      nomePaciente: new FormControl(
        { value: "" },
        Validators.compose([
          Validators.maxLength(255),
          Validators.minLength(5),
          Validators.required
        ])
      ),
      numeroCarteiraPlano: new FormControl(
        { value: "" },
        Validators.compose([
          Validators.maxLength(255),
          Validators.minLength(5),
          Validators.required
        ])
      ),
      planosDeSaude: new FormControl(
        { value: "" },
        Validators.compose([Validators.required])
      ),
      especialidades: new FormControl(
        { value: "" },
        Validators.compose([Validators.required])
      )
    });
  }

  public salvarForm() {
    if (this.fichaPacienteAlterarFormGroup.invalid) {
      if (this.fichaPacienteAlterarFormGroup.get("id").errors != null) {
        if (this.fichaPacienteAlterarFormGroup.get("id").errors.required) {
          super.mensagemTela("ERROR", "Para alterar o ID é obrigatório !");
        }
      } else if (
        this.fichaPacienteAlterarFormGroup.get("nomePaciente").errors != null
      ) {
        if (
          this.fichaPacienteAlterarFormGroup.get("nomePaciente").errors.required
        ) {
          super.mensagemTela("ERROR", "Nome do paciente é obrigatório !");
        } else if (
          this.fichaPacienteAlterarFormGroup.get("nomePaciente").errors
            .minlength
        ) {
          super.mensagemTela(
            "ERROR",
            "Nome do paciente deve ter no mínimo de 5 caracteres !"
          );
        } else if (
          this.fichaPacienteAlterarFormGroup.get("nomePaciente").errors
            .maxlength
        ) {
          super.mensagemTela(
            "ERROR",
            "Nome do paciente deve ter no máximo de 255 caracteres !"
          );
        }
      } else if (
        this.fichaPacienteAlterarFormGroup.get("numeroCarteiraPlano").errors !=
        null
      ) {
        if (
          this.fichaPacienteAlterarFormGroup.get("numeroCarteiraPlano").errors
            .required
        ) {
          super.mensagemTela(
            "ERROR",
            "Número da carteira do paciente é obrigatório !"
          );
        } else if (
          this.fichaPacienteAlterarFormGroup.get("numeroCarteiraPlano").errors
            .minlength
        ) {
          super.mensagemTela(
            "ERROR",
            "Número da carteira do paciente deve ter no mínimo de 5 caracteres !"
          );
        } else if (
          this.fichaPacienteAlterarFormGroup.get("numeroCarteiraPlano").errors
            .maxlength
        ) {
          super.mensagemTela(
            "ERROR",
            "Número da carteira do paciente deve ter no máximo de 255 caracteres !"
          );
        }
      } else if (
        this.fichaPacienteAlterarFormGroup.get("planosDeSaude").errors != null
      ) {
        if (
          this.fichaPacienteAlterarFormGroup.get("planosDeSaude").errors
            .required
        ) {
          super.mensagemTela(
            "ERROR",
            "Plano de saúde do paciente é obrigatório !"
          );
        }
      } else if (
        this.fichaPacienteAlterarFormGroup.get("especialidades").errors != null
      ) {
        if (
          this.fichaPacienteAlterarFormGroup.get("especialidades").errors
            .required
        ) {
          super.mensagemTela(
            "ERROR",
            "Especialidade do médico do paciente é obrigatório !"
          );
        }
      }
      return;
    }
    super.salvar(this.fichaPacienteAlterarFormGroup.value);
  }

  public limpar() {
    this.mostrarPesquisa = false;
    this.fichaPacienteAlterarFormGroup.reset();
  }
}
