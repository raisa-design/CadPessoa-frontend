import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MenuLoginComponent } from './menu-login/menu-login.component';
import { AcessoNegadoComponent } from './acesso-negado/acesso-negado.component';
import { InputComponent } from "../components/input/input.component";
import { DividerComponent } from "../components/divider/divider.component";
import { ButtonComponent } from "../components/button/button.component";

@NgModule({
    declarations: [
        MenuComponent,
        MenuLoginComponent,
        HomeComponent,
        FooterComponent,
        NotFoundComponent,
        AcessoNegadoComponent
    ],
    exports: [
        MenuComponent,
        MenuLoginComponent,
        HomeComponent,
        FooterComponent,
        NotFoundComponent,
        AcessoNegadoComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        NgbModule,
        InputComponent,
        DividerComponent,
        ButtonComponent
    ]
})
export class NavegacaoModule { }