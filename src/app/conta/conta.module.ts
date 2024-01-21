import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { CadastroComponent } from './cadastro/cadastro.component';
import { LoginComponent } from './login/login.component';
import { ContaAppComponent } from './conta.app.component';

import { ContaRoutingModule } from './conta.route';
import { ContaService } from './services/conta.service';

import { NarikCustomValidatorsModule } from '@narik/custom-validators';
import { ContaGuard } from './services/conta.guard';
import { InputComponent } from "../components/input/input.component";
import { ButtonComponent } from "../components/button/button.component";

@NgModule({
    declarations: [
        ContaAppComponent,
        CadastroComponent,
        LoginComponent
    ],
    providers: [
        ContaService,
        ContaGuard
    ],
    imports: [
        CommonModule,
        RouterModule,
        ContaRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NarikCustomValidatorsModule,
        InputComponent,
        ButtonComponent
    ]
})
export class ContaModule { }
