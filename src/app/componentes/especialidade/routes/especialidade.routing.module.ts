import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { EspecialidadePesquisaComponent } from "../view/especialidade-pesquisa/especialidade-pesquisa.component";
import { EspecialidadeIncluirComponent } from "../view/especialidade-incluir/especialidade-incluir.component";
import { EspecialidadeAlterarComponent } from "../view/especialidade-alterar/especialidade-alterar.component";
import { AuthGuardService } from 'src/app/security/authguard/auth-guard.service';

const moduleRoutes: Routes = [
  {
    path: "especialidades/pesquisar",
    canActivate: [AuthGuardService],
    component: EspecialidadePesquisaComponent
  },
  {
    path: "especialidades/incluir",
    canActivate: [AuthGuardService],
    component: EspecialidadeIncluirComponent
  },
  {
    path: "especialidades/:codigo/alterar",
    canActivate: [AuthGuardService],
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
