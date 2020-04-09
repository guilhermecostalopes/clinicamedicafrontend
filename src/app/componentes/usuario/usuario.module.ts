import { NgModule } from "@angular/core";
import { ComumModule } from "src/app/core/comum.module";
import { UsuarioRoutingModule } from "./routes/usuario.routing.module";
import { UsuarioService } from "./service/usuario.service";
import { UsuarioAlterarComponent } from './view/usuario-alterar/usuario-alterar.component';
import { UsuarioIncluirComponent } from './view/usuario-incluir/usuario-incluir.component';
import { UsuarioPesquisaComponent } from './view/usuario-pesquisa/usuario-pesquisa.component';

@NgModule({
  declarations: [
    UsuarioAlterarComponent,
    UsuarioIncluirComponent,
    UsuarioPesquisaComponent
  ],
  imports: [ComumModule, UsuarioRoutingModule],
  providers: [UsuarioService]
})
export class UsuarioModule { }
