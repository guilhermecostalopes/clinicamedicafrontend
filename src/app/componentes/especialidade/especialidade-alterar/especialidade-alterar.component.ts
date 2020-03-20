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
import { EpecialidadeService } from '../service/epecialidade.service';
import { EspecialidadeModel } from '../model/especialidade.model';

@Component({
  selector: 'app-especialidade-alterar',
  templateUrl: './especialidade-alterar.component.html',
  styleUrls: ['./especialidade-alterar.component.css']
})
export class EspecialidadeAlterarComponent extends PrincipalComponente {

  public especialidadeAlterarFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    public service: EpecialidadeService,
    public alertService: AlertService,
    public dialog: MatDialog,
    public routaAtual: ActivatedRoute,
  ) {
    super(
      new EspecialidadeModel(),
      'Alterar especialidade',
      'especialidades',
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
    this.especialidadeAlterarFormGroup = this.formBuilder.group({
      nome: new FormControl({value: ''}, Validators.compose([
        Validators.maxLength(255),
        Validators.minLength(5),
        Validators.required
      ]))
    });
  }

  public salvarForm() {
    if (this.especialidadeAlterarFormGroup.invalid) {
      if (this.especialidadeAlterarFormGroup.get('nome').errors != null) {
        if (this.especialidadeAlterarFormGroup.get('nome').errors.required) {
          super.mensagemTela('ERROR', 'Nome é obrigatório !');
        } else if (this.especialidadeAlterarFormGroup.get('nome').errors.minlength) {
          super.mensagemTela('ERROR', 'Nome deve ter no mínimo de 5 caracteres !');
        } else if (this.especialidadeAlterarFormGroup.get('nome').errors.maxlength) {
          super.mensagemTela('ERROR', 'Nome deve ter no máximo de 255 caracteres !');
        }
      }
      return;
    }
    super.salvar(this.especialidadeAlterarFormGroup.value);
  }

  public limpar() {
    this.mostrarPesquisa = false;
    this.especialidadeAlterarFormGroup.reset();
  }
}
