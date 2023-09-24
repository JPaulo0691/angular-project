import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from 'src/enviroment/enviroment';
import { Conta } from '../models/conta';

@Injectable({
  providedIn: 'root'
})
export class ContaService {

  api = `${enviroment.api}/contas/`;

  constructor(private httpClient : HttpClient) { }

  inserir(novaConta: Conta): Observable<Conta>{
    return this.httpClient.post<Conta>(this.api,novaConta);
  }

  listarContas(){
    return this.httpClient.get<Conta[]>(this.api);
  }

  listar_paginado(page: number, pageSize: number): Observable<Conta[]> {
    return this.httpClient.get<Conta[]>(`${this.api}?page=${page}&pageSize=${pageSize}`);
  }

  listarContaEspecifica(id:number): Observable<Conta>{
    return this.httpClient.get<Conta>(`${this.api}${id}`);
  }

  atualizarContaCliente(conta: Conta): Observable<Conta>{
    return this.httpClient.put<Conta>(`${this.api}${conta.id}`, conta)
  }

  deletarConta(id: number) : Observable<Object>{
    return this.httpClient.delete<Conta>(`${this.api}${id}`);
  }
}
