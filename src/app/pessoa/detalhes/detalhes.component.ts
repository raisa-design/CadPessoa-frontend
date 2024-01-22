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

    this.pessoa = this.route.snapshot.data['pessoa'];
  }

}
