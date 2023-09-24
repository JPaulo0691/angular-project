import { ClientesService } from './../../../shared/services/clientes.service';
import { Cliente } from './../../../shared/models/cliente';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listagem-usuario',
  templateUrl: './listagem-usuario.component.html',
  styleUrls: ['./listagem-usuario.component.scss']
})
export class ListagemUsuarioComponent implements AfterViewInit{

  displayedColumns : string[] = ['id','nome','cpf','email','status','funcoes'];
  dataSource = new MatTableDataSource<Cliente>

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  //para injetar um serviço
  constructor(private clientesService: ClientesService){ }

  ngAfterViewInit(){
    this.listarClientes(1,5);
  }

  listarClientes(page: number, pageSize: number){
    this.clientesService.listar_paginado(page,pageSize).subscribe(listarClientes => {
        this.dataSource.data = listarClientes;
    })
  }

  onPageChange(event: PageEvent){

    const pageIndex = event.pageIndex + 1;
    const pageSize = event.pageSize;

    this.listarClientes(pageIndex, pageSize);
  }

  deletarCliente(id: number){
    Swal.fire({
      title: 'Você tem certeza que deseja deletar?',
      text: 'Não tem como reverter essa ação',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'red',
      confirmButtonText: 'Deletar'

    }).then((result) =>{

      if(result.isConfirmed){
        this.clientesService.deletar(id).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Sucesso',
              text: 'Cliente deletado com Sucesso',
              showConfirmButton: false,
              timer: 1500
            })
            this.listarClientes(1,5)
          },
          error: (error) => {
            console.error = error
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Erro ao deletar cliente!'

            })

          }})
      }})
    }


}
