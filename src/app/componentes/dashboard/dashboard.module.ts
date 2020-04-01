import { NgModule } from "@angular/core";
import { ComumModule } from "src/app/core/comum.module";
import { DashboardComponent } from "./component/dashboard.component";
import { DashboardRoutingModule } from "./dashboard.routing";

@NgModule({
  declarations: [DashboardComponent],
  imports: [ComumModule, DashboardRoutingModule],
  providers: []
})
export class DashboardModule {}
