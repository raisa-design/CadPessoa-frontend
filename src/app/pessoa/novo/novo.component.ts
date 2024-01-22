import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable, fromEvent, merge } from 'rxjs';

import { ToastrService } from 'ngx-toastr';
import { ImageCroppedEvent, ImageTransform, Dimensions } from 'ngx-image-cropper';


import { CurrencyUtils } from 'src/app/utils/currency-utils';
import { PessoaBaseComponent } from '../produto-form.base.component';
import { PessoaService } from '../services/pessoa.service';


@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html'
})
export class NovoComponent extends PessoaBaseComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  imageChangedEvent: any = '';
  croppedImage: any = '';
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {};
  imageURL: string;
  imagemNome: string;

  constructor(private fb: FormBuilder,
    private pessoaService: PessoaService,
    private router: Router,
    private toastr: ToastrService) { super(); }

  ngOnInit(): void {


    this.pessoaForm = this.fb.group({
      fornecedorId: ['', [Validators.required]],
      nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
      descricao: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(1000)]],
      imagem: ['', [Validators.required]],
      valor: ['', [Validators.required]],
      ativo: [true]
    });
  }

  ngAfterViewInit(): void {
    super.configurarValidacaoFormulario(this.formInputElements);
  }

  adicionarPessoa() {
    if (this.pessoaForm.dirty && this.pessoaForm.valid) {
      this.pessoa = Object.assign({}, this.pessoa, this.pessoaForm.value);

      this.pessoa.imagemUpload = this.croppedImage.split(',')[1];
      this.pessoa.imagem = this.imagemNome;
      this.pessoa.valor = CurrencyUtils.StringParaDecimal(this.pessoa.valor);

      this.pessoaService.novoPessoa(this.pessoa)
        .subscribe({
          next: (sucesso: any) => { this.processarSucesso(sucesso) },
          error: (falha: any) => { this.processarFalha(falha) }
        });

      this.mudancasNaoSalvas = false;
    }
  }

  processarSucesso(response: any) {
    this.pessoaForm.reset();
    this.errors = [];

    let toast = this.toastr.success('Pessoa cadastrado com sucesso!', 'Sucesso!');
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

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.imagemNome = event.currentTarget.files[0].name;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded() {
    this.showCropper = true;
  }
  cropperReady(sourceImageDimensions: Dimensions) {
    console.log('Cropper ready', sourceImageDimensions);
  }
  loadImageFailed() {
    this.errors.push('O formato do arquivo ' + this.imagemNome + ' não é aceito.');
  }
}

