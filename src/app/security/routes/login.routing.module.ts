import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AlterarSenhaComponent } from "../view/alterar-senha/alterar-senha.component";
import { EsqueceuSenhaComponent } from "../view/esqueceu-senha/esqueceu-senha.component";
import { LoginComponent } from "../view/login/login.component";
import { NovoUsarioComponent } from "../view/novo-usario/novo-usario.component";

const moduleRoutes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "esqueceu-senha",
    component: EsqueceuSenhaComponent
  },
  {
    path: "novo-usario",
    component: NovoUsarioComponent
  },
  {
    path: "alterar-senha",
    component: AlterarSenhaComponent
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
export class LoginRoutingModule {}
