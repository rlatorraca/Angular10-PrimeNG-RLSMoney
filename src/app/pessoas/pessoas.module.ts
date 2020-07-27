import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { PessoasGridComponent } from './pessoas-grid/pessoas-grid.component';
import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';


// PrimeNG Modules
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {TooltipModule} from 'primeng/tooltip';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {TabViewModule} from 'primeng/tabview';
import {InputMaskModule} from 'primeng/inputmask';
import { SharedModule } from './../shared/shared.module';



@NgModule({
  declarations: [
    PessoaCadastroComponent,
    PessoasGridComponent,
    PessoasPesquisaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,

    ButtonModule,
    InputTextModule,
    TableModule,
    TooltipModule,
    InputTextareaModule,    
    TabViewModule,    
    InputMaskModule
    
  ],
  exports : [
    PessoaCadastroComponent,    
    PessoasPesquisaComponent
  ]
})
export class PessoasModule { }
