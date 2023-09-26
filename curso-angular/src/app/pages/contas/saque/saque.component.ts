import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SaqueDeposito } from 'src/app/shared/models/SaqueDeposito';
import { Conta } from 'src/app/shared/models/conta';
import { ClientesService } from 'src/app/shared/services/clientes.service';
import { ContaService } from 'src/app/shared/services/conta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-saque',
  templateUrl: './saque.component.html',
  styleUrls: ['./saque.component.scss']
})
export class SaqueComponent {

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
        const contasComNomesDeClientes = contas.map(conta => {
          const cliente = clientes.find(cliente => cliente.id === conta.cliente);
          if (cliente) {
            conta.nomeCliente = cliente.nome;
          }
          return conta;
        });
        this.contas = contasComNomesDeClientes;
      });
    })
  }


  cadastrar() {
    const saque: SaqueDeposito = this.formGroup.value;
      // Modo de criação
      this.contaService.saque(saque).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Sucesso',
            text: 'Saque registrado com sucesso!',
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
            text: 'Erro ao registrar saque!',
          });
        }
      });
    }


}
