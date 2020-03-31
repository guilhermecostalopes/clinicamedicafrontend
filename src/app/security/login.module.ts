import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ComumModule } from "src/app/core/comum.module";
import { LoginService } from "./service/login.service";
import { LoginRoutingModule } from "./routes/login.routing.module";
import { LoginComponent } from './view/login/login.component';
import { EsqueceuSenhaComponent } from './view/esqueceu-senha/esqueceu-senha.component';
import { NovoUsarioComponent } from './view/novo-usario/novo-usario.component';

@NgModule({
  declarations: [LoginComponent, EsqueceuSenhaComponent, NovoUsarioComponent],
  imports: [CommonModule, ComumModule, LoginRoutingModule],
  providers: [LoginService]
})
export class LoginModule {}
