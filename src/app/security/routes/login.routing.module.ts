import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from '../view/login/login.component';
import { EsqueceuSenhaComponent } from '../view/esqueceu-senha/esqueceu-senha.component';
import { NovoUsarioComponent } from '../view/novo-usario/novo-usario.component';

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
