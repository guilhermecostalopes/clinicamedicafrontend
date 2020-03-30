import { NgModule } from "@angular/core";
import { ComumModule } from "src/app/core/comum.module";
import { UsuarioService } from "./service/usuario.service";
import { UsuarioAlterarComponent } from "./usuario-alterar/usuario-alterar.component";
import { UsuarioIncluirComponent } from "./usuario-incluir/usuario-incluir.component";
import { UsuarioPesquisarComponent } from "./usuario-pesquisar/usuario-pesquisar.component";
import { UsuarioRoutingModule } from "./routes/usuario.routing.module";

@NgModule({
  declarations: [
    UsuarioAlterarComponent,
    UsuarioIncluirComponent,
    UsuarioPesquisarComponent
  ],
  imports: [ComumModule, UsuarioRoutingModule],
  providers: [UsuarioService]
})
export class UsuarioModule {}
