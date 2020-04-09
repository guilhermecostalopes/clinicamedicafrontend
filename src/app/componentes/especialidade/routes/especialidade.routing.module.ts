import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EspecialidadeAlterarComponent } from "../view/especialidade-alterar/especialidade-alterar.component";
import { EspecialidadeIncluirComponent } from "../view/especialidade-incluir/especialidade-incluir.component";
import { EspecialidadePesquisaComponent } from "../view/especialidade-pesquisa/especialidade-pesquisa.component";

const moduleRoutes: Routes = [
  {
    path: "especialidades/pesquisar",
    //canActivate: [AuthGuardService],
    component: EspecialidadePesquisaComponent
  },
  {
    path: "especialidades/incluir",
    //canActivate: [AuthGuardService],
    component: EspecialidadeIncluirComponent
  },
  {
    path: "especialidades/:codigo/alterar",
    //canActivate: [AuthGuardService],
    component: EspecialidadeAlterarComponent
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forChild(moduleRoutes)
  ],
  providers: [],
  declarations: []
})
export class EspecialidadeRoutingModule { }
