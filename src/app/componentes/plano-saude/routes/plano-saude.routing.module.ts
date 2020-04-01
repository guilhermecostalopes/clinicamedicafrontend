import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PlanoSaudePesquisaComponent } from '../view/plano-saude-pesquisa/plano-saude-pesquisa.component';
import { PlanoSaudeIncluirComponent } from '../view/plano-saude-incluir/plano-saude-incluir.component';
import { PlanoSaudeAlterarComponent } from '../view/plano-saude-alterar/plano-saude-alterar.component';
import { AuthGuardService } from 'src/app/security/authguard/auth-guard.service';

const moduleRoutes: Routes = [
  {
    path: "planos-saude/pesquisar",
    canActivate: [AuthGuardService],
    component: PlanoSaudePesquisaComponent
  },
  {
    path: "planos-saude/incluir",
    canActivate: [AuthGuardService],
    component: PlanoSaudeIncluirComponent
  },
  {
    path: "planos-saude/:codigo/alterar",
    canActivate: [AuthGuardService],
    component: PlanoSaudeAlterarComponent
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
export class PlanoSaudeRoutingModule {}
