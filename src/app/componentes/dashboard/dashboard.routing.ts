import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./component/dashboard.component";
import { AuthGuardService } from 'src/app/security/authguard/auth-guard.service';

const DashboardRoutes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(DashboardRoutes)],
  providers: [],
  declarations: []
})
export class DashboardRoutingModule {}
