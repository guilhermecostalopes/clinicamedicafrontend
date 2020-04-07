import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UsuarioPesquisarComponent } from '../view/usuario-pesquisar/usuario-pesquisar.component';
import { UsuarioIncluirComponent } from '../view/usuario-incluir/usuario-incluir.component';
import { UsuarioAlterarComponent } from '../view/usuario-alterar/usuario-alterar.component';
import { AuthGuardService } from 'src/app/security/authguard/auth-guard.service';

const moduleRoutes: Routes = [
  {
    path: "usuarios/pesquisar",
    //canActivate: [AuthGuardService],
    component: UsuarioPesquisarComponent
  },
  {
    path: "usuarios/incluir",
    //canActivate: [AuthGuardService],
    component: UsuarioIncluirComponent
  },
  {
    path: "usuarios/:codigo/alterar",
    //canActivate: [AuthGuardService],
    component: UsuarioAlterarComponent
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
export class UsuarioRoutingModule {}
