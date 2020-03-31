import { NgModule } from "@angular/core";
import { EspecialidadeRoutingModule } from "./routes/especialidade.routing.module";
import { EpecialidadeService } from "./service/epecialidade.service";
import { EspecialidadeIncluirComponent } from "./view/especialidade-incluir/especialidade-incluir.component";
import { EspecialidadeAlterarComponent } from "./view/especialidade-alterar/especialidade-alterar.component";
import { EspecialidadePesquisaComponent } from "./view/especialidade-pesquisa/especialidade-pesquisa.component";
import { ComumModule } from "src/app/core/comum.module";

@NgModule({
  declarations: [
    EspecialidadeIncluirComponent,
    EspecialidadeAlterarComponent,
    EspecialidadePesquisaComponent
  ],
  imports: [ComumModule, EspecialidadeRoutingModule],
  providers: [EpecialidadeService]
})
export class EspecialidadeModule {}
