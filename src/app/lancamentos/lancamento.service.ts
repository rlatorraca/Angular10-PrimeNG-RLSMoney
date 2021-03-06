import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import * as moment from 'moment'

import { Lancamento } from './../core/model';
import { environment } from 'src/environments/environment';



export class LancamentoFilter {
    descricao : string;
    dataVencimentoInicio : Date;
    dataVencimentoFim : Date ;
    pagina = 0;
    itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentosURL : string;

  constructor(private http:HttpClient) {
    this.lancamentosURL = `${environment.apiURL}/lancamentos`;
  }

  //usado para pegar a URL par onde sera enviado o ARQUIVO de FileUpload
  urlUploadAnexo() : string {
    return `${this.lancamentosURL}/anexo`;
  }

  pesquisar(filtro : LancamentoFilter): Promise<any> {

    let params = new HttpParams(); // parâmetros de pesquisa da URL
    // const headers = new HttpHeaders().append('Authorization',
    // 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbkBybHNwbW9uZXkuY29tIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sIm5vbWUiOiJBZG1pbmlzdHJhZG9yIiwiZXhwIjoxNTk4NjI2NjgzLCJhdXRob3JpdGllcyI6WyJST0xFX0NBREFTVFJBUl9DQVRFR09SSUEiLCJST0xFX1BFU1FVSVNBUl9QRVNTT0EiLCJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUEVTUVVJU0FSX0xBTkNBTUVOVE8iLCJST0xFX1JFTU9WRVJfTEFOQ0FNRU5UTyIsIlJPTEVfQ0FEQVNUUkFSX1BFU1NPQSIsIlJPTEVfUEVTUVVJU0FSX0NBVEVHT1JJQSJdLCJqdGkiOiIyMjYyMGY0Zi00MWZkLTRjODItODUyMS02NTdiNmIwODI0ODYiLCJjbGllbnRfaWQiOiJhbmd1bGFyIn0.t-bN3Rbfk_bFsChzjuT5hJb2ZWxdz1YqhZkKIS4tlzs');


    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString())

    if (typeof filtro.descricao !== 'undefined' && filtro.descricao.length > 0) {
      params = params.set('descricao', filtro.descricao);// atribui filtro.descricao para dentro de 'descricao'
      }

    if (filtro.dataVencimentoInicio) {
        params = params.set('dataVencimentoDe', moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD'));
    }

    if (filtro.dataVencimentoFim) {
        params = params.set('dataVencimentoAte', moment(filtro.dataVencimentoFim).format('YYYY-MM-DD'));
    }

    //return this.http.get(`${this.lancamentosURL}?resumo`, { headers, params })
    return this.http.get(`${this.lancamentosURL}?resumo`, { params })
        .toPromise()
        .then(response => {
          const lancamentos = response['content'];
          const resultado = {
            lancamentos,
            total: response['totalElements']
          }
          return resultado;
        })

  }


  excluir(codigo: number): Promise<void> {
    // const headers = new HttpHeaders().append('Authorization',
    // 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbkBybHNwbW9uZXkuY29tIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sIm5vbWUiOiJBZG1pbmlzdHJhZG9yIiwiZXhwIjoxNTk4NjI2NjgzLCJhdXRob3JpdGllcyI6WyJST0xFX0NBREFTVFJBUl9DQVRFR09SSUEiLCJST0xFX1BFU1FVSVNBUl9QRVNTT0EiLCJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUEVTUVVJU0FSX0xBTkNBTUVOVE8iLCJST0xFX1JFTU9WRVJfTEFOQ0FNRU5UTyIsIlJPTEVfQ0FEQVNUUkFSX1BFU1NPQSIsIlJPTEVfUEVTUVVJU0FSX0NBVEVHT1JJQSJdLCJqdGkiOiIyMjYyMGY0Zi00MWZkLTRjODItODUyMS02NTdiNmIwODI0ODYiLCJjbGllbnRfaWQiOiJhbmd1bGFyIn0.t-bN3Rbfk_bFsChzjuT5hJb2ZWxdz1YqhZkKIS4tlzs');


    //return this.http.delete(`${this.lancamentosURL}/${codigo}`, { headers })
    return this.http.delete(`${this.lancamentosURL}/${codigo}`)
      .toPromise()
      .then(() => null);
  }


