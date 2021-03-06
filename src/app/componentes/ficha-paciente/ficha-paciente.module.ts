import { NgModule } from "@angular/core";
import { FichaPacienteRoutingModule } from "./routes/ficha-paciente.routing.module";
import { FichaPacienteService } from "./service/ficha-paciente.service";
import { FichaPacienteIncluirComponent } from "./view/ficha-paciente-incluir/ficha-paciente-incluir.component";
import { FichaPacienteAlterarComponent } from "./view/ficha-paciente-alterar/ficha-paciente-alterar.component";
import { FichaPacientePesquisaComponent } from "./view/ficha-paciente-pesquisa/ficha-paciente-pesquisa.component";
import { ComumModule } from "src/app/core/comum.module";

@NgModule({
  declarations: [
    FichaPacienteIncluirComponent,
    FichaPacienteAlterarComponent,
    FichaPacientePesquisaComponent
  ],
  imports: [ComumModule, FichaPacienteRoutingModule],
  providers: [FichaPacienteService]
})
export class FichaPacienteModule {}
