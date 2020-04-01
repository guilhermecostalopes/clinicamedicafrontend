import { registerLocaleData } from "@angular/common";
import localePt from "@angular/common/locales/pt";
import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { DashboardModule } from "./componentes/dashboard/dashboard.module";
import { DashboardService } from "./componentes/dashboard/service/dashboard.service";
import { EspecialidadeModule } from "./componentes/especialidade/especialidade.module";
import { EpecialidadeService } from "./componentes/especialidade/service/epecialidade.service";
import { FichaPacienteModule } from "./componentes/ficha-paciente/ficha-paciente.module";
import { FichaPacienteService } from "./componentes/ficha-paciente/service/ficha-paciente.service";
import { MenuComponent } from "./componentes/menu/menu.component";
import { PacienteModule } from "./componentes/paciente/paciente.module";
import { PacienteService } from "./componentes/paciente/service/paciente.service";
import { PlanoSaudeModule } from "./componentes/plano-saude/plano-saude.module";
import { PlanoSaudeService } from "./componentes/plano-saude/service/plano-saude.service";
import { UsuarioService } from "./componentes/usuario/service/usuario.service";
import { UsuarioModule } from "./componentes/usuario/usuario.module";
import { ComumModule } from "./core/comum.module";
import { LoginModule } from "./security/login.module";
import { LoginService } from "./security/service/login.service";

registerLocaleData(localePt, "pt");
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
    PacienteModule,
    UsuarioModule,
    DashboardModule
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
    UsuarioService,
    DashboardService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {}
