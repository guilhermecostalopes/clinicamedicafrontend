import { NgModule } from "@angular/core";
import { PlanoSaudeRoutingModule } from "./routes/plano-saude.routing.module";
import { PlanoSaudeService } from "./service/plano-saude.service";
import { PlanoSaudeAlterarComponent } from "./plano-saude-alterar/plano-saude-alterar.component";
import { PlanoSaudeIncluirComponent } from "./plano-saude-incluir/plano-saude-incluir.component";
import { PlanoSaudePesquisaComponent } from "./plano-saude-pesquisa/plano-saude-pesquisa.component";
import { ComumModule } from "src/app/core/comum.module";

@NgModule({
  declarations: [
    PlanoSaudeAlterarComponent,
    PlanoSaudeIncluirComponent,
    PlanoSaudePesquisaComponent
  ],
  imports: [ComumModule, PlanoSaudeRoutingModule],
  providers: [PlanoSaudeService]
})
export class PlanoSaudeModule {}
