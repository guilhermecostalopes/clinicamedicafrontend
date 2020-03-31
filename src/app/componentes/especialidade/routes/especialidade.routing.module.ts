import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { EspecialidadePesquisaComponent } from "../view/especialidade-pesquisa/especialidade-pesquisa.component";
import { EspecialidadeIncluirComponent } from "../view/especialidade-incluir/especialidade-incluir.component";
import { EspecialidadeAlterarComponent } from "../view/especialidade-alterar/especialidade-alterar.component";

const moduleRoutes: Routes = [
  {
    path: "especialidades/pesquisar",
    component: EspecialidadePesquisaComponent
  },
  {
    path: "especialidades/incluir",
    component: EspecialidadeIncluirComponent
  },
  {
    path: "especialidades/:codigo/alterar",
    component: EspecialidadeAlterarComponent
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(moduleRoutes, {
      useHash: true,
      enableTracing: false
    })
  ],
  providers: [],
  declarations: []
})
export class EspecialidadeRoutingModule {}
