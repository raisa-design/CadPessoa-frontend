import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { PessoaService } from './pessoa.service';
import { Pessoa } from '../models/pessoa';



@Injectable()
export class PessoaResolve implements Resolve<Pessoa> {

    constructor(private pessoaService: PessoaService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.pessoaService.obterPorId(route.params['id']);
    }
}