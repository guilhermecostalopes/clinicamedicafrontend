import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ComumModule } from "src/app/core/comum.module";
import { LoginService } from "./service/login.service";
import { LoginRoutingModule } from "./routes/login.routing.module";
import { LoginComponent } from './view/login/login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, ComumModule, LoginRoutingModule],
  providers: [LoginService]
})
export class LoginModule {}