  adicionar(lancamento: Lancamento): Promise<Lancamento> {

    // const headers = new HttpHeaders()
    // .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbkBybHNwbW9uZXkuY29tIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sIm5vbWUiOiJBZG1pbmlzdHJhZG9yIiwiZXhwIjoxNTk4NjI2NjgzLCJhdXRob3JpdGllcyI6WyJST0xFX0NBREFTVFJBUl9DQVRFR09SSUEiLCJST0xFX1BFU1FVSVNBUl9QRVNTT0EiLCJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUEVTUVVJU0FSX0xBTkNBTUVOVE8iLCJST0xFX1JFTU9WRVJfTEFOQ0FNRU5UTyIsIlJPTEVfQ0FEQVNUUkFSX1BFU1NPQSIsIlJPTEVfUEVTUVVJU0FSX0NBVEVHT1JJQSJdLCJqdGkiOiIyMjYyMGY0Zi00MWZkLTRjODItODUyMS02NTdiNmIwODI0ODYiLCJjbGllbnRfaWQiOiJhbmd1bGFyIn0.t-bN3Rbfk_bFsChzjuT5hJb2ZWxdz1YqhZkKIS4tlzs')
    // .set('Content-Type', 'application/json');

    //return this.http.post<Lancamento>(this.lancamentosURL, Lancamento.toJson(lancamento), {headers})
    return this.http.post<Lancamento>(this.lancamentosURL, Lancamento.toJson(lancamento))
      .toPromise();
  }

  atualizar(lancamento: Lancamento): Promise<Lancamento> {
    // const headers = new HttpHeaders()
    // .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbkBybHNwbW9uZXkuY29tIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sIm5vbWUiOiJBZG1pbmlzdHJhZG9yIiwiZXhwIjoxNTk4NjI2NjgzLCJhdXRob3JpdGllcyI6WyJST0xFX0NBREFTVFJBUl9DQVRFR09SSUEiLCJST0xFX1BFU1FVSVNBUl9QRVNTT0EiLCJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUEVTUVVJU0FSX0xBTkNBTUVOVE8iLCJST0xFX1JFTU9WRVJfTEFOQ0FNRU5UTyIsIlJPTEVfQ0FEQVNUUkFSX1BFU1NPQSIsIlJPTEVfUEVTUVVJU0FSX0NBVEVHT1JJQSJdLCJqdGkiOiIyMjYyMGY0Zi00MWZkLTRjODItODUyMS02NTdiNmIwODI0ODYiLCJjbGllbnRfaWQiOiJhbmd1bGFyIn0.t-bN3Rbfk_bFsChzjuT5hJb2ZWxdz1YqhZkKIS4tlzs')
    // .set('Content-Type', 'application/json');

    //return this.http.put<Lancamento>(`${this.lancamentosURL}/${lancamento.codigo}`, Lancamento.toJson(lancamento), {headers})
    return this.http.put<Lancamento>(`${this.lancamentosURL}/${lancamento.codigo}`, Lancamento.toJson(lancamento))
      .toPromise()
      .then(response => {
        const lancamentoAlterado = response;

        this.converterStringsParaDatas([lancamentoAlterado]);

        return lancamentoAlterado;
      });
  }

  buscarPorCodigo(codigo: number): Promise<Lancamento> {
    // const headers = new HttpHeaders()
    // .append('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbkBybHNwbW9uZXkuY29tIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sIm5vbWUiOiJBZG1pbmlzdHJhZG9yIiwiZXhwIjoxNTk4NjI2NjgzLCJhdXRob3JpdGllcyI6WyJST0xFX0NBREFTVFJBUl9DQVRFR09SSUEiLCJST0xFX1BFU1FVSVNBUl9QRVNTT0EiLCJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUEVTUVVJU0FSX0xBTkNBTUVOVE8iLCJST0xFX1JFTU9WRVJfTEFOQ0FNRU5UTyIsIlJPTEVfQ0FEQVNUUkFSX1BFU1NPQSIsIlJPTEVfUEVTUVVJU0FSX0NBVEVHT1JJQSJdLCJqdGkiOiIyMjYyMGY0Zi00MWZkLTRjODItODUyMS02NTdiNmIwODI0ODYiLCJjbGllbnRfaWQiOiJhbmd1bGFyIn0.t-bN3Rbfk_bFsChzjuT5hJb2ZWxdz1YqhZkKIS4tlzs');

    //return this.http.get<Lancamento>(`${this.lancamentosURL}/${codigo}`, {headers})
    return this.http.get<Lancamento>(`${this.lancamentosURL}/${codigo}`)
      .toPromise()
      .then(response => {
        const lancamento = response;

        this.converterStringsParaDatas([lancamento]);

        return lancamento;
      });
  }

  private converterStringsParaDatas(lancamentos: Lancamento[]) {
    for (const lancamento of lancamentos) {
      lancamento.dataVencimento = moment(lancamento.dataVencimento, 'YYYY-MM-DD').toDate();

      if (lancamento.dataPagamento) {
        lancamento.dataPagamento = moment(lancamento.dataPagamento, 'YYYY-MM-DD').toDate();
      }
    }
  }

}

