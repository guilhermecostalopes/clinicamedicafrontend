import { Component } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { PrincipalComponente } from "src/app/componentes/principal.componente";
import { TranslateService } from "@ngx-translate/core";
import { FichaPacienteService } from '../../service/ficha-paciente.service';
import { FichaPacienteModel } from '../../model/ficha-paciente.model';
import { SnackBarComponent } from 'src/app/core/snack-bar/snack-bar.component';

@Component({
  selector: "app-ficha-paciente-pesquisa",
  templateUrl: "./ficha-paciente-pesquisa.component.html",
  styleUrls: ["./ficha-paciente-pesquisa.component.scss"]
})
export class FichaPacientePesquisaComponent extends PrincipalComponente {
  public fichaSaudePesquisarFormGroup: FormGroup;

  displayedColumns: string[] = [
    "nomePaciente",
    "numeroCarteiraPlano",
    "planosDeSaude",
    "especialidades",
    "data",
    "valor"
  ];

  constructor(
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
    //super.pesquisar(true, this.fichaSaudePesquisarFormGroup);
  }

  public limpar() {
    this.mostrarPesquisa = false;
    this.fichaSaudePesquisarFormGroup.reset();
  }
}
