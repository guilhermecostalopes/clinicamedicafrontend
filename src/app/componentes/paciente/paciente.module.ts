import { NgModule } from "@angular/core";
import { ComumModule } from "src/app/core/comum.module";
import { PacienteService } from "./service/paciente.service";
import { PacienteRoutingModule } from "./routes/paciente.routing.module";
import { PacientePesquisarComponent } from './view/paciente-pesquisar/paciente-pesquisar.component';
import { PacienteIncluirComponent } from './view/paciente-incluir/paciente-incluir.component';
import { PacienteAlterarComponent } from './view/paciente-alterar/paciente-alterar.component';

@NgModule({
  declarations: [
    PacientePesquisarComponent,
    PacienteIncluirComponent,
    PacienteAlterarComponent
  ],
  imports: [ComumModule, PacienteRoutingModule],
  providers: [PacienteService]
})
export class PacienteModule {}
