import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { EspecialidadePesquisaComponent } from "../../especialidade/especialidade-pesquisa/especialidade-pesquisa.component";
import { EspecialidadeIncluirComponent } from "../../especialidade/especialidade-incluir/especialidade-incluir.component";
import { EspecialidadeAlterarComponent } from "../../especialidade/especialidade-alterar/especialidade-alterar.component";

const moduleRoutes: Routes = [
  {
    path: "pacientes/pesquisar",
    component: EspecialidadePesquisaComponent
  },
  {
    path: "pacientes/incluir",
    component: EspecialidadeIncluirComponent
  },
  {
    path: "pacientes/:codigo/alterar",
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
export class PacienteRoutingModule {}
