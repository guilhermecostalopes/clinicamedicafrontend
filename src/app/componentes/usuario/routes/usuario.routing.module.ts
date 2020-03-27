import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UsuarioPesquisarComponent } from "../usuario-pesquisar/usuario-pesquisar.component";
import { UsuarioIncluirComponent } from "../usuario-incluir/usuario-incluir.component";
import { UsuarioAlterarComponent } from "../usuario-alterar/usuario-alterar.component";

const moduleRoutes: Routes = [
  {
    path: "usuarios/pesquisar",
    component: UsuarioPesquisarComponent
  },
  {
    path: "usuarios/incluir",
    component: UsuarioIncluirComponent
  },
  {
    path: "usuarios/:codigo/alterar",
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
