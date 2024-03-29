import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxSpinnerModule } from "ngx-spinner";
import { ImageCropperModule } from 'ngx-image-cropper';

import { PessoaRoutingModule } from './pessoa.route';
import { PessoaService } from './services/pessoa.service';
import { PessoaResolve } from './services/pessoa.resolve';
import { PessoaGuard } from './services/pessoa.guard';
import { PessoaAppComponent } from './pessoa.app.component';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
import { EditarComponent } from './editar/editar.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { InputComponent } from "../components/input/input.component";
import { DividerComponent } from "../components/divider/divider.component";
import { ButtonComponent } from "../components/button/button.component";




@NgModule({
    declarations: [
        PessoaAppComponent,
        ListaComponent,
        NovoComponent,
        EditarComponent,
        ExcluirComponent,
        DetalhesComponent
    ],
    providers: [
        PessoaService,
        PessoaResolve,
        PessoaGuard
    ],
    imports: [
        CommonModule,
        PessoaRoutingModule,
        NgxSpinnerModule,
        FormsModule,
        ReactiveFormsModule,
        ImageCropperModule,
        InputComponent,
        DividerComponent,
        ButtonComponent
    ]
})
export class PessoaModule { }
