import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { PrincipalComponente } from "src/app/componentes/principal.componente";
import { EnumModel } from 'src/app/core/model/enum.model';
import { PacienteModel } from 'src/app/componentes/paciente/model/paciente.model';
import { PacienteService } from 'src/app/componentes/paciente/service/paciente.service';
import { PlanoSaudeService } from 'src/app/componentes/plano-saude/service/plano-saude.service';
import { EpecialidadeService } from 'src/app/componentes/especialidade/service/epecialidade.service';
import { FichaPacienteService } from '../../service/ficha-paciente.service';
import { TranslateService } from '@ngx-translate/core';
import { FichaPacienteModel } from '../../model/ficha-paciente.model';
import { SnackBarComponent } from 'src/app/core/snack-bar/snack-bar.component';

@Component({
  selector: "app-ficha-paciente-incluir",
  templateUrl: "./ficha-paciente-incluir.component.html",
  styleUrls: ["./ficha-paciente-incluir.component.scss"]
})
export class FichaPacienteIncluirComponent extends PrincipalComponente {
  public fichaPacienteIncluirFormGroup: FormGroup;
  public especialidades: EnumModel[] = [];
  public planosSaudes: EnumModel[] = [];
  public pacientes: PacienteModel[] = [];

  constructor(
    private pacienteService: PacienteService,
    private planoSaudeService: PlanoSaudeService,
    private epecialidadeService: EpecialidadeService,
    private formBuilder: FormBuilder,
    public router: Router,
    public service: FichaPacienteService,
    public dialog: MatDialog,
    public routaAtual: ActivatedRoute,
    public translate: TranslateService,
    public snackBar: SnackBarComponent
  ) {
    super(
      new FichaPacienteModel(),
      "fichas-paciente",
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
    this.preencherEspecialidades();
    this.preencherPlanosSaudes();
    this.preencherPacientes();
  }

  public criarFormGroup() {
    this.fichaPacienteIncluirFormGroup = this.formBuilder.group({
      pacientes: new FormControl(
        { value: "" },
        Validators.compose([Validators.required])
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
      ),
      data: new FormControl(
        { value: "" },
        Validators.compose([Validators.required])
      ),
      valor: new FormControl(
        { value: "" },
        Validators.compose([Validators.required])
      )
    });
  }

  public salvarForm() {
    if (this.fichaPacienteIncluirFormGroup.invalid) {
      if (this.fichaPacienteIncluirFormGroup.get("pacientes").errors != null) {
        if (
          this.fichaPacienteIncluirFormGroup.get("pacientes").errors.required
        ) {
          super.mensagemTela("ERROR", ["Paciente é obrigatório !"]);
        }
      } else if (
        this.fichaPacienteIncluirFormGroup.get("numeroCarteiraPlano").errors !=
        null
      ) {
        if (
          this.fichaPacienteIncluirFormGroup.get("numeroCarteiraPlano").errors
            .required
        ) {
          super.mensagemTela(
            "ERROR",
            ["Número da carteira do paciente é obrigatório !"]
          );
        } else if (
          this.fichaPacienteIncluirFormGroup.get("numeroCarteiraPlano").errors
            .minlength
        ) {
          super.mensagemTela(
            "ERROR",
            ["Número da carteira do paciente deve ter no mínimo de 5 caracteres !"]
          );
        } else if (
          this.fichaPacienteIncluirFormGroup.get("numeroCarteiraPlano").errors
            .maxlength
        ) {
          super.mensagemTela(
            "ERROR",
            ["Número da carteira do paciente deve ter no máximo de 255 caracteres !"]
          );
        }
      } else if (
        this.fichaPacienteIncluirFormGroup.get("planosDeSaude").errors != null
      ) {
        if (
          this.fichaPacienteIncluirFormGroup.get("planosDeSaude").errors
            .required
        ) {
          super.mensagemTela(
            "ERROR",
            ["Plano de saúde do paciente é obrigatório !"]
          );
        }
      } else if (
        this.fichaPacienteIncluirFormGroup.get("especialidades").errors != null
      ) {
        if (
          this.fichaPacienteIncluirFormGroup.get("especialidades").errors
            .required
        ) {
          super.mensagemTela(
            "ERROR",
            ["Especialidade do médico do paciente é obrigatório !"]
          );
        }
      } else if (
        this.fichaPacienteIncluirFormGroup.get("valor").errors != null
      ) {
        if (this.fichaPacienteIncluirFormGroup.get("valor").errors.required) {
          super.mensagemTela("ERROR", ["Valor da consulta é obarigatório !"]);
        }
      } else if (
        this.fichaPacienteIncluirFormGroup.get("data").errors != null
      ) {
        if (this.fichaPacienteIncluirFormGroup.get("data").errors.required) {
          super.mensagemTela("ERROR", ["Data da consulta é obrigatório !"]);
        }
      }
      return;
    }
    super.salvar(this.fichaPacienteIncluirFormGroup.value);
  }

  public limpar() {
    this.mostrarPesquisa = false;
    this.fichaPacienteIncluirFormGroup.reset();
  }

  private preencherEspecialidades() {
    this.epecialidadeService.buscarTodos().subscribe((data: any) => {
      data.lista.forEach((d: any) => {
        let esp = new EnumModel();
        esp.key = d.id;
        esp.texto = d.nome;
        this.especialidades.push(esp);
      });
    });
  }

  private preencherPlanosSaudes() {
    this.planoSaudeService.buscarTodos().subscribe((data: any[]) => {
      data.forEach((d: any) => {
        let ps = new EnumModel();
        ps.key = d.id;
        ps.texto = d.nome;
        this.planosSaudes.push(ps);
      });
    });
  }

  private preencherPacientes() {
    this.pacienteService.buscarTodos().subscribe((data: any) => {
      data.lista.forEach((d: any) => {
        let ps = new PacienteModel();
        ps.id = d.id;
        ps.nome = d.cpf + " - " + d.nome;
        this.pacientes.push(ps);
      });
    });
  }
}
