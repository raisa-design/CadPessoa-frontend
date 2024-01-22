import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFoundComponent } from './navegacao/not-found/not-found.component';
import { AcessoNegadoComponent } from './navegacao/acesso-negado/acesso-negado.component';


const routes: Routes = [
  { path: '', redirectTo: '/conta/login', pathMatch: 'full' },
  {
    path: 'conta',
    loadChildren: () => import('./conta/conta.module')
      .then(m => m.ContaModule)
  },
  {
    path: 'pessoas',
    loadChildren: () => import('./pessoa/pessoa.module')
      .then(m => m.PessoaModule)
  },
  // {
  //   path: 'pessoa',
  //   loadChildren: () => import('./pessoa/pessoa.module')
  //     .then(m => m.PessoaModule)
  // },
  { path: 'acesso-negado', component: AcessoNegadoComponent },
  { path: 'nao-encontrado', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
