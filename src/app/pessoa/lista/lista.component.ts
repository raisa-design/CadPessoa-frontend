import { Component, OnInit } from '@angular/core';

import { environment } from 'src/environments/environment';
import { PessoaService } from '../services/pessoa.service';
import { Pessoa } from '../models/pessoa';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {

  public pessoas: Pessoa[];
  errorMessage: string;

  constructor(private pessoaService: PessoaService) { }

  ngOnInit() {
    this.getPessoas().then(() => {
      console.log(this.pessoas);
    });
  }

  async getPessoas(): Promise<void> {
    this.pessoas = await this.pessoaService.obterTodos().toPromise();
  }
}
