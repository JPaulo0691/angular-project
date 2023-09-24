import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Conta } from 'src/app/shared/models/conta';
import { ContaService } from 'src/app/shared/services/conta.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-listar-contas',
  templateUrl: './listar-contas.component.html',
  styleUrls: ['./listar-contas.component.scss']
})
export class ListarContasComponent implements AfterViewInit {

  displayColumns: string[] = ['id', 'numero', 'agencia','saldo','cliente', 'funcoes'];
  dataSource = new MatTableDataSource<Conta>

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private contaService: ContaService){}

  ngAfterViewInit(): void {
    this.listarContas(1,5);
  }

  onPageChange(event: PageEvent){
    const pageIndex = event.pageIndex + 1;
    const pageSize = event.pageSize;

    this.listarContas(pageIndex, pageSize);
  }

  listarContas(page: number, pageSize:number){
      return this.contaService.listar_paginado(page,pageSize).subscribe(listar => {
        this.dataSource.data = listar;
      })
  }

  deletarConta(id: number){
    Swal.fire({
      title: "Você tem certeza que deseja deletar essa conta?",
      text: "Não tem como reverter essa situação",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'red',
      confirmButtonText: 'Deletar'

    }).then((result) => {
      if(result.isConfirmed){
        this.contaService.deletarConta(id).subscribe({
          next:() =>{
            Swal.fire({
              icon: 'success',
              title: 'Sucesso',
              text: 'Conta deletada com Sucesso',
              showConfirmButton: false,
              timer: 2000
            })
            this.listarContas(1,5)
          },
          error: (erro) =>{
            console.error = erro
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Erro ao deletar conta!'
            })
          }
        })
      }
    })
  }


}
