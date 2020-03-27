import { BrowserModule } from "@angular/platform-browser";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { EspecialidadeModule } from "./componentes/especialidade/especialidade.module";
import { FichaPacienteModule } from "./componentes/ficha-paciente/ficha-paciente.module";
import { PlanoSaudeModule } from "./componentes/plano-saude/plano-saude.module";
import { ComumModule } from "./core/comum.module";
import { MenuComponent } from "./componentes/menu/menu.component";
import { PlanoSaudeService } from "./componentes/plano-saude/service/plano-saude.service";
import { EpecialidadeService } from "./componentes/especialidade/service/epecialidade.service";
import { FichaPacienteService } from "./componentes/ficha-paciente/service/ficha-paciente.service";
import { LoginService } from "./security/service/login.service";
import { LoginModule } from "./security/login.module";
import { PacienteService } from "./componentes/paciente/service/paciente.service";
import { PacienteModule } from "./componentes/paciente/paciente.module";

@NgModule({
  declarations: [AppComponent, MenuComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ComumModule,
    EspecialidadeModule,
    FichaPacienteModule,
    PlanoSaudeModule,
    LoginModule,
    PacienteModule
  ],
  providers: [
    PlanoSaudeService,
    EpecialidadeService,
    FichaPacienteService,
    LoginService,
    PacienteService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {}
