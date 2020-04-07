import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { PrincipalComponente } from "src/app/componentes/principal.componente";
import { SnackBarComponent } from 'src/app/core/snack-bar/snack-bar.component';
import { EspecialidadeModel } from '../../model/especialidade.model';
import { EpecialidadeService } from '../../service/epecialidade.service';

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
    public translate: TranslateService,
    public snackBar: SnackBarComponent
  ) {
    super(
      new EspecialidadeModel(),
      "especialidades",
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
