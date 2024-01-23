import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { BaseService } from 'src/app/services/base.service';
import { Pessoa } from "../models/pessoa";


@Injectable()
export class PessoaService extends BaseService {

    constructor(private http: HttpClient) { super() }
    obterTodos(): Observable<Pessoa[]> {
        return this.http
            .get<Pessoa[]>(this.UrlServiceV1 + "pessoa-fisica", super.ObterAuthHeaderJson())
            .pipe(map(response => response['$values'] ));
    }

    obterPorId(id: string): Observable<Pessoa> {
        return this.http
            .get<Pessoa>(this.UrlServiceV1 + "pessoas/" + id, super.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    novoPessoa(pessoa: Pessoa): Observable<Pessoa> {
        return this.http
            .post(this.UrlServiceV1 + "pessoas", pessoa, super.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    atualizarPessoa(pessoa: Pessoa): Observable<Pessoa> {
        return this.http
            .put(this.UrlServiceV1 + "pessoas/" + pessoa.id, pessoa, super.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    excluirPessoa(id: string): Observable<Pessoa> {
        return this.http
            .delete(this.UrlServiceV1 + "pessoas/" + id, super.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }    
}
