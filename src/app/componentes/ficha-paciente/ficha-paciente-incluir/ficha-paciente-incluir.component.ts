import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import { AlertService } from 'ngx-alerts';
import { MatDialog } from '@angular/material/dialog';
import { PrincipalComponente } from 'src/app/core/principal.componente';
import { FichaPacienteService } from '../service/ficha-paciente.service';
import { FichaPacienteModel } from '../model/ficha-paciente.model';

@Component({
  selector: 'app-ficha-paciente-incluir',
  templateUrl: './ficha-paciente-incluir.component.html',
  styleUrls: ['./ficha-paciente-incluir.component.css']
})
export class FichaPacienteIncluirComponent extends PrincipalComponente {

  public fichaPacienteIncluirFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    public service: FichaPacienteService,
    public alertService: AlertService,
    public dialog: MatDialog,
    public routaAtual: ActivatedRoute,
  ) {
    super(
      new FichaPacienteModel(),
      'Incluir ficha de paciente',
      'fichas-paciente',
      service,
      router,
      alertService,
      dialog,
      routaAtual
    );
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.criarFormGroup();
  }

  public criarFormGroup() {
    this.fichaPacienteIncluirFormGroup = this.formBuilder.group({
      nomePaciente: new FormControl({value: ''}, Validators.compose([
        Validators.maxLength(255),
        Validators.minLength(5),
        Validators.required
      ])),
      numeroCarteiraPlano: new FormControl({value: ''}, Validators.compose([
        Validators.maxLength(255),
        Validators.minLength(5),
        Validators.required
      ])),
      planoSaude: new FormControl({value: ''}, Validators.compose([
        Validators.required
      ])),
      especialidade: new FormControl({value: ''}, Validators.compose([
        Validators.required
      ]))
    });
  }

  public salvarForm() {
    if (this.fichaPacienteIncluirFormGroup.invalid) {
      if (this.fichaPacienteIncluirFormGroup.get('nomePaciente').errors != null) {
        if (this.fichaPacienteIncluirFormGroup.get('nomePaciente').errors.required) {
          super.mensagemTela('ERROR', 'Nome do paciente é obrigatório !');
        } else if (this.fichaPacienteIncluirFormGroup.get('nomePaciente').errors.minlength) {
          super.mensagemTela('ERROR', 'Nome do paciente deve ter no mínimo de 5 caracteres !');
        } else if (this.fichaPacienteIncluirFormGroup.get('nomePaciente').errors.maxlength) {
          super.mensagemTela('ERROR', 'Nome do paciente deve ter no máximo de 255 caracteres !');
        }
      } else if (this.fichaPacienteIncluirFormGroup.get('numeroCarteiraPlano').errors != null) {
        if (this.fichaPacienteIncluirFormGroup.get('numeroCarteiraPlano').errors.required) {
          super.mensagemTela('ERROR', 'Número da carteira do paciente é obrigatório !');
        } else if (this.fichaPacienteIncluirFormGroup.get('numeroCarteiraPlano').errors.minlength) {
          super.mensagemTela('ERROR', 'Número da carteira do paciente deve ter no mínimo de 5 caracteres !');
        } else if (this.fichaPacienteIncluirFormGroup.get('numeroCarteiraPlano').errors.maxlength) {
          super.mensagemTela('ERROR', 'Número da carteira do paciente deve ter no máximo de 255 caracteres !');
        }
      } else if (this.fichaPacienteIncluirFormGroup.get('planoSaude').errors != null) {
        if (this.fichaPacienteIncluirFormGroup.get('planoSaude').errors.required) {
          super.mensagemTela('ERROR', 'Plano de saúde do paciente é obrigatório !');
        }
      } else if (this.fichaPacienteIncluirFormGroup.get('especialidade').errors != null) {
        if (this.fichaPacienteIncluirFormGroup.get('especialidade').errors.required) {
          super.mensagemTela('ERROR', 'Especialidade do médico do paciente é obrigatório !');
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
}
