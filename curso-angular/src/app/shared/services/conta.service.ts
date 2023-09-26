import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from 'src/enviroment/enviroment';
import { Conta } from '../models/conta';
import { SaqueDeposito } from '../models/SaqueDeposito';
import { Transferencia } from '../models/Transferencia';

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

  saque(saque: SaqueDeposito): Observable<SaqueDeposito>{
    return this.httpClient.post<SaqueDeposito>(`${this.api}${saque.conta}/saque/`, saque);
  }

  deposito(deposito: SaqueDeposito): Observable<SaqueDeposito>{
    return this.httpClient.post<SaqueDeposito>(`${this.api}${deposito.conta}/deposito/`, deposito);
  }


  tranferencia(transferencia: Transferencia): Observable<Transferencia>{
    return this.httpClient.post<Transferencia>(`${this.api}${transferencia.conta_origem}/transferencia/`, transferencia);
  }


}
