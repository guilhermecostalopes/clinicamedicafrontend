import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FichaPacienteRoutingModule } from "./routes/ficha-paciente.routing.module";
import { FichaPacienteService } from "./service/ficha-paciente.service";
import { FichaPacienteIncluirComponent } from "./ficha-paciente-incluir/ficha-paciente-incluir.component";
import { FichaPacienteAlterarComponent } from "./ficha-paciente-alterar/ficha-paciente-alterar.component";
import { FichaPacientePesquisaComponent } from "./ficha-paciente-pesquisa/ficha-paciente-pesquisa.component";
import { ComumModule } from "src/app/core/comum.module";

@NgModule({
  declarations: [
    FichaPacienteIncluirComponent,
    FichaPacienteAlterarComponent,
    FichaPacientePesquisaComponent
  ],
  imports: [CommonModule, ComumModule, FichaPacienteRoutingModule],
  providers: [FichaPacienteService]
})
export class FichaPacienteModule {}
