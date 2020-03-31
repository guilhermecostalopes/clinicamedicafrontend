import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from '../view/login/login.component';

const moduleRoutes: Routes = [
  {
    path: "login",
    component: LoginComponent
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
