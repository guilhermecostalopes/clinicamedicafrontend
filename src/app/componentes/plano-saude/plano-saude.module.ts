import { NgModule } from "@angular/core";
import { PlanoSaudeRoutingModule } from "./routes/plano-saude.routing.module";
import { PlanoSaudeService } from "./service/plano-saude.service";
import { ComumModule } from "src/app/core/comum.module";
import { PlanoSaudeAlterarComponent } from './view/plano-saude-alterar/plano-saude-alterar.component';
import { PlanoSaudeIncluirComponent } from './view/plano-saude-incluir/plano-saude-incluir.component';
import { PlanoSaudePesquisaComponent } from './view/plano-saude-pesquisa/plano-saude-pesquisa.component';

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
