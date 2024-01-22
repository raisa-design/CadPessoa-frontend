import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
import { EditarComponent } from './editar/editar.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { PessoaGuard } from './services/pessoa.guard';
import { PessoaResolve } from './services/pessoa.resolve';
import { PessoaAppComponent } from './pessoa.app.component';


const pessoaRouterConfig: Routes = [
    {
        path: '', component: PessoaAppComponent,
        children: [
            { path: 'listar-todos', component: ListaComponent },
            {
                path: 'adicionar-novo', component: NovoComponent,
                canActivate: [PessoaGuard],
            },
            {
                path: 'editar/:id', component: EditarComponent,
                canActivate: [PessoaGuard],
                data: [{ claim: { nome: 'Pessoa', valor: 'Atualizar' } }],
                resolve: {
                    pessoa: PessoaResolve
                }
            },
            {
                path: 'detalhes/:id', component: DetalhesComponent,
                resolve: {
                    pessoa: PessoaResolve
                }
            },
            {
                path: 'excluir/:id', component: ExcluirComponent,
                canActivate: [PessoaGuard],
                data: [{ claim: { nome: 'Pessoa', valor: 'Excluir' } }],
                resolve: {
                    pessoa: PessoaResolve
                }
            },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(pessoaRouterConfig)
    ],
    exports: [RouterModule]
})
export class PessoaRoutingModule { }