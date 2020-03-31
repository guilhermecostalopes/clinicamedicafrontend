import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FichaPacientePesquisaComponent } from "../view/ficha-paciente-pesquisa/ficha-paciente-pesquisa.component";
import { FichaPacienteAlterarComponent } from "../view/ficha-paciente-alterar/ficha-paciente-alterar.component";
import { FichaPacienteIncluirComponent } from "../view/ficha-paciente-incluir/ficha-paciente-incluir.component";

const moduleRoutes: Routes = [
  {
    path: "fichas-paciente/pesquisar",
    component: FichaPacientePesquisaComponent
  },
  {
    path: "fichas-paciente/incluir",
    component: FichaPacienteIncluirComponent
  },
  {
    path: "fichas-paciente/:codigo/alterar",
    component: FichaPacienteAlterarComponent
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
export class FichaPacienteRoutingModule {}
