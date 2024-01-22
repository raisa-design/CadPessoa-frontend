import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { environment } from 'src/environments/environment';
import { Pessoa } from '../models/pessoa';
import { PessoaService } from '../services/pessoa.service';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluir.component.html'
})
export class ExcluirComponent  {

  imagens: string = environment.imagensUrl;
  pessoa: Pessoa;

  constructor(private pessoaService: PessoaService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService) {

    this.pessoa = this.route.snapshot.data['pessoa'];
  }

  public excluirPessoa() {
    this.pessoaService.excluirPessoa(this.pessoa.id)
      .subscribe(
      evento => { this.sucessoExclusao(evento) },
      ()     => { this.falha() }
      );
  }

  public sucessoExclusao(evento: any) {

    const toast = this.toastr.success('Pessoa excluido com Sucesso!', 'Good bye :D');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/pessoas/listar-todos']);
      });
    }
  }

  public falha() {
    this.toastr.error('Houve um erro no processamento!', 'Ops! :(');
  }
}

