import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { HttpClientModule } from '@angular/common/http';



import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
//import { LancamentosModule } from './lancamentos/lancamentos.module';
//import { PessoasModule } from './pessoas/pessoas.module';
import { SegurancaModule } from './seguranca/seguranca.module';

import { AppRoutingModule } from './app-routing.module';

import { Routes, RouterModule } from '@angular/router';
import { LancamentosPesquisaComponent } from './lancamentos/lancamentos-pesquisa/lancamentos-pesquisa.component';
import { LancamentoCadastroComponent } from './lancamentos/lancamento-cadastro/lancamento-cadastro.component';
import { PessoasPesquisaComponent } from './pessoas/pessoas-pesquisa/pessoas-pesquisa.component';
import { PessoaCadastroComponent } from './pessoas/pessoa-cadastro/pessoa-cadastro.component';
import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';

// const routes : Routes = [
//   { path: '', redirectTo: 'lancamentos', pathMatch: 'full' },
//   { path: 'lancamentos', component: LancamentosPesquisaComponent },
//   { path: 'lancamentos/novo', component: LancamentoCadastroComponent },
//   { path: 'lancamentos/:codigo', component: LancamentoCadastroComponent },
//   { path: 'pessoas', component: PessoasPesquisaComponent },
//   { path: 'pessoas/novo', component: PessoaCadastroComponent },
//   { path: 'pagina-nao-encontrada', component : PaginaNaoEncontradaComponent},
//   { path: '**', component : PaginaNaoEncontradaComponent}
// ]

registerLocaleData(localePt); // Registra a aplicação como PT-BR
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    //LancamentosModule,
    //PessoasModule,
    CoreModule,    
    HttpClientModule,
    SegurancaModule,

    AppRoutingModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
