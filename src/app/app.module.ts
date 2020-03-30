import { BrowserModule } from "@angular/platform-browser";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { EspecialidadeModule } from "./componentes/especialidade/especialidade.module";
import { FichaPacienteModule } from "./componentes/ficha-paciente/ficha-paciente.module";
import { PlanoSaudeModule } from "./componentes/plano-saude/plano-saude.module";
import { ComumModule } from "./core/comum.module";
import { PlanoSaudeService } from "./componentes/plano-saude/service/plano-saude.service";
import { EpecialidadeService } from "./componentes/especialidade/service/epecialidade.service";
import { FichaPacienteService } from "./componentes/ficha-paciente/service/ficha-paciente.service";
import { LoginService } from "./security/service/login.service";
import { LoginModule } from "./security/login.module";
import { PacienteService } from "./componentes/paciente/service/paciente.service";
import { PacienteModule } from "./componentes/paciente/paciente.module";
import { UsuarioService } from "./componentes/usuario/service/usuario.service";
import { UsuarioModule } from "./componentes/usuario/usuario.module";
import { LOCALE_ID } from "@angular/core";
import { registerLocaleData } from "@angular/common";
import localePt from "@angular/common/locales/pt";
import { MenuComponent } from "./componentes/menu/menu.component";
import { DashboardComponent } from "./componentes/dashboard/dashboard.component";
registerLocaleData(localePt, "pt");
@NgModule({
  declarations: [AppComponent, MenuComponent, DashboardComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ComumModule,
    EspecialidadeModule,
    FichaPacienteModule,
    PlanoSaudeModule,
    LoginModule,
    PacienteModule,
    UsuarioModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: "pt"
    },
    PlanoSaudeService,
    EpecialidadeService,
    FichaPacienteService,
    LoginService,
    PacienteService,
    UsuarioService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {}
