import { NgModule } from "@angular/core";
import { ComumModule } from "src/app/core/comum.module";
import { LoginRoutingModule } from "./routes/login.routing.module";
import { LoginService } from "./service/login.service";
import { AlterarSenhaComponent } from "./view/alterar-senha/alterar-senha.component";
import { EsqueceuSenhaComponent } from "./view/esqueceu-senha/esqueceu-senha.component";
import { LoginComponent } from "./view/login/login.component";
import { NovoUsarioComponent } from "./view/novo-usario/novo-usario.component";

@NgModule({
  declarations: [
    LoginComponent,
    EsqueceuSenhaComponent,
    NovoUsarioComponent,
    AlterarSenhaComponent,
    AlterarSenhaComponent
  ],
  imports: [ComumModule, LoginRoutingModule],
  providers: [LoginService]
})
export class LoginModule {}
