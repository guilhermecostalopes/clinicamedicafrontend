import { NgModule } from '@angular/core';
import { 
    Routes,
    RouterModule
} from '@angular/router';
import { PlanoSaudePesquisaComponent } from '../plano-saude-pesquisa/plano-saude-pesquisa.component';
import { PlanoSaudeIncluirComponent } from '../plano-saude-incluir/plano-saude-incluir.component';
import { PlanoSaudeAlterarComponent } from '../plano-saude-alterar/plano-saude-alterar.component';

const moduleRoutes: Routes = [
    {
        path: 'planos-saude/pesquisar',
        component: PlanoSaudePesquisaComponent
    },
    {
        path: 'planos-saude/incluir',
        component: PlanoSaudeIncluirComponent
    },
    {
        path: 'planos-saude/:codigo/alterar',
        component: PlanoSaudeAlterarComponent
    }
];

@NgModule({
    exports: [
        RouterModule
    ],
    imports: [
        RouterModule.forRoot(moduleRoutes,
            {
                useHash: true,
                enableTracing: false
            }
        )
    ],
    providers: [],
    declarations: []
})
export class PlanoSaudeRoutingModule {}