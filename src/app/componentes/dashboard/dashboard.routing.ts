import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./component/dashboard.component";
import { AuthGuardService } from 'src/app/security/authguard/auth-guard.service';

const moduleRoutes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuardService]
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
export class DashboardRoutingModule {}
