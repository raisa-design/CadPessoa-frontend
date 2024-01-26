import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable, fromEvent, merge } from 'rxjs';

import { ToastrService } from 'ngx-toastr';
import { ImageCroppedEvent, ImageTransform, Dimensions } from 'ngx-image-cropper';


import { CurrencyUtils } from 'src/app/utils/currency-utils';
import { PessoaBaseComponent } from '../produto-form.base.component';
import { PessoaService } from '../services/pessoa.service';
import { InputOption } from 'src/app/types/InputOption';
import { ButtonVariant } from 'src/app/types/ButtonVariant';
import { getBrazilUF } from 'src/app/utils/UF';
import { Address } from 'src/app/types/Adress';
import { Contact } from 'src/app/types/Contact';
import { Contato, Endereco } from '../models/pessoa';


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

  //address fields
  street: string = '';
  houseNumber: string = '';
  cep: string = '';
  complement: string = '';
  city: string = '';
  state: string = '';

  //contact fields
  contactName: string = '';
  contactType: string = '';
  contact: string = '';

  constructor(private fb: FormBuilder,
    private pessoaService: PessoaService,
    private router: Router,
    private toastr: ToastrService) { super(); }

  ngOnInit(): void {


    this.pessoaForm = this.fb.group({
      nome: ['', [Validators.required]],
      sobreNome: ['', [Validators.required]],
      dataNascimento: ['', [Validators.required]],
      email: ['', [Validators.required]],
      cpf: ['', [Validators.required]],
      rg: ['', [Validators.required]]
    });
  }

  ngAfterViewInit(): void {
    super.configurarValidacaoFormulario(this.formInputElements);
  }

  adicionarPessoa() {
    if (this.pessoaForm.dirty && this.pessoaForm.valid) {
      this.pessoa = Object.assign({}, this.pessoa, this.pessoaForm.value);

      // this.pessoa.imagemUpload = this.croppedImage.split(',')[1];
      // this.pessoa.imagem = this.imagemNome;
      // this.pessoa.valor = CurrencyUtils.StringParaDecimal(this.pessoa.valor);

      this.pessoaService.novoPessoa({...this.pessoa, enderecos: this.addressList, contatos: this.contactList})
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

  
  stateList: InputOption[] = getBrazilUF()
  contactTypes: InputOption[] = [{label: 'Email', value: 'email'}, {label: 'Telefone', value: 'phone'}]
  dangerVariant: ButtonVariant = ButtonVariant.danger

  addressList: Endereco[] = [{id: '0'} as Endereco]

  contactList: Contato[] = [{ id: '0', tipoContato: 'email'} as Contato]

  addAddress(){
    this.addressList.push({
      id:  Math.floor(Math.random() * 999).toString(),
    } as Endereco);
  }

  saveAddress(addressId: string){
    this.addressList = this.addressList.map(item => {
      const itemAux = item;
      if(item.id === addressId){
        itemAux.cep = itemAux.cep;
        itemAux.cidade = this.city;
        itemAux.complemento = this.complement;
        itemAux.estado = this.state;
        itemAux.logradouro = this.street;
      }
      return itemAux;
    })
  }

  removeAddress(removeId: string){
    this.addressList = this.addressList.filter((item) => item.id !== removeId);
  }

  addContact(){
    this.contactList.push({
      id:  Math.floor(Math.random() * 999).toString(),
      tipoContato: 'email'
    } as Contato);
  }

  saveContact(contactId: string){
   this.contactList = this.contactList.map(item => {
      const itemAux = item;
      if(item.id === contactId){
        itemAux.nome = this.contactName;
        itemAux.telefoneOuEmail = this.contactType;
        itemAux.tipoContato = this.contact;
      }
      return itemAux;
    })
  }

  removeContact(removeId: string){
    this.contactList = this.contactList.filter((item) => item.id !== removeId);
  }
}

