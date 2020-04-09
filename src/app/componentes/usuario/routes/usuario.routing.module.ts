import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UsuarioAlterarComponent } from '../view/usuario-alterar/usuario-alterar.component';
import { UsuarioIncluirComponent } from '../view/usuario-incluir/usuario-incluir.component';
import { UsuarioPesquisaComponent } from '../view/usuario-pesquisa/usuario-pesquisa.component';

const moduleRoutes: Routes = [
  {
    path: "usuarios/pesquisar",
    //canActivate: [AuthGuardService],
    component: UsuarioPesquisaComponent
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
  imports: [RouterModule.forRoot(moduleRoutes)],
  providers: [],
  declarations: []
})
export class UsuarioRoutingModule { }
