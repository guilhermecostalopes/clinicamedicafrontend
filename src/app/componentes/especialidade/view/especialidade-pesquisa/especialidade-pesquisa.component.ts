import { Component } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { PrincipalComponente } from "src/app/componentes/principal.componente";
import { TranslateService } from "@ngx-translate/core";
import { EpecialidadeService } from '../../service/epecialidade.service';
import { EspecialidadeModel } from '../../model/especialidade.model';

@Component({
  selector: "app-especialidade-pesquisa",
  templateUrl: "./especialidade-pesquisa.component.html",
  styleUrls: ["./especialidade-pesquisa.component.scss"]
})
export class EspecialidadePesquisaComponent extends PrincipalComponente {
  //@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  //@ViewChild(MatSort, {static: true}) sort: MatSort;
  public especialidadePesquisarFormGroup: FormGroup;

  displayedColumns: string[] = ["select", "nome"];

  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    public service: EpecialidadeService,
    public dialog: MatDialog,
    public routaAtual: ActivatedRoute,
    public translate: TranslateService
  ) {
    super(
      new EspecialidadeModel(),
      "especialidades",
      service,
      router,
      dialog,
      routaAtual,
      translate
    );
  }

  ngOnInit() {
    super.ngOnInit();
    this.criarFormGroup();
    //this.entidadePesquisa.paginator = this.paginator;
    //this.entidadePesquisa.sort = this.sort;
  }

  criarFormGroup() {
    this.especialidadePesquisarFormGroup = this.formBuilder.group({
      nome: []
    });
  }

  public pesquisarBaseDados() {
    super.pesquisar(true, this.especialidadePesquisarFormGroup);
  }

  public limpar() {
    this.mostrarPesquisa = false;
    this.especialidadePesquisarFormGroup.reset();
  }
}
