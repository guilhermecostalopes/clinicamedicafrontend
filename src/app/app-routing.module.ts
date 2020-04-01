import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./componentes/dashboard/component/dashboard.component";
import { AuthGuardService } from "./security/authguard/auth-guard.service";

const routes: Routes = [
  {
    path: "",
    canActivate: [AuthGuardService],
    component: DashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
