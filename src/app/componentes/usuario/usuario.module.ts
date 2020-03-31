import { NgModule } from "@angular/core";
import { ComumModule } from "src/app/core/comum.module";
import { UsuarioService } from "./service/usuario.service";
import { UsuarioRoutingModule } from "./routes/usuario.routing.module";
import { UsuarioAlterarComponent } from './view/usuario-alterar/usuario-alterar.component';
import { UsuarioIncluirComponent } from './view/usuario-incluir/usuario-incluir.component';
import { UsuarioPesquisarComponent } from './view/usuario-pesquisar/usuario-pesquisar.component';

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
