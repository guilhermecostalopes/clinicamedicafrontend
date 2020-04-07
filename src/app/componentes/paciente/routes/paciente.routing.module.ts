import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PacienteIncluirComponent } from '../view/paciente-incluir/paciente-incluir.component';
import { PacienteAlterarComponent } from '../view/paciente-alterar/paciente-alterar.component';
import { PacientePesquisarComponent } from '../view/paciente-pesquisar/paciente-pesquisar.component';
import { AuthGuardService } from 'src/app/security/authguard/auth-guard.service';

const moduleRoutes: Routes = [
  {
    path: "pacientes/pesquisar",
    //canActivate: [AuthGuardService],
    component: PacientePesquisarComponent
  },
  {
    path: "pacientes/incluir",
    //canActivate: [AuthGuardService],
    component: PacienteIncluirComponent
  },
  {
    path: "pacientes/:codigo/alterar",
    //canActivate: [AuthGuardService],
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
