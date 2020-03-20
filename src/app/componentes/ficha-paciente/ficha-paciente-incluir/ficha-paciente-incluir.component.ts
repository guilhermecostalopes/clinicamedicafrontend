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
import { PlanoSaudeService } from '../../plano-saude/service/plano-saude.service';
import { EpecialidadeService } from '../../especialidade/service/epecialidade.service';
import { EnumModel } from 'src/app/core/model/enum.model';

@Component({
  selector: 'app-ficha-paciente-incluir',
  templateUrl: './ficha-paciente-incluir.component.html',
  styleUrls: ['./ficha-paciente-incluir.component.css']
})
export class FichaPacienteIncluirComponent extends PrincipalComponente {

  public fichaPacienteIncluirFormGroup: FormGroup;
  public especialidades: EnumModel[] = [];
  public planosSaudes: EnumModel[] = [];

  constructor(
    private planoSaudeService: PlanoSaudeService,
    private epecialidadeService: EpecialidadeService,
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
    this.preencherEspecialidades();
    this.preencherPlanosSaudes();
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
      planosDeSaude: new FormControl({value: ''}, Validators.compose([
        Validators.required
      ])),
      especialidades: new FormControl({value: ''}, Validators.compose([
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
      } else if (this.fichaPacienteIncluirFormGroup.get('planosDeSaude').errors != null) {
        if (this.fichaPacienteIncluirFormGroup.get('planosDeSaude').errors.required) {
          super.mensagemTela('ERROR', 'Plano de saúde do paciente é obrigatório !');
        }
      } else if (this.fichaPacienteIncluirFormGroup.get('especialidades').errors != null) {
        if (this.fichaPacienteIncluirFormGroup.get('especialidades').errors.required) {
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

  private preencherEspecialidades() {
    this.epecialidadeService.buscarTodos().subscribe(
      (data :any) => {
        data.forEach(
          d => {
            let esp   = new EnumModel();
            esp.key   = d.id;
            esp.texto = d.nome;
            this.especialidades.push(esp);
          }
        );
      }
    );
  }

  private preencherPlanosSaudes() {
    this.planoSaudeService.buscarTodos().subscribe(
      (data : any[]) => {
        data.forEach(
          d => {
            let ps   = new EnumModel();
            ps.key   = d.id;
            ps.texto = d.nome;
            this.planosSaudes.push(ps);
          }
        );
      }
    );
  }
}
