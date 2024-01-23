import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Pessoa } from '../models/pessoa';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent {

  imagens: string = environment.imagensUrl;
  pessoa: Pessoa;

  constructor(private route: ActivatedRoute) {

    var p = this.route.snapshot.data['pessoa'];
    if (p.contatos && Array.isArray(p.contatos) && p.contatos.length > 1) {
        p.contatos = p.contatos[1];
    }
    if (p.enderecos && Array.isArray(p.enderecos) && p.enderecos.length > 1) {
        p.enderecos = p.enderecos[1];
    }
  this.pessoa = p;
  console.log('Endereços:', this.pessoa.enderecos);
  console.log('Contatos:', this.pessoa.contatos);
    
   
  }
  

}
