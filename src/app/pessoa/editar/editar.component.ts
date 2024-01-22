import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ToastrService } from 'ngx-toastr';


import { environment } from 'src/environments/environment';
import { CurrencyUtils } from 'src/app/utils/currency-utils';
import { PessoaBaseComponent } from '../produto-form.base.component';
import { PessoaService } from '../services/pessoa.service';


@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html'
})
export class EditarComponent extends PessoaBaseComponent implements OnInit {

  imagens: string = environment.imagensUrl;

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  imageBase64: any;
  imagemPreview: any;
  imagemNome: string;
  imagemOriginalSrc: string;

  constructor(private fb: FormBuilder,
    private pessoaService: PessoaService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService) {

    super();
    this.pessoa = this.route.snapshot.data['pessoa'];
  }

  ngOnInit(): void {

    this.pessoaForm = this.fb.group({
      fornecedorId: ['', [Validators.required]],
      nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
      descricao: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(1000)]],
      imagem: [''],
      valor: ['', [Validators.required]],
      ativo: [0]
    });

    this.pessoaForm.patchValue({
      id: this.pessoa.id,
      nome: this.pessoa.nome,
      descricao: this.pessoa.descricao,
      ativo: this.pessoa.ativo,
      valor: CurrencyUtils.DecimalParaString(this.pessoa.valor)
    });

    // utilizar o [src] na imagem para evitar que se perca após post
    this.imagemOriginalSrc = this.imagens + this.pessoa.imagem;
  }

  ngAfterViewInit(): void {
    super.configurarValidacaoFormulario(this.formInputElements);
  }

  editarPessoa() {
    if (this.pessoaForm.dirty && this.pessoaForm.valid) {
      this.pessoa = Object.assign({}, this.pessoa, this.pessoaForm.value);

      if (this.imageBase64) {
        this.pessoa.imagemUpload = this.imageBase64;
        this.pessoa.imagem = this.imagemNome;
      }

      this.pessoa.valor = CurrencyUtils.StringParaDecimal(this.pessoa.valor);

      this.pessoaService.atualizarPessoa(this.pessoa)
        .subscribe(
          sucesso => { this.processarSucesso(sucesso) },
          falha => { this.processarFalha(falha) }
        );

      this.mudancasNaoSalvas = false;
    }
  }

  processarSucesso(response: any) {
    this.pessoaForm.reset();
    this.errors = [];

    let toast = this.toastr.success('Pessoa editado com sucesso!', 'Sucesso!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/pessoas/listar-todos']);
      });
    }
  }

  processarFalha(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }

  upload(file: any) {
    this.imagemNome = file[0].name;

    var reader = new FileReader();
    reader.onload = this.manipularReader.bind(this);
    reader.readAsBinaryString(file[0]);
  }

  manipularReader(readerEvt: any) {
    var binaryString = readerEvt.target.result;
    this.imageBase64 = btoa(binaryString);
    this.imagemPreview = "data:image/jpeg;base64," + this.imageBase64;
  }
}

