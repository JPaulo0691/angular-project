import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SaqueDeposito } from 'src/app/shared/models/SaqueDeposito';
import { Conta } from 'src/app/shared/models/conta';
import { ClientesService } from 'src/app/shared/services/clientes.service';
import { ContaService } from 'src/app/shared/services/conta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-deposito',
  templateUrl: './deposito.component.html',
  styleUrls: ['./deposito.component.scss']
})
export class DepositoComponent {

  formGroup: FormGroup;
  contas: Conta[]


  constructor(private contaService: ContaService, private router: Router, private clienteService: ClientesService){


    this.formGroup = new FormGroup({
      valor: new FormControl('', Validators.required),
      conta: new FormControl('', Validators.required)
    });
    this.contas = []
  }
  ngOnInit(): void {
    this.listarContas()
  }


  listarContas(): void{
    this.contaService.listarContas().subscribe(contas => {
      this.clienteService.listar().subscribe(clientes => {
        const contasFormatada = contas.map(conta => {
          const cliente = clientes.find(cliente => cliente.id === conta.cliente);
          if (cliente) {
            conta.nomeCliente = cliente.nome;
          }
          return conta;
        });
        this.contas = contasFormatada;
      });
    })
  }


  cadastrar() {
    const deposito: SaqueDeposito = this.formGroup.value.valor;

      this.contaService.deposito(deposito).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Sucesso',
            text: 'Depósito registrado com sucesso!',
            showConfirmButton: false,
            timer: 1500
          })
          this.router.navigate(['/conta']);
        },
        error: (error) => {
          console.error(error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Erro ao registrar depósito!',
          });
        }
      });
    }


}
