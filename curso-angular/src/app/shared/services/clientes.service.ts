import { Cliente } from './../models/cliente';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { enviroment } from 'src/enviroment/enviroment';
import { Observable } from 'rxjs/internal/Observable';



@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  api = `${enviroment.api}/clientes/`

  constructor(private httpClient : HttpClient) { }

  inserir(novoCliente: Cliente): Observable<Cliente> {
    return this.httpClient.post<Cliente>(this.api, novoCliente);
  }

  listar(): Observable<Cliente[]>{
    return this.httpClient.get<Cliente[]>(this.api);
  }

  listar_paginado(page: number, pageSize: number): Observable<Cliente[]> {
    return this.httpClient.get<Cliente[]>(`${this.api}?page=${page}&pageSize=${pageSize}`);
  }

  deletar(idCliente: number): Observable<object>{
    return this.httpClient.delete(`${this.api}${idCliente}`);
  }

  pesquisarPorId(id: number): Observable<Cliente>{
    return this.httpClient.get<Cliente>(`${this.api}${id}`);
  }

  atualizar(cliente: Cliente): Observable<Cliente>{
    return this.httpClient.put<Cliente>(`${this.api}${cliente.id}`, cliente);
  }

}
