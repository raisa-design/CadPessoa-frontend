import { Pessoa} from './models/pessoa';
import { FormGroup } from '@angular/forms';
import { ElementRef } from '@angular/core';

import { FormBaseComponent } from '../base-components/form-base.component';

export abstract class PessoaBaseComponent extends FormBaseComponent {
    
    pessoa: Pessoa;
    errors: any[] = [];
    pessoaForm: FormGroup;

    constructor() {
        super();

        this.validationMessages = {
            fornecedorId: {
                required: 'Escolha um fornecedor',
            },
            nome: {
                required: 'Informe o Nome',
                minlength: 'Mínimo de 2 caracteres',
                maxlength: 'Máximo de 200 caracteres'
            },
            descricao: {
                required: 'Informe a Descrição',
                minlength: 'Mínimo de 2 caracteres',
                maxlength: 'Máximo de 1000 caracteres'
            },
            imagem: {
                required: 'Informe a Imagem',
            },
            valor: {
                required: 'Informe o Valor',
            }
        }

        super.configurarMensagensValidacaoBase(this.validationMessages);
    }

    protected configurarValidacaoFormulario(formInputElements: ElementRef[]) {
        super.configurarValidacaoFormularioBase(formInputElements, this.pessoaForm);
    }
}