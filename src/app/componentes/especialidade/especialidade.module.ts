import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EspecialidadeRoutingModule } from './routes/especialidade.routing.module';
import { EpecialidadeService } from './service/epecialidade.service';
import { EspecialidadeIncluirComponent } from './especialidade-incluir/especialidade-incluir.component';
import { EspecialidadeAlterarComponent } from './especialidade-alterar/especialidade-alterar.component';
import { EspecialidadePesquisaComponent } from './especialidade-pesquisa/especialidade-pesquisa.component';
import { ComumModule } from 'src/app/core/comum.module';

@NgModule({
  declarations: [
    EspecialidadeIncluirComponent,
    EspecialidadeAlterarComponent,
    EspecialidadePesquisaComponent
  ],
  imports: [
    CommonModule,
    ComumModule,
    EspecialidadeRoutingModule
  ],
  providers: [
    EpecialidadeService
  ]
})
export class EspecialidadeModule { }
