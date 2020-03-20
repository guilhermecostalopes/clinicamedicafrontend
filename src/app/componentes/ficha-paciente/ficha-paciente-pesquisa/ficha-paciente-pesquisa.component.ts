import { Component } from '@angular/core';
import {
  FormGroup,
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
  selector: 'app-ficha-paciente-pesquisa',
  templateUrl: './ficha-paciente-pesquisa.component.html',
  styleUrls: ['./ficha-paciente-pesquisa.component.css']
})
export class FichaPacientePesquisaComponent extends PrincipalComponente {

  public fichaSaudePesquisarFormGroup: FormGroup;

  displayedColumns: string[] = ['select', 'nomePaciente', 'numeroCarteiraPlano', 'planosDeSaude', 'especialidades'];

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
      'Pesquisar fichas de paciente',
      'fichas-paciente',
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
    this.fichaSaudePesquisarFormGroup = this.formBuilder.group({
      nomePaciente: [],
      numeroCarteiraPlano: [],
      planosDeSaude: [],
      especialidades: []
    });
  }

  public pesquisarBaseDados() {
    super.pesquisar(true);
  }

  public limpar() {
    this.mostrarPesquisa = false;
    this.fichaSaudePesquisarFormGroup.reset();
  }
}
