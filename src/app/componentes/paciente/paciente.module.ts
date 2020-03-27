import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ComumModule } from "src/app/core/comum.module";
import { PacientePesquisarComponent } from "./paciente-pesquisar/paciente-pesquisar.component";
import { PacienteIncluirComponent } from "./paciente-incluir/paciente-incluir.component";
import { PacienteAlterarComponent } from "./paciente-alterar/paciente-alterar.component";
import { PacienteService } from "./service/paciente.service";
import { PacienteRoutingModule } from "./routes/paciente.routing.module";

@NgModule({
  declarations: [
    PacientePesquisarComponent,
    PacienteIncluirComponent,
    PacienteAlterarComponent
  ],
  imports: [CommonModule, ComumModule, PacienteRoutingModule],
  providers: [PacienteService]
})
export class PacienteModule {}
