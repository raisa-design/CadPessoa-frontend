import { Component, OnInit } from '@angular/core';

import { environment } from 'src/environments/environment';
import { PessoaService } from '../services/pessoa.service';
import { Pessoa } from '../models/pessoa';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {

  imagens: string = environment.imagensUrl;

  public produtos: Pessoa[];
  errorMessage: string;

  constructor(private pessoaService: PessoaService) { }

  ngOnInit(): void {
    this.pessoaService.obterTodos()
      .subscribe(
        produtos => this.produtos = produtos,
        error => this.errorMessage);
  }
}
