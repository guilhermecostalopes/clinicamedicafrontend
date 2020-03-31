import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PacienteIncluirComponent } from '../view/paciente-incluir/paciente-incluir.component';
import { PacienteAlterarComponent } from '../view/paciente-alterar/paciente-alterar.component';
import { PacientePesquisarComponent } from '../view/paciente-pesquisar/paciente-pesquisar.component';

const moduleRoutes: Routes = [
  {
    path: "pacientes/pesquisar",
    component: PacientePesquisarComponent
  },
  {
    path: "pacientes/incluir",
    component: PacienteIncluirComponent
  },
  {
    path: "pacientes/:codigo/alterar",
    component: PacienteAlterarComponent
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
