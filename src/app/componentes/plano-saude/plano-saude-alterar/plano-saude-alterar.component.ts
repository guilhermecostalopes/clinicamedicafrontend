import { Component } from '@angular/core';
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
import { PrincipalComponente } from 'src/app/componentes/principal.componente';
import { PlanoSaudeService } from '../service/plano-saude.service';
import { PlanoSaudeModel } from '../model/plano-saude.model';

@Component({
  selector: 'app-plano-saude-alterar',
  templateUrl: './plano-saude-alterar.component.html',
  styleUrls: ['./plano-saude-alterar.component.css']
})
export class PlanoSaudeAlterarComponent extends PrincipalComponente {

  public planoSaudeAlterarFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    public service: PlanoSaudeService,
    public alertService: AlertService,
    public dialog: MatDialog,
    public routaAtual: ActivatedRoute,
  ) {
    super(
      new PlanoSaudeModel(),
      'Alterar plano de saúde',
      'planos-saude',
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
    this.planoSaudeAlterarFormGroup = this.formBuilder.group({
      id: new FormControl({value: ''}, Validators.compose([
        Validators.required
      ])),
      nome: new FormControl({value: ''}, Validators.compose([
        Validators.maxLength(255),
        Validators.minLength(5),
        Validators.required
      ]))
    });
  }

  public salvarForm() {
    if (this.planoSaudeAlterarFormGroup.invalid) {
      if (this.planoSaudeAlterarFormGroup.get('nome').errors != null) {
        if (this.planoSaudeAlterarFormGroup.get('nome').errors.required) {
          super.mensagemTela('ERROR', 'Nome do plano de saúde é obrigatório !');
        } else if (this.planoSaudeAlterarFormGroup.get('nome').errors.minlength) {
          super.mensagemTela('ERROR', 'Nome do plano de saúde deve ter no mínimo de 5 caracteres !');
        } else if (this.planoSaudeAlterarFormGroup.get('nome').errors.maxlength) {
          super.mensagemTela('ERROR', 'Nome do plano de saúde deve ter no máximo de 255 caracteres !');
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