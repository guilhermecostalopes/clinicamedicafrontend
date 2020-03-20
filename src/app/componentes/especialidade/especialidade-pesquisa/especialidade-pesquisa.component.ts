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
import { PrincipalComponente } from 'src/app/core/principal.componente';
import { EpecialidadeService } from '../service/epecialidade.service';
import { EspecialidadeModel } from '../model/especialidade.model';

@Component({
  selector: 'app-especialidade-pesquisa',
  templateUrl: './especialidade-pesquisa.component.html',
  styleUrls: ['./especialidade-pesquisa.component.css']
})
export class EspecialidadePesquisaComponent extends PrincipalComponente {

  public especialidadePesquisarFormGroup: FormGroup;

  displayedColumns: string[] = ['select', 'nome'];

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
      'Pesquisar especialidades',
      'especialidades',
      service,
      router,
      alertService,
      dialog,
      routaAtual
    );
  }

  ngOnInit() {
    super.ngOnInit();
    this.criarFormGroup();
  }

  criarFormGroup() {
    this.especialidadePesquisarFormGroup = this.formBuilder.group({
      nome: []
    });
  }

  public pesquisarBaseDados() {
    super.pesquisar(true);
  }

  public limpar() {
    this.mostrarPesquisa = false;
    this.especialidadePesquisarFormGroup.reset();
  }
}
